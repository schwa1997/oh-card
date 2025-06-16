'use server';

import { z } from 'zod';
import { and, eq, sql } from 'drizzle-orm';
import { db } from '@/lib/db/drizzle';
import {
  users,
  activityLogs,
  type NewUser,
  type NewActivityLog,
  ActivityType,
  clients,
  NewClient,
  clientTags,
  sessions,
  sessionCards,
} from '@/lib/db/schema';
import { comparePasswords, hashPassword, setSession } from '@/lib/auth/session';
import { redirect } from 'next/navigation';
import { cookies } from 'next/headers';
import { getUser, getUserWithClient } from '@/lib/db/queries';
import {
  validatedAction,
  validatedActionWithUser
} from '@/lib/auth/middleware';

async function logActivity(
  clientId: number | null | undefined,
  userId: number,
  type: ActivityType,
  ipAddress?: string
) {
  if (clientId === null || clientId === undefined) {
    return;
  }
  const newActivity: NewActivityLog = {
    clientId,
    userId,
    action: type,
    ipAddress: ipAddress || ''
  };
  await db.insert(activityLogs).values(newActivity);
}

const signInSchema = z.object({
  email: z.string().email().min(3).max(255),
  password: z.string().min(8).max(100)
});

export const signIn = validatedAction(signInSchema, async (data, formData) => {
  const { email, password } = data;

  const user = await getUser();

  if (!user) {
    return {
      error: '无效的邮箱或密码，请重试',
      email,
      password
    };
  }

  const isPasswordValid = await comparePasswords(
    password,
    user.passwordHash
  );

  if (!isPasswordValid) {
    return {
      error: '无效的邮箱或密码，请重试',
      email,
      password
    };
  }

  await Promise.all([
    setSession(user),
    logActivity(null, user.id, ActivityType.SIGN_IN)
  ]);
  redirect('/dashboard');
});

const signUpSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
  inviteId: z.string().optional()
});

export const signUp = validatedAction(signUpSchema, async (data, formData) => {
  const { email, password, inviteId } = data;

  const existingUser = await db
    .select()
    .from(users)
    .where(eq(users.email, email))
    .limit(1);

  if (existingUser.length > 0) {
    return {
      error: '创建用户失败，请重试',
      email,
      password
    };
  }

  const passwordHash = await hashPassword(password);

  const newUser: NewUser = {
    email,
    passwordHash,
    role: 'user' // Default role is user, admin needs to be set manually
  };

  const [createdUser] = await db.insert(users).values(newUser).returning();

  if (!createdUser) {
    return {
      error: '创建用户失败，请重试',
      email,
      password
    };
  }

  // Create a default client profile for the therapist
  const newClient: NewClient = {
    nickname: `${email.split('@')[0]}`,
    contactInfo: '',
    contactMethod: 'wechat',
    userId: createdUser.id
  };

  const [createdClient] = await db.insert(clients).values(newClient).returning();

  if (!createdClient) {
    return {
      error: '创建客户档案失败',
      email,
      password
    };
  }

  await Promise.all([
    logActivity(createdClient.id, createdUser.id, ActivityType.SIGN_UP),
    setSession(createdUser)
  ]);

  redirect('/dashboard');
});

export async function signOut() {
  const user = await getUser();
  if (!user) return;
  
  await logActivity(null, user.id, ActivityType.SIGN_OUT);
  (await cookies()).delete('session');
  redirect('/sign-in');
}

// Client Management Actions

const createClientSchema = z.object({
  nickname: z.string().min(1, '昵称不能为空').max(100),
  contactInfo: z.string().min(1, '联系方式不能为空').max(255),
  contactMethod: z.enum(['wechat', 'phone']),
  tags: z.array(z.string()).optional()
});



export const createClient = validatedActionWithUser(
  createClientSchema,
  async (data, _, user) => {
    const { nickname, contactInfo, contactMethod, tags = [] } = data;

    const newClient: NewClient = {
      nickname,
      contactInfo,
      contactMethod,
      userId: user.id
    };

    const [createdClient] = await db.insert(clients).values(newClient).returning();

    if (!createdClient) {
      return {
        error: '创建客户失败'
      };
    }

    // Add tags if provided
    if (tags.length > 0) {
      await db.insert(clientTags).values(
        tags.map(tag => ({
          name: tag,
          clientId: createdClient.id,
          color: getColorForTag(tag)
        }))
      );
    }

    await logActivity(createdClient.id, user.id, ActivityType.ADD_CLIENT);

    return {
      success: '客户创建成功',
      clientId: createdClient.id
    };
  }
);

// OH Card Session Actions
const createSessionSchema = z.object({
  clientId: z.number(),
  title: z.string().min(1, '标题不能为空').max(100),
  notes: z.string().optional()
});

export const createSession = validatedActionWithUser(
  createSessionSchema,
  async (data, _, user) => {
    const { clientId, title, notes } = data;

    const [session] = await db.insert(sessions).values({
      clientId,
      userId: user.id,
      title,
      notes,
      date: new Date()
    }).returning();

    if (!session) {
      return {
        error: '创建会话失败'
      };
    }

    await logActivity(clientId, user.id, ActivityType.ADD_SESSION);

    return {
      success: '会话创建成功',
      sessionId: session.id
    };
  }
);

const saveCardArrangementSchema = z.object({
  sessionId: z.number(),
  cards: z.array(z.object({
    cardId: z.number(),
    positionX: z.number(),
    positionY: z.number(),
    rotation: z.number().optional(),
    notes: z.string().optional()
  }))
});

export const saveCardArrangement = validatedActionWithUser(
  saveCardArrangementSchema,
  async (data, _, user) => {
    const { sessionId, cards } = data;

    // First delete existing cards for this session
    await db.delete(sessionCards).where(eq(sessionCards.sessionId, sessionId));

    // Insert new card arrangement
    await db.insert(sessionCards).values(
      cards.map(card => ({
        sessionId,
        cardId: card.cardId,
        positionX: card.positionX,
        positionY: card.positionY,
        rotation: card.rotation || 0,
        notes: card.notes || ''
      }))
    );

    const session = await db.query.sessions.findFirst({
      where: eq(sessions.id, sessionId),
      with: { client: true }
    });

    if (session?.client) {
      await logActivity(session.client.id, user.id, ActivityType.UPDATE_SESSION);
    }

    return {
      success: '卡牌排列保存成功'
    };
  }
);

// Utility function for tag colors
function getColorForTag(tag: string): string {
  const colors = ['blue', 'green', 'red', 'purple', 'orange'];
  const hash = tag.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
  return colors[hash % colors.length];
}


const updateAccountSchema = z.object({
  name: z.string().min(1, 'Name is required').max(100),
  email: z.string().email('Invalid email address')
});

export const updateAccount = validatedActionWithUser(
  updateAccountSchema,
  async (data, _, user) => {
    const { name, email } = data;
  

    await Promise.all([
      db.update(users).set({ name, email }).where(eq(users.id, user.id)),
      logActivity(null, user.id, ActivityType.UPDATE_ACCOUNT)
    ]);

    return { name, success: 'Account updated successfully.' };
  }
);


const updatePasswordSchema = z.object({
  currentPassword: z.string().min(8).max(100),
  newPassword: z.string().min(8).max(100),
  confirmPassword: z.string().min(8).max(100)
});

export const updatePassword = validatedActionWithUser(
  updatePasswordSchema,
  async (data, _, user) => {
    const { currentPassword, newPassword, confirmPassword } = data;

    const isPasswordValid = await comparePasswords(
      currentPassword,
      user.passwordHash
    );

    if (!isPasswordValid) {
      return {
        currentPassword,
        newPassword,
        confirmPassword,
        error: 'Current password is incorrect.'
      };
    }

    if (currentPassword === newPassword) {
      return {
        currentPassword,
        newPassword,
        confirmPassword,
        error: 'New password must be different from the current password.'
      };
    }

    if (confirmPassword !== newPassword) {
      return {
        currentPassword,
        newPassword,
        confirmPassword,
        error: 'New password and confirmation password do not match.'
      };
    }

    const newPasswordHash = await hashPassword(newPassword);

    await Promise.all([
      db
        .update(users)
        .set({ passwordHash: newPasswordHash })
        .where(eq(users.id, user.id)),
      logActivity(null, user.id, ActivityType.UPDATE_PASSWORD)
    ]);

    return {
      success: 'Password updated successfully.'
    };
  }
);



const deleteAccountSchema = z.object({
  password: z.string().min(8).max(100)
});

export const deleteAccount = validatedActionWithUser(
  deleteAccountSchema,
  async (data, _, user) => {
    const { password } = data;

    const isPasswordValid = await comparePasswords(password, user.passwordHash);
    if (!isPasswordValid) {
      return {
        password,
        error: 'Incorrect password. Account deletion failed.'
      };
    }

    const userWithClient = await getUserWithClient(user.id);

    await logActivity(
      userWithClient?.clientId,
      user.id,
      ActivityType.DELETE_ACCOUNT
    );

    // Soft delete
    await db
      .update(users)
      .set({
        deletedAt: sql`CURRENT_TIMESTAMP`,
        email: sql`CONCAT(email, '-', id, '-deleted')` // Ensure email uniqueness
      })
      .where(eq(users.id, user.id));

      

    (await cookies()).delete('session');
    redirect('/sign-in');
  }
);

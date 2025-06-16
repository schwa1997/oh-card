import { desc, and, eq, isNull } from 'drizzle-orm';
import { db } from './drizzle';
import { activityLogs, Client, clients, users,type User } from './schema';
import { cookies } from 'next/headers';
import { verifyToken } from '@/lib/auth/session';

type ClientWithUser = {
  user: Pick<User, 'id' | 'name' | 'email'>;
  nickname: string | null;
  contactInfo: string | null;
  contactMethod: string | null;
  clientId: number | null;
};

type ActivityLogWithUser = {
  id: number;
  action: string;
  timestamp: Date;
  ipAddress: string | null;
  userName: string | null;
};

export async function getUser(): Promise<User | null> {
  const sessionCookie = (await cookies()).get('session');
  if (!sessionCookie?.value) return null;

  try {
    const sessionData = await verifyToken(sessionCookie.value);
    if (!sessionData?.user?.id || new Date(sessionData.expires) < new Date()) {
      return null;
    }

    const [user] = await db
      .select()
      .from(users)
      .where(and(eq(users.id, sessionData.user.id), isNull(users.deletedAt)))
      .limit(1);

    return user ?? null;
  } catch (error) {
    console.error('Error verifying user session:', error);
    return null;
  }
}

export async function getUserWithClient(userId: number): Promise<ClientWithUser | null> {
  const result = await db
    .select({
      user: users,
      nickname: clients.nickname,
      contactInfo: clients.contactInfo,
      contactMethod: clients.contactMethod,
      clientId: clients.id
    })
    .from(users)
    .leftJoin(clients, eq(users.id, clients.userId))
    .where(eq(users.id, userId))
    .limit(1);

  return result[0] ?? null;
}

export async function getActivityLogs(): Promise<ActivityLogWithUser[]> {
  const user = await getUser();
  if (!user) throw new Error('Authentication required');

  return db
    .select({
      id: activityLogs.id,
      action: activityLogs.action,
      timestamp: activityLogs.timestamp,
      ipAddress: activityLogs.ipAddress,
      userName: users.name
    })
    .from(activityLogs)
    .leftJoin(users, eq(activityLogs.userId, users.id))
    .where(eq(activityLogs.userId, user.id))
    .orderBy(desc(activityLogs.timestamp))
    .limit(10);
}

export async function getClientsForUser(): Promise<ClientWithUser[]> {
  const user = await getUser();
  if (!user) throw new Error('Authentication required');
  return db
    .select({
      user: users,
      nickname: clients.nickname,
      contactInfo: clients.contactInfo,
      contactMethod: clients.contactMethod,
      clientId: clients.id
    })
    .from(users)
    .leftJoin(clients, eq(users.id, clients.userId))
    .where(eq(clients.userId, user.id));
}

// New utility functions for your OH card app:

export async function getClientSessions(clientId: number) {
  return db.query.sessions.findMany({
    where: (sessions, { eq }) => eq(sessions.clientId, clientId),
    orderBy: (sessions, { desc }) => [desc(sessions.date)],
    with: {
      cards: true,
      notes: true
    }
  });
}

export async function getClientTags(clientId: number) {
  return db.query.clientTags.findMany({
    where: (tags, { eq }) => eq(tags.clientId, clientId),
    orderBy: (tags, { asc }) => [asc(tags.name)]
  });
}
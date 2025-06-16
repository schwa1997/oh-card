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


export async function getUserInfo() {
  const user = await getUser();
  if (!user) return null;
  return {
    user: user,
    client: await getUserWithClient(user.id)
  };
}


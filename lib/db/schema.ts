
import {
  pgTable,
  serial,
  varchar,
  text,
  timestamp,
  integer,
  jsonb,
  boolean,
  date,
} from 'drizzle-orm/pg-core';
import { relations } from 'drizzle-orm';

export const users = pgTable('users', {
  id: serial('id').primaryKey(),
  name: varchar('name', { length: 100 }),
  email: varchar('email', { length: 255 }).notNull().unique(),
  passwordHash: text('password_hash').notNull(),
  role: varchar('role', { length: 20 }).notNull().default('user'), // 'user' or 'admin'
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at').notNull().defaultNow(),
  deletedAt: timestamp('deleted_at'),
});

export const clients = pgTable('clients', {
  id: serial('id').primaryKey(),
  nickname: varchar('nickname', { length: 100 }).notNull(),
  contactInfo: varchar('contact_info', { length: 255 }).notNull(), // WeChat/phone
  contactMethod: varchar('contact_method', { length: 20 }).notNull(), // 'wechat' or 'phone'
  notes: text('notes'),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at').notNull().defaultNow(),
  userId: integer('user_id')
    .notNull()
    .references(() => users.id), // The therapist/admin who owns this client
});

export const clientTags = pgTable('client_tags', {
  id: serial('id').primaryKey(),
  name: varchar('name', { length: 50 }).notNull(), // e.g. '#职业困惑', '#高敏感'
  color: varchar('color', { length: 20 }),
  clientId: integer('client_id')
    .notNull()
    .references(() => clients.id),
});

export const ohCardDecks = pgTable('oh_card_decks', {
  id: serial('id').primaryKey(),
  name: varchar('name', { length: 100 }).notNull(),
  description: text('description'),
  isSystem: boolean('is_system').notNull().default(false), // Predefined system decks
  createdAt: timestamp('created_at').notNull().defaultNow(),
});

export const ohCards = pgTable('oh_cards', {
  id: serial('id').primaryKey(),
  deckId: integer('deck_id')
    .notNull()
    .references(() => ohCardDecks.id),
  imageUrl: varchar('image_url', { length: 255 }).notNull(),
  name: varchar('name', { length: 100 }).notNull(),
  description: text('description'),
});

export const sessions = pgTable('sessions', {
  id: serial('id').primaryKey(),
  clientId: integer('client_id')
    .notNull()
    .references(() => clients.id),
  userId: integer('user_id')
    .notNull()
    .references(() => users.id), // The therapist conducting the session
  title: varchar('title', { length: 100 }),
  date: timestamp('date').notNull().defaultNow(),
  notes: text('notes'),
  summary: text('summary'),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at').notNull().defaultNow(),
});

export const sessionCards = pgTable('session_cards', {
  id: serial('id').primaryKey(),
  sessionId: integer('session_id')
    .notNull()
    .references(() => sessions.id),
  cardId: integer('card_id')
    .notNull()
    .references(() => ohCards.id),
  positionX: integer('position_x').notNull(),
  positionY: integer('position_y').notNull(),
  rotation: integer('rotation').notNull().default(0),
  notes: text('notes'),
});

export const cardArrangementTemplates = pgTable('card_arrangement_templates', {
  id: serial('id').primaryKey(),
  name: varchar('name', { length: 100 }).notNull(), // e.g. "生涯规划3卡阵"
  description: text('description'),
  userId: integer('user_id')
    .notNull()
    .references(() => users.id),
  snapshot: text('snapshot'), // Base64 encoded thumbnail
  createdAt: timestamp('created_at').notNull().defaultNow(),
});

export const templateCards = pgTable('template_cards', {
  id: serial('id').primaryKey(),
  templateId: integer('template_id')
    .notNull()
    .references(() => cardArrangementTemplates.id),
  cardId: integer('card_id')
    .notNull()
    .references(() => ohCards.id),
  positionX: integer('position_x').notNull(),
  positionY: integer('position_y').notNull(),
  rotation: integer('rotation').notNull().default(0),
});

export const sessionNotes = pgTable('session_notes', {
  id: serial('id').primaryKey(),
  sessionId: integer('session_id')
    .notNull()
    .references(() => sessions.id),
  content: text('content').notNull(), // Markdown content
  keywords: jsonb('keywords').notNull().default([]), // Array of keywords like #焦虑
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at').notNull().defaultNow(),
});

export const caseAssociations = pgTable('case_associations', {
  id: serial('id').primaryKey(),
  keyword: varchar('keyword', { length: 50 }).notNull(), // e.g. '#焦虑'
  sessionId: integer('session_id')
    .notNull()
    .references(() => sessions.id),
  strength: integer('strength').notNull().default(1), // Association strength
  createdAt: timestamp('created_at').notNull().defaultNow(),
});

// Relations
export const usersRelations = relations(users, ({ many }) => ({
  clients: many(clients),
  sessions: many(sessions),
  templates: many(cardArrangementTemplates),
}));

export const clientsRelations = relations(clients, ({ many, one }) => ({
  tags: many(clientTags),
  sessions: many(sessions),
  user: one(users, {
    fields: [clients.userId],
    references: [users.id],
  }),
}));

export const sessionsRelations = relations(sessions, ({ many, one }) => ({
  cards: many(sessionCards),
  notes: many(sessionNotes),
  client: one(clients, {
    fields: [sessions.clientId],
    references: [clients.id],
  }),
  user: one(users, {
    fields: [sessions.userId],
    references: [users.id],
  }),
  caseAssociations: many(caseAssociations),
}));

export const ohCardDecksRelations = relations(ohCardDecks, ({ many }) => ({
  cards: many(ohCards),
}));

export const cardArrangementTemplatesRelations = relations(cardArrangementTemplates, ({ many, one }) => ({
  cards: many(templateCards),
  user: one(users, {
    fields: [cardArrangementTemplates.userId],
    references: [users.id],
  }),
}));

export const activityLogs = pgTable('activity_logs', {
  id: serial('id').primaryKey(),
  userId: integer('user_id').references(() => users.id),
  action: text('action').notNull(),
  clientId: integer('client_id').references(() => clients.id),
  timestamp: timestamp('timestamp').notNull().defaultNow(),
  ipAddress: varchar('ip_address', { length: 45 }),
});


export const activityLogsRelations = relations(activityLogs, ({ one }) => ({
  user: one(users, {
    fields: [activityLogs.userId],
    references: [users.id],
  }),
  client: one(clients, {
    fields: [activityLogs.clientId],
    references: [clients.id],
  }),
}));

// Types
export type User = typeof users.$inferSelect;
export type NewUser = typeof users.$inferInsert;
export type Client = typeof clients.$inferSelect;
export type ClientWithUser = typeof clients.$inferSelect & {
  user: User;
};
export type NewClient = typeof clients.$inferInsert;
export type ClientTag = typeof clientTags.$inferSelect;
export type NewClientTag = typeof clientTags.$inferInsert;
export type OhCardDeck = typeof ohCardDecks.$inferSelect;
export type NewOhCardDeck = typeof ohCardDecks.$inferInsert;
export type OhCard = typeof ohCards.$inferSelect;
export type NewOhCard = typeof ohCards.$inferInsert;
export type Session = typeof sessions.$inferSelect;
export type NewSession = typeof sessions.$inferInsert;
export type SessionCard = typeof sessionCards.$inferSelect;
export type NewSessionCard = typeof sessionCards.$inferInsert;
export type CardArrangementTemplate = typeof cardArrangementTemplates.$inferSelect;
export type NewCardArrangementTemplate = typeof cardArrangementTemplates.$inferInsert;
export type TemplateCard = typeof templateCards.$inferSelect;
export type NewTemplateCard = typeof templateCards.$inferInsert;
export type SessionNote = typeof sessionNotes.$inferSelect;
export type NewSessionNote = typeof sessionNotes.$inferInsert;
export type CaseAssociation = typeof caseAssociations.$inferSelect;
export type NewCaseAssociation = typeof caseAssociations.$inferInsert;
export type ActivityLog = typeof activityLogs.$inferSelect;
export type NewActivityLog = typeof activityLogs.$inferInsert;


export enum ActivityType {
  SIGN_UP = 'SIGN_UP',
  SIGN_IN = 'SIGN_IN',
  SIGN_OUT = 'SIGN_OUT',
  UPDATE_PASSWORD = 'UPDATE_PASSWORD',
  DELETE_ACCOUNT = 'DELETE_ACCOUNT',
  UPDATE_ACCOUNT = 'UPDATE_ACCOUNT',
  ADD_CLIENT = 'ADD_CLIENT',
  UPDATE_CLIENT = 'UPDATE_CLIENT',
  DELETE_CLIENT = 'DELETE_CLIENT',
  ADD_SESSION = 'ADD_SESSION',
  UPDATE_SESSION = 'UPDATE_SESSION',
  DELETE_SESSION = 'DELETE_SESSION',
  ADD_CARD = 'ADD_CARD',
  UPDATE_CARD = 'UPDATE_CARD',
  DELETE_CARD = 'DELETE_CARD',
  ADD_TEMPLATE = 'ADD_TEMPLATE',
  UPDATE_TEMPLATE = 'UPDATE_TEMPLATE',
}
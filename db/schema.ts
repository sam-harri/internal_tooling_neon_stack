import { pgTable, varchar, integer, timestamp, text, uniqueIndex } from 'drizzle-orm/pg-core';
import { usersSyncInNeonAuth } from './neon_auth_schema';

export const whitelistedDomainsTable = pgTable(
  'whitelisted_domains',
  {
    id: integer('id').primaryKey().generatedAlwaysAsIdentity(),
    domain: varchar('domain', { length: 255 }).notNull().unique(),
    createdAt: timestamp('created_at').notNull().defaultNow(),
    whitelistedBy: text('whitelisted_by')
      .notNull()
      .references(() => usersSyncInNeonAuth.id),
  },
  (table) => [uniqueIndex('domain_unique').on(table.domain)]
);

export const whitelistedEmailsTable = pgTable('whitelisted_emails', {
  id: integer('id').primaryKey().generatedAlwaysAsIdentity(),
  email: varchar('email', { length: 255 }).notNull().unique(),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  whitelistedBy: text('whitelisted_by')
    .notNull()
    .references(() => usersSyncInNeonAuth.id),
});

export const blacklistedEmailsTable = pgTable('blacklisted_emails', {
  id: integer('id').primaryKey().generatedAlwaysAsIdentity(),
  email: varchar('email', { length: 255 }).notNull().unique(),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  blacklistedBy: text('blacklisted_by')
    .notNull()
    .references(() => usersSyncInNeonAuth.id),
});

import { pgSchema, index, jsonb, text, timestamp } from 'drizzle-orm/pg-core';
import { sql } from 'drizzle-orm';

export const neonAuth = pgSchema('neon_auth');

export const usersSyncInNeonAuth = neonAuth.table(
  'users_sync',
  {
    rawJson: jsonb('raw_json').notNull(),
    id: text()
      .primaryKey()
      .notNull()
      .generatedAlwaysAs(sql`(raw_json ->> 'id'::text)`),
    name: text().generatedAlwaysAs(sql`(raw_json ->> 'display_name'::text)`),
    email: text().generatedAlwaysAs(sql`(raw_json ->> 'primary_email'::text)`),
    createdAt: timestamp('created_at', {
      withTimezone: true,
      mode: 'string',
    }).generatedAlwaysAs(
      sql`to_timestamp((trunc((((raw_json ->> 'signed_up_at_millis'::text))::bigint)::double precision) / (1000)::double precision))`
    ),
    updatedAt: timestamp('updated_at', { withTimezone: true, mode: 'string' }),
    deletedAt: timestamp('deleted_at', { withTimezone: true, mode: 'string' }),
  },
  (table) => [
    index('users_sync_deleted_at_idx').using(
      'btree',
      table.deletedAt.asc().nullsLast().op('timestamptz_ops')
    ),
  ]
);

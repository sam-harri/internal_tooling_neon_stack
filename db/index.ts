import 'dotenv/config';
import { drizzle } from 'drizzle-orm/node-postgres';
import * as schema from './schema';
import { usersSyncInNeonAuth } from './neon_auth_schema';

const connectionString = process.env.DATABASE_URL!;
const db = drizzle(connectionString, { schema: { ...schema, usersSyncInNeonAuth } });

export default db;

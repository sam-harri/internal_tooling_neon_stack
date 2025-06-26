'use server';

import { revalidatePath } from 'next/cache';
import { z } from 'zod';
import { eq } from 'drizzle-orm';
import db from '@/db';
import { stackServerApp } from '@/stack';
import {
  whitelistedDomainsTable,
  whitelistedEmailsTable,
  blacklistedEmailsTable,
} from '@/db/schema';

const domainSchema = z.object({
  value: z
    .string()
    .min(3, 'Domain is too short.')
    .refine((v) => !v.includes('@'), 'Do not include the @ symbol.'),
});
const emailSchema = z.object({ value: z.string().email('Invalid email address.') });

async function addToList(
  table:
    | typeof whitelistedDomainsTable
    | typeof whitelistedEmailsTable
    | typeof blacklistedEmailsTable,
  byField: 'whitelistedBy' | 'blacklistedBy',
  valueField: 'domain' | 'email',
  formData: FormData,
  schema: z.ZodSchema
) {
  const userId = (await stackServerApp.getUser({ or: 'redirect' })).id;
  const rawValue = { value: formData.get('value') };
  const validation = schema.safeParse(rawValue);

  if (!validation.success) {
    return { success: false, message: validation.error.errors[0].message };
  }
  const { value } = validation.data;

  try {
    await db
      .insert(table)
      .values({
        [valueField]: value,
        [byField]: userId,
      })
      .onConflictDoNothing();

    revalidatePath('/admin/users');
    return { success: true, message: `${value} added successfully.` };
  } catch (error: any) {
    return { success: false, message: 'An unexpected error occurred.' };
  }
}

async function removeFromList(
  table:
    | typeof whitelistedDomainsTable
    | typeof whitelistedEmailsTable
    | typeof blacklistedEmailsTable,
  id: number
) {
  (await stackServerApp.getUser({ or: 'redirect' })).id;
  try {
    await db.delete(table).where(eq(table.id, id));
    revalidatePath('/admin/users');
    return { success: true, message: 'Item removed.' };
  } catch (error) {
    return { success: false, message: 'Failed to remove item.' };
  }
}

export async function addWhitelistedDomain(formData: FormData) {
  return addToList(whitelistedDomainsTable, 'whitelistedBy', 'domain', formData, domainSchema);
}
export async function removeWhitelistedDomain(id: number) {
  return removeFromList(whitelistedDomainsTable, id);
}

export async function addWhitelistedEmail(formData: FormData) {
  return addToList(whitelistedEmailsTable, 'whitelistedBy', 'email', formData, emailSchema);
}
export async function removeWhitelistedEmail(id: number) {
  return removeFromList(whitelistedEmailsTable, id);
}

export async function addBlacklistedEmail(formData: FormData) {
  return addToList(blacklistedEmailsTable, 'blacklistedBy', 'email', formData, emailSchema);
}
export async function removeBlacklistedEmail(id: number) {
  return removeFromList(blacklistedEmailsTable, id);
}

'use server';

import { redirect } from 'next/navigation';
import { stackServerApp } from '@/stack';
import db from '@/db';
import { eq } from 'drizzle-orm';
import {
  blacklistedEmailsTable,
  whitelistedDomainsTable,
  whitelistedEmailsTable,
} from '@/db/schema';

export async function ensureToolPermissions() {
  const user = await stackServerApp.getUser({ or: 'redirect' });

  const [isAdmin, isUser] = await Promise.all([
    user.hasPermission('admin'),
    user.hasPermission('user'),
  ]);

  if (isAdmin || isUser) {
    return user;
  }

  const isVerified = await user.primaryEmailVerified;
  const primaryEmail = user.primaryEmail;
  if (!primaryEmail || !isVerified) {
    redirect(stackServerApp.urls.emailVerification);
  }

  const isBlacklisted = await db.query.blacklistedEmailsTable.findFirst({
    where: eq(blacklistedEmailsTable.email, user.primaryEmail),
  });

  if (isBlacklisted) {
    redirect('/403');
  }

  const domain = user.primaryEmail.split('@')[1];
  if (domain) {
    const isDomainWhitelisted = await db.query.whitelistedDomainsTable.findFirst({
      where: eq(whitelistedDomainsTable.domain, domain),
    });

    if (isDomainWhitelisted) {
      await user.grantPermission('user');
      return user;
    }
  }

  const isEmailWhitelisted = await db.query.whitelistedEmailsTable.findFirst({
    where: eq(whitelistedEmailsTable.email, user.primaryEmail),
  });

  if (isEmailWhitelisted) {
    await user.grantPermission('user');
    return user;
  }

  redirect('/403');
}

export async function adminToolPermissions() {
  const user = await stackServerApp.getUser({ or: 'redirect' });
  if (!user) {
    redirect('/403');
  }

  const permission = await user.getPermission('admin');
  return permission;
}

'use server';

import { stackServerApp } from '@/stack';
import { redirect } from 'next/navigation';

export async function setup() {
  const user = await stackServerApp.getUser({ or: 'redirect' });
  console.log('user', user.id);

  // user should be first ever user and not have admin permission yet
  const firstEverUser = (await stackServerApp.listUsers({ orderBy: 'signedUpAt', limit: 1 }))[0];
  console.log('firstEverUser', firstEverUser.id);
  if (firstEverUser.id !== user.id) {
    console.log('User is not the first ever user, skipping setup');
    redirect('/tools');
  }
  console.log('User is the first ever user, granting admin permission');

  const hasAdminPermission = Boolean(await user.getPermission('admin'));
  if (hasAdminPermission) {
    console.log('User already has admin permission, skipping setup');
    redirect('/tools');
  }

  // grant admin to the first user
  await user.grantPermission('admin');
  console.log('Admin permission granted');
  redirect('/tools');
}

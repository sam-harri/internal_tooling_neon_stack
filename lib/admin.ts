'use server';

import { revalidatePath } from 'next/cache';
import { stackServerApp } from '@/stack';

export async function deleteUserAction(userId: string) {
  try {
    const user = await stackServerApp.getUser(userId);
    if (!user) throw new Error('User not found.');

    const hasAdminPermission = await user.hasPermission('admin');
    if (hasAdminPermission) {
      return { success: false, message: 'Admins cannot be deleted.' };
    }

    await user.delete();
    revalidatePath('/admin/users');
    return { success: true, message: 'User deleted successfully.' };
  } catch (error: any) {
    return { success: false, message: error.message || 'Failed to delete user.' };
  }
}

export async function manageUserRoleAction(userId: string, action: 'PROMOTE' | 'DEMOTE') {
  try {
    const user = await stackServerApp.getUser(userId);
    if (!user) throw new Error('User not found.');

    const [isUser, isAdmin] = await Promise.all([
      user.hasPermission('user'),
      user.hasPermission('admin'),
    ]);

    // dont allow admins to be demoted from this panel
    // cant promote admins, since its the highest role
    if (isAdmin) {
      return { success: false, message: 'Admins cannot be demoted from this panel.' };
    }

    if (action === 'PROMOTE') {
      if (isUser) {
        await user.grantPermission('admin');
        revalidatePath('/admin/users');
        return { success: true, message: 'User promoted to Admin.' };
      } else {
        await user.grantPermission('user');
        revalidatePath('/admin/users');
        return { success: true, message: 'Role granted: User.' };
      }
    }

    if (action === 'DEMOTE') {
      if (isUser) {
        await user.revokePermission('user');
        revalidatePath('/admin/users');
        return { success: true, message: 'User demoted to No Role.' };
      } else {
        return { success: false, message: 'User has no role to demote from.' };
      }
    }

    return { success: false, message: 'Invalid action specified.' };
  } catch (error: any) {
    return { success: false, message: error.message || 'Failed to update user role.' };
  }
}

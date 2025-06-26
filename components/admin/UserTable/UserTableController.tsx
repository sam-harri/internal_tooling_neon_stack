import { stackServerApp } from '@/stack';
import { columns, UserForTable } from '@/components/admin/UserTable/UsersTableColumn';
import { UsersTable } from '@/components/admin/UserTable/UsersTable';
import { Toaster } from '@/components/ui/sonner';

export default async function UsersPage() {
  const usersResult = await stackServerApp.listUsers({
    orderBy: 'signedUpAt',
    desc: true,
  });

  const plainUsers: UserForTable[] = await Promise.all(
    usersResult.map(async (user) => {
      const permissions: string[] = [];
      if (await user.hasPermission('admin')) {
        permissions.push('admin');
      } else if (await user.hasPermission('user')) {
        permissions.push('user');
      }

      return {
        id: user.id,
        displayName: user.displayName,
        primaryEmail: user.primaryEmail,
        profileImageUrl: user.profileImageUrl,
        signedUpAt: user.signedUpAt.toISOString(),
        permissions: permissions,
        lastActiveAt: user.lastActiveAt?.toISOString() || null,
      };
    })
  );

  return (
    <>
      <UsersTable columns={columns} data={plainUsers} />
      <Toaster position="top-center" richColors />
    </>
  );
}

export const dynamic = 'force-dynamic';

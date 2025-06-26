'use client';

import { useTransition } from 'react';
import { MoreHorizontal } from 'lucide-react';
import { toast } from 'sonner';

import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { deleteUserAction, manageUserRoleAction } from '@/lib/admin';
import { UserForTable } from './UsersTableColumn';

export function UserActionsCell({ user }: { user: UserForTable }) {
  const [isPending, startTransition] = useTransition();

  const isCurrentlyAdmin = user.permissions.includes('admin');
  const isCurrentlyUser = user.permissions.includes('user');

  const handleRoleChange = (action: 'PROMOTE' | 'DEMOTE') => {
    startTransition(async () => {
      const result = await manageUserRoleAction(user.id, action);
      if (result.success) {
        toast.success(result.message);
      } else {
        toast.error(result.message);
      }
    });
  };

  const handleDelete = () => {
    startTransition(async () => {
      const result = await deleteUserAction(user.id);
      if (result.success) {
        toast.success(result.message);
      } else {
        toast.error(result.message);
      }
    });
  };

  const handleCopyId = () => {
    navigator.clipboard.writeText(user.id);
    toast.success('User ID copied to clipboard!');
  };

  const renderRoleActions = () => {
    if (isCurrentlyAdmin) {
      return null;
    }
    if (isCurrentlyUser) {
      return (
        <>
          <DropdownMenuItem onClick={() => handleRoleChange('PROMOTE')} disabled={isPending}>
            Promote to Admin
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => handleRoleChange('DEMOTE')} disabled={isPending}>
            Demote to No Role
          </DropdownMenuItem>
        </>
      );
    }
    return (
      <DropdownMenuItem onClick={() => handleRoleChange('PROMOTE')} disabled={isPending}>
        Grant User Role
      </DropdownMenuItem>
    );
  };

  return (
    <AlertDialog>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="h-8 w-8 p-0">
            <span className="sr-only">Open menu</span>
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>Actions</DropdownMenuLabel>

          <DropdownMenuItem onClick={handleCopyId}>Copy User ID</DropdownMenuItem>
          <DropdownMenuSeparator />

          {renderRoleActions()}

          {!isCurrentlyAdmin && (
            <>
              <DropdownMenuSeparator />
              <AlertDialogTrigger asChild>
                <DropdownMenuItem className="text-red-600 focus:bg-red-50 focus:text-red-600">
                  Delete User
                </DropdownMenuItem>
              </AlertDialogTrigger>
            </>
          )}
        </DropdownMenuContent>
      </DropdownMenu>

      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action will permanently delete the user{' '}
            <span className="font-semibold">{user.displayName || user.primaryEmail}</span>. This
            cannot be undone.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel disabled={isPending}>Cancel</AlertDialogCancel>
          <AlertDialogAction
            onClick={handleDelete}
            disabled={isPending}
            className="bg-red-600 hover:bg-red-700"
          >
            {isPending ? 'Deleting...' : 'Yes, delete user'}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

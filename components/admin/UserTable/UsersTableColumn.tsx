'use client';

import { ColumnDef } from '@tanstack/react-table';
import { ArrowUpDown } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { UserActionsCell } from './UserActionsCell';

export type UserForTable = {
  id: string;
  displayName: string | null;
  primaryEmail: string | null;
  profileImageUrl: string | null;
  signedUpAt: string;
  lastActiveAt: string | null;
  permissions: string[];
};

export const columns: ColumnDef<UserForTable>[] = [
  {
    accessorKey: 'displayName',
    header: ({ column }) => (
      <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
        User
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
    cell: ({ row }) => {
      const user = row.original;
      return (
        <div className="flex items-center gap-3 pl-4">
          <Avatar>
            <AvatarImage src={user.profileImageUrl ?? undefined} />
            <AvatarFallback>
              {user.displayName?.charAt(0) || user.primaryEmail?.charAt(0) || '?'}
            </AvatarFallback>
          </Avatar>
          <div className="flex flex-col">
            <span className="font-medium">{user.displayName || 'No Name'}</span>
            <span className="text-muted-foreground text-sm">{user.primaryEmail}</span>
          </div>
        </div>
      );
    },
    meta: {
      headerClassName: 'w-[35%]',
    },
  },
  {
    accessorKey: 'permissions',
    header: 'Role',
    cell: ({ row }) => {
      const isAdmin = row.original.permissions.includes('admin');
      const isUser = row.original.permissions.includes('user');
      return isAdmin ? (
        <Badge>Admin</Badge>
      ) : isUser ? (
        <Badge variant="secondary">User</Badge>
      ) : (
        <Badge variant="outline">No Role</Badge>
      );
    },
    sortingFn: (rowA, rowB) => {
      const aIsAdmin = rowA.original.permissions.includes('admin');
      const bIsAdmin = rowB.original.permissions.includes('admin');
      return aIsAdmin === bIsAdmin ? 0 : aIsAdmin ? -1 : 1;
    },
    meta: {
      headerClassName: 'w-[15%]',
    },
  },
  {
    accessorKey: 'signedUpAt',
    header: ({ column }) => (
      <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
        Signed Up
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
    cell: ({ row }) => {
      const date = new Date(row.original.signedUpAt);
      return <div className="pl-4">{date.toLocaleString()}</div>;
    },
    meta: {
      headerClassName: 'w-[20%]',
    },
  },
  {
    accessorKey: 'lastActiveAt',
    header: ({ column }) => (
      <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
        Last Active
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
    cell: ({ row }) => {
      const date = new Date(row.original.lastActiveAt ?? row.original.signedUpAt);
      return <div className="pl-4">{date.toLocaleString()}</div>;
    },
    meta: {
      headerClassName: 'w-[20%]',
    },
  },
  {
    id: 'actions',
    cell: ({ row }) => <UserActionsCell user={row.original} />,
    meta: {
      headerClassName: 'w-[10%]',
    },
  },
];

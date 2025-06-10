import { SidebarMenuButton, SidebarMenuItem } from '@/components/ui/sidebar';
import Link from 'next/link';
import { Shield } from 'lucide-react';
import { stackServerApp } from '@/stack';

export async function SideNavAdmin() {
  const user = await stackServerApp.getUser({ or: 'redirect' });
  const isAdmin = Boolean(await user.getPermission('admin'));

  if (!isAdmin) {
    return <></>;
  }

  return (
    <SidebarMenuItem key="admin">
      <SidebarMenuButton
        asChild
        tooltip="Admin"
        className="hover:bg-sidebar-accent hover:text-sidebar-accent-foreground h-10 transition-all duration-200"
      >
        <Link href="/tools/admin" className="flex items-center gap-3">
          <Shield />
          <span className="truncate font-medium">Admin</span>
        </Link>
      </SidebarMenuButton>
    </SidebarMenuItem>
  );
}

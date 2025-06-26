import { SidebarFooter, SidebarMenuItem } from '@/components/ui/sidebar';
import { UserButton } from '@stackframe/stack';
import { stackServerApp } from '@/stack';

export async function SideNavFooter() {
  const user = await stackServerApp.getUser({ or: 'redirect' });
  return (
    <SidebarFooter className="border-sidebar-border list-none border-r">
      <SidebarMenuItem>
        <div className="flex items-center gap-3">
          <div className="translate-x-1.5">
            <UserButton />
          </div>
          <div className="flex w-full -translate-y-1 flex-col gap-0 overflow-hidden p-2 text-left">
            <span className="truncate font-medium">{user.displayName}</span>
            <span className="text-muted-foreground -translate-y-1 truncate text-sm">
              {user.primaryEmail}
            </span>
          </div>
        </div>
      </SidebarMenuItem>
    </SidebarFooter>
  );
}

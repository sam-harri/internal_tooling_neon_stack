import { ReactNode } from 'react';
import { ensureToolPermissions } from '@/lib/auth';
import { SideNav } from '@/components/navigation/SideNav';
import { SideNavHeader } from '@/components/navigation/SideNavHeader';
import { SideNavBody } from '@/components/navigation/SideNavBody';
import { SideNavFooter } from '@/components/navigation/SideNavFooter';

interface ToolsLayoutProps {
  children: ReactNode;
}

export default async function ToolsLayout({ children }: ToolsLayoutProps) {
  await ensureToolPermissions();
  return (
    <div className="relative flex h-screen w-full overflow-hidden">
      <SideNav>
        <SideNavHeader />
        <SideNavBody />
        <SideNavFooter />
      </SideNav>
      <div className="flex h-full min-w-0 flex-1 flex-col">
        <main className="flex-1 overflow-y-auto">{children}</main>
      </div>
    </div>
  );
}

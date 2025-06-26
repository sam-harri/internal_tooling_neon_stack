import {
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from '@/components/ui/sidebar';
import Image from 'next/image';
import { appConfig } from '@/config/app';

export function SideNavHeader() {
  return (
    <SidebarHeader className="border-sidebar-border border-r border-b">
      <SidebarMenu>
        <SidebarMenuItem>
          <SidebarMenuButton size="lg" className="data-[state=open]:bg-sidebar-accent">
            <div className="flex aspect-square size-8 items-center justify-center rounded-lg">
              <Image src={appConfig.metadata.logo} alt="your-logo" width={24} height={24} />
            </div>
            <div className="grid flex-1 text-left text-sm leading-tight">
              <span className="truncate font-semibold">{appConfig.metadata.companyName}</span>
              <span className="text-muted-foreground truncate text-xs">{appConfig.metadata.internalToolName}</span>
            </div>
          </SidebarMenuButton>
        </SidebarMenuItem>
      </SidebarMenu>
    </SidebarHeader>
  );
}

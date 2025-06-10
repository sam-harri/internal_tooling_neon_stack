import {
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from '@/components/ui/sidebar';
import Link from 'next/link';
import { SideNavAdmin } from './SideNavAdmin';
import { appConfig } from '@/config/app';

const tools = appConfig.navigation.tools;

export function SideNavBody() {
  return (
    <SidebarContent className="flex flex-col border-r px-2">
      <SidebarGroup>
        <SidebarGroupContent>
          <SidebarMenu>
            {tools.map((item: { title: string; icon: any; url: string }) => (
              <SidebarMenuItem key={item.title}>
                <SidebarMenuButton
                  asChild
                  tooltip={item.title}
                  className="hover:bg-sidebar-accent hover:text-sidebar-accent-foreground h-10 transition-all duration-200"
                >
                  <Link href={item.url} className="flex items-center gap-3">
                    <item.icon />
                    <span className="truncate font-medium">{item.title}</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
            <SideNavAdmin />
          </SidebarMenu>
        </SidebarGroupContent>
      </SidebarGroup>
    </SidebarContent>
  );
}

import {
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from '@/components/ui/sidebar';
import { Home } from 'lucide-react';
import { BarChart3 } from 'lucide-react';
import Link from 'next/link';
import { SideNavAdmin } from './SideNavAdmin';

const tools = [
  {
    title: 'Home',
    icon: Home,
    url: '/tools',
  },
  {
    title: 'Analytics',
    icon: BarChart3,
    url: '/tools/analytics',
  },
];

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

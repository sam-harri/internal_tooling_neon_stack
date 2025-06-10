'use client';

import { Sidebar, useSidebar } from '@/components/ui/sidebar';
import * as React from 'react';

const SIDEBAR_WIDTH = 64;

export function SideNav({ children }: { children: React.ReactNode }) {
  const { setOpen } = useSidebar();

  return (
    <div style={{ width: SIDEBAR_WIDTH }}>
      <Sidebar
        className="group absolute top-0 left-0 z-30 h-screen w-16 transition-all duration-300 ease-in-out hover:w-64"
        collapsible="none"
        onMouseEnter={() => setOpen(true)}
        onMouseLeave={() => setOpen(false)}
      >
        {children}
      </Sidebar>
    </div>
  );
}

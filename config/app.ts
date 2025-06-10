import { Home, Hammer } from 'lucide-react';

export const appConfig = {
  metadata: {
    companyName: 'Your Company',
    internalToolName: 'Internal Tool Name',
    description: 'Your Company Internal Tool Description',
    logo: '/your-logo.png',
  },
  navigation: {
    tools: [
      {
        title: 'Home',
        icon: Home,
        url: '/tools',
      },
      {
        title: 'Tool 1',
        icon: Hammer,
        url: '/tools/tool1',
      },
    ],
  }
} as const;

export type AppConfig = typeof appConfig; 
'use client';

import { useTransition } from 'react';
import { toast } from 'sonner';
import { XIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface ListItemProps {
  item: {
    id: number;
    value: string;
    addedByDisplayName: string | null;
    addedByEmail: string | null;
  };
  removeAction: (id: number) => Promise<{ success: boolean; message: string }>;
}

export function ListItem({ item, removeAction }: ListItemProps) {
  const [isPending, startTransition] = useTransition();

  const handleRemove = () => {
    startTransition(async () => {
      const result = await removeAction(item.id);
      if (result.success) toast.success(result.message);
      else toast.error(result.message);
    });
  };

  return (
    <div className="hover:bg-muted flex min-h-[44px] items-center justify-between rounded-md p-2">
      <div className="flex flex-grow flex-col truncate pr-2">
        <span className="truncate text-sm font-medium">{item.value}</span>

        {item.addedByEmail && (
          <span className="text-muted-foreground truncate text-xs">
            by:{' '}
            <span className="text-foreground/80">{item.addedByDisplayName || 'Unknown User'}</span>{' '}
            ({item.addedByEmail})
          </span>
        )}
      </div>

      <Button
        variant="ghost"
        size="icon"
        onClick={handleRemove}
        disabled={isPending}
        className="h-7 w-7 flex-shrink-0"
      >
        <XIcon className="h-4 w-4" />
      </Button>
    </div>
  );
}

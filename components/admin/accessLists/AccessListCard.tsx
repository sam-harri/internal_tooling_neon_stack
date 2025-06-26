'use client';

import { useRef, useTransition, useState } from 'react';
import { toast } from 'sonner';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ListItem } from './ListItem';

type ListItemData = {
  id: number;
  value: string;
  addedByDisplayName: string | null;
  addedByEmail: string | null;
};

interface AccessListCardProps {
  title: string;
  description: string;
  inputPlaceholder: string;
  list: ListItemData[];
  addAction: (formData: FormData) => Promise<{ success: boolean; message: string }>;
  removeAction: (id: number) => Promise<{ success: boolean; message: string }>;
}

const PAGE_SIZE = 3;

export function AccessListCard({
  title,
  description,
  inputPlaceholder,
  list,
  addAction,
  removeAction,
}: AccessListCardProps) {
  const [isPending, startTransition] = useTransition();
  const formRef = useRef<HTMLFormElement>(null);
  const [currentPage, setCurrentPage] = useState(0);

  const handleAdd = async (formData: FormData) => {
    startTransition(async () => {
      const result = await addAction(formData);
      if (result.success) {
        toast.success(result.message);
        formRef.current?.reset();
      } else {
        toast.error(result.message);
      }
    });
  };

  const totalPages = Math.ceil(list.length / PAGE_SIZE);
  const startIndex = currentPage * PAGE_SIZE;
  const paginatedList = list.slice(startIndex, startIndex + PAGE_SIZE);

  return (
    <Card className="flex flex-col gap-2 pt-6 pb-2">
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent className="flex-grow">
        <form ref={formRef} action={handleAdd} className="mb-4 flex gap-2">
          <Input
            name="value"
            placeholder={inputPlaceholder}
            required
            className="h-9"
            disabled={isPending}
          />
          <Button type="submit" className="h-9" disabled={isPending}>
            {isPending ? 'Adding...' : 'Add'}
          </Button>
        </form>

        <div className="min-h-[156px] pr-2">
          {paginatedList.length > 0 ? (
            paginatedList.map((item) => (
              <ListItem key={item.id} item={item} removeAction={removeAction} />
            ))
          ) : (
            <p className="text-muted-foreground pt-16 text-center text-sm">The list is empty.</p>
          )}
        </div>
      </CardContent>

      <CardFooter className="flex items-center justify-center gap-2">
        <Button
          variant="ghost"
          size="icon"
          className="h-7 w-7"
          onClick={() => setCurrentPage((prev) => prev - 1)}
          disabled={currentPage === 0}
        >
          <ChevronLeft className="h-4 w-4" />
        </Button>

        <Button
          variant="ghost"
          size="icon"
          className="h-7 w-7"
          onClick={() => setCurrentPage((prev) => prev + 1)}
          disabled={currentPage >= totalPages - 1}
        >
          <ChevronRight className="h-4 w-4" />
        </Button>
      </CardFooter>
    </Card>
  );
}

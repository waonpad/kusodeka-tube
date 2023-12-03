'use client';

import * as React from 'react';
import { format } from 'date-fns';
import { Calendar as CalendarIcon } from 'lucide-react';
import { cn } from 'ui/lib/utils';
import { Button } from 'ui/components/ui/button';
import { Calendar } from 'ui/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from 'ui/components/ui/popover';

export function DatePicker() {
  const [date, setDate] = React.useState<Date>();

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          className={cn(
            'w-[280px] justify-start text-left font-normal',
            !date && 'text-muted-foreground'
          )}
          variant="outline"
        >
          <CalendarIcon className="mr-2 h-4 w-4" />
          {date ? format(date, 'PPP') : <span>Pick a date</span>}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0">
        <Calendar initialFocus mode="single" onSelect={setDate} selected={date} />
      </PopoverContent>
    </Popover>
  );
}

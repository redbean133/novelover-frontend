import * as React from "react";
import { ChevronDownIcon } from "lucide-react";
import { Label } from "@/presentation/shadcn-ui/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/presentation/shadcn-ui/components/ui/popover";
import { Button } from "@/presentation/shadcn-ui/components/ui/button";
import { Calendar } from "@/presentation/shadcn-ui/components/ui/calendar";

interface IDatePickerProps {
  title: string;
  date?: Date;
  onSelectDate: (date: Date) => void;
  align?: "start" | "center" | "end";
  side?: "top" | "right" | "bottom" | "left";
  minDate?: Date;
  maxDate?: Date;
}

export const DatePicker = ({
  title,
  date,
  onSelectDate,
  align = "start",
  side = "bottom",
  minDate,
  maxDate,
}: IDatePickerProps) => {
  const [open, setOpen] = React.useState(false);

  return (
    <div className="flex flex-col gap-2 w-full">
      <Label htmlFor="date" className="font-semibold">
        {title}
      </Label>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            id="date"
            className="w-48 justify-between font-normal"
          >
            {date ? date.toLocaleDateString() : "Chọn ngày"}
            <ChevronDownIcon />
          </Button>
        </PopoverTrigger>
        <PopoverContent
          className="w-auto overflow-hidden p-0"
          align={align}
          side={side}
        >
          <Calendar
            mode="single"
            selected={date}
            captionLayout="dropdown"
            onSelect={(selectedDate: Date) => {
              onSelectDate(selectedDate);
              setOpen(false);
            }}
            disabled={[
              ...(minDate ? [{ before: minDate }] : []),
              ...(maxDate ? [{ after: maxDate }] : []),
            ]}
          />
        </PopoverContent>
      </Popover>
    </div>
  );
};

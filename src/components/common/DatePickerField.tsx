import { memo, useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { ChevronDownIcon } from "lucide-react";

interface DatePickerFieldProps {
  label: string;
  value?: string; // YYYY-MM-DD
  onChange: (value?: string) => void;
  disabled?: boolean;
}

function DatePickerField({
  label,
  value,
  onChange,
  disabled = false,
}: DatePickerFieldProps) {
  const [open, setOpen] = useState(false);

  const selectedDate = useMemo(() => {
    if (!value) return undefined;
    const date = new Date(value);
    return isNaN(date.getTime()) ? undefined : date;
  }, [value]);

  const formattedDate = useMemo(() => {
    if (!selectedDate) return "Select date";

    const mm = String(selectedDate.getMonth() + 1).padStart(2, "0");
    const dd = String(selectedDate.getDate()).padStart(2, "0");
    const yyyy = selectedDate.getFullYear();

    return `${mm}-${dd}-${yyyy}`;
  }, [selectedDate]);

  return (
    <div className="flex flex-col gap-2">
      <Label>{label}</Label>

      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            type="button"
            variant="outline"
            disabled={disabled}
            className="w-full justify-between font-normal"
          >
            {formattedDate}
            <ChevronDownIcon className="ml-2 h-4 w-4 opacity-60" />
          </Button>
        </PopoverTrigger>

        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            mode="single"
            selected={selectedDate}
            captionLayout="dropdown"
            onSelect={(date) => {
              onChange(date ? date.toISOString().slice(0, 10) : undefined);
              setOpen(false);
            }}
          />
        </PopoverContent>
      </Popover>
    </div>
  );
}

export default memo(DatePickerField);

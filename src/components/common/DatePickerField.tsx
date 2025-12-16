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
    const [yyyy, mm, dd] = value.split("-").map(Number);
    return new Date(yyyy, mm - 1, dd);
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
            disabled={disabled}
            selected={selectedDate}
            captionLayout="dropdown"
            onSelect={(date) => {
              if (!date) {
                onChange(undefined);
                return;
              }

              const yyyy = date.getFullYear();
              const mm = String(date.getMonth() + 1).padStart(2, "0");
              const dd = String(date.getDate()).padStart(2, "0");

              onChange(`${yyyy}-${mm}-${dd}`);
              setOpen(false);
            }}
          />
        </PopoverContent>
      </Popover>
    </div>
  );
}

export default memo(DatePickerField);

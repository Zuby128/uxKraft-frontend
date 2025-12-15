import { Label } from "../ui/label";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "../ui/button";
import { ChevronDownIcon } from "lucide-react";
import { useState } from "react";
import DateSection from "../common/DateSection";

function PlanningRequirements({ item }: { item: any }) {
  const [open, setOpen] = useState<boolean>(false);
  const [date, setDate] = useState<Date | undefined>();

  console.log(date);
  return (
    <div className="p-4 bg-white">
      sss
      <DateSection
        title="Planning & Requirements"
        sectionKey="planning"
        data={item?.planning}
        fields={[
          { key: "poApprovalDate", label: "PO Approval Date" },
          { key: "hotelNeedByDate", label: "Hotel Need By Date" },
          { key: "expectedDelivery", label: "Expected Delivery" },
        ]}
        onChange={(field, value) => console.log("planning", { [field]: value })}
      />
      ; dddd
      <div className="font-bold mb-4">Planning & Requirements</div>
      <div className="grid grid-cols-3 gap-4">
        <div>
          <Label className="mb-2">PO Approval Date</Label>
          <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                id="date"
                className="w-full justify-between font-normal"
              >
                {date ? date.toLocaleDateString() : "Select date"}
                <ChevronDownIcon />
              </Button>
            </PopoverTrigger>
            <PopoverContent
              className="w-auto overflow-hidden p-0"
              align="start"
            >
              <Calendar
                mode="single"
                selected={date}
                captionLayout="dropdown"
                onSelect={(date) => {
                  setDate(date);
                  setOpen(false);
                }}
              />
            </PopoverContent>
          </Popover>
        </div>
        <div>
          <Label className="mb-2">Hotel Need by Date</Label>
          <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                id="date"
                className="w-full justify-between font-normal"
              >
                {date ? date.toLocaleDateString() : "Select date"}
                <ChevronDownIcon />
              </Button>
            </PopoverTrigger>
            <PopoverContent
              className="w-auto overflow-hidden p-0"
              align="start"
            >
              <Calendar
                mode="single"
                selected={date}
                captionLayout="dropdown"
                onSelect={(date) => {
                  setDate(date);
                  setOpen(false);
                }}
              />
            </PopoverContent>
          </Popover>
        </div>
        <div>
          <Label className="mb-2">Expected Delivery</Label>
          <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                id="date"
                className="w-full justify-between font-normal"
              >
                {date ? date.toLocaleDateString() : "Select date"}
                <ChevronDownIcon />
              </Button>
            </PopoverTrigger>
            <PopoverContent
              className="w-auto overflow-hidden p-0"
              align="start"
            >
              <Calendar
                mode="single"
                selected={date}
                captionLayout="dropdown"
                onSelect={(date) => {
                  setDate(date);
                  setOpen(false);
                }}
              />
            </PopoverContent>
          </Popover>
        </div>
      </div>
    </div>
  );
}

export default PlanningRequirements;

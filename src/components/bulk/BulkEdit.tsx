import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "../ui/label";
import { Input } from "../ui/input";

function BulkEdit() {
  return (
    <div className="p-4 bg-white flex flex-col gap-4">
      <div className="font-bold">Item Details</div>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label className="mb-2">Ordered Date</Label>
          <Select>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select a fruit" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Fruits</SelectLabel>
                <SelectItem value="apple">Apple</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
        <div>
          <Label className="mb-2">Ordered Date</Label>
          <Select>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select a fruit" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Fruits</SelectLabel>
                <SelectItem value="apple">Apple</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
      </div>
      <div>
        <Label className="mb-2">Ordered Date</Label>
        <Input className="w-full" />
      </div>
      <div>
        <Label className="mb-2">Notes for this item</Label>
        <Input className="w-full" />
      </div>
    </div>
  );
}

export default BulkEdit;

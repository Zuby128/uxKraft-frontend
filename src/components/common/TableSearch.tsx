import { FileDown, Search } from "lucide-react";
import { Input } from "../ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "../ui/button";

function TableSearch() {
  return (
    <div className="flex flex-nowrap items-center w-full max-w-3xl mb-4 gap-2">
      <div className="relative w-full max-w-sm ">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          type="search"
          placeholder="Ara..."
          className="pl-10" // Icon için sol padding
        />
      </div>
      <Select>
        <SelectTrigger className="!w-1/4 max-w-64">
          <SelectValue placeholder="Phase" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>Phase</SelectLabel>
            <SelectItem value="apple">01</SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>
      <Select>
        <SelectTrigger className="!w-1/4 max-w-64">
          <SelectValue placeholder="Vendor" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>Vendor</SelectLabel>
            <SelectItem value="apple">test vendor</SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>
      <Button variant="ghost" className="!p-0 !m-0" type="button">
        <FileDown className="!w-8 !h-8" />
      </Button>
    </div>
  );
}

export default TableSearch;

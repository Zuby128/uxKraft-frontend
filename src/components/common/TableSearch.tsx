import { memo, useCallback, useEffect, useState } from "react";
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
import { useDebounce } from "@/hooks/use-debounce";

interface Props {
  onSearch: (params: {
    search?: string;
    vendorId?: string;
    phase?: string;
  }) => Promise<void>;
  onReset: () => Promise<void>;
  onExport: () => void;
  vendors: any[];
  phase: string[];
}

function TableSearchComponent({
  onSearch,
  vendors,
  phase,
  onReset,
  onExport,
}: Props) {
  const [searchText, setSearchText] = useState("");
  const [vendorId, setVendorId] = useState<string | undefined>();
  const [phaseValue, setPhaseValue] = useState<string | undefined>();

  const debouncedSearch = useDebounce(searchText, 400);

  const handleSearch = useCallback(() => {
    const hasFilter = debouncedSearch || vendorId || phaseValue;

    if (!hasFilter) {
      onReset();
      return;
    }

    onSearch({
      search: debouncedSearch || undefined,
      vendorId: vendorId !== "empty" && vendorId ? vendorId : undefined,
      phase: phaseValue !== "empty" && phaseValue ? phaseValue : undefined,
    });
  }, [debouncedSearch, vendorId, phaseValue, onSearch]);

  useEffect(() => {
    handleSearch();
  }, [handleSearch]);

  return (
    <div className="grid grid-cols-12 items-center w-full max-w-5xl mb-4 gap-2">
      {/* Search */}
      <div className="relative w-full col-span-7">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          type="search"
          placeholder="Find by item Name, Item # or Spec #"
          className="pl-10"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
        />
      </div>

      {/* Phase */}
      <div className="col-span-2">
        <Select value={phaseValue} onValueChange={setPhaseValue}>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Phase" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Phase</SelectLabel>
              <SelectItem value="empty">
                <span className="text-muted-foreground italic">
                  Clear selection
                </span>
              </SelectItem>
              {phase.map((p) => (
                <SelectItem key={p} value={p}>
                  {p}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>

      {/* Vendor */}
      <div className="col-span-2">
        <Select value={vendorId} onValueChange={setVendorId}>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Vendor" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Vendor</SelectLabel>
              <SelectItem value="empty">
                <span className="text-muted-foreground italic">
                  Clear selection
                </span>
              </SelectItem>
              {vendors.map((v) => (
                <SelectItem key={v.vendorId} value={String(v.vendorId)}>
                  {v.vendorName}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>

      {/* Export */}
      <Button variant="ghost" size="icon-lg" onClick={onExport}>
        <FileDown className="!w-8 !h-8" />
      </Button>
    </div>
  );
}

export default memo(TableSearchComponent);

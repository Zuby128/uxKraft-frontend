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
import { useCategoriesStore } from "@/store/categoriesStore";
import { useTimeline } from "@/context/TimelineContext";

function BulkEdit() {
  const { categories } = useCategoriesStore();
  const { state, updateField } = useTimeline();

  const bulk = state.bulkEdit;

  return (
    <div className="p-4 bg-white flex flex-col gap-4">
      <div className="font-bold">Item Details</div>

      <div className="grid grid-cols-2 gap-4">
        {/* Location */}
        <div>
          <Label className="mb-2">Location</Label>
          <Input
            className="w-full"
            value={bulk.location ?? ""}
            onChange={(e) =>
              updateField({
                section: "bulkEdit",
                field: "location",
                value: e.target.value,
              })
            }
          />
        </div>

        {/* Category */}
        <div>
          <Label className="mb-2">Categories</Label>
          <Select
            value={bulk.categoryId?.toString() ?? ""}
            onValueChange={(value) =>
              updateField({
                section: "bulkEdit",
                field: "categoryId",
                value: Number(value),
              })
            }
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select category" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Categories</SelectLabel>
                {categories.map((v) => (
                  <SelectItem key={v.id} value={v.id.toString()}>
                    {v.name}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Ship From */}
      <div>
        <Label className="mb-2">Ship From</Label>
        <Input
          className="w-full"
          value={bulk.shipFrom ?? ""}
          onChange={(e) =>
            updateField({
              section: "bulkEdit",
              field: "shipFrom",
              value: e.target.value,
            })
          }
        />
      </div>

      {/* Notes */}
      <div>
        <Label className="mb-2">Notes for this item</Label>
        <Input
          className="w-full"
          value={bulk.notes ?? ""}
          onChange={(e) =>
            updateField({
              section: "bulkEdit",
              field: "notes",
              value: e.target.value,
            })
          }
        />
      </div>
    </div>
  );
}

export default BulkEdit;

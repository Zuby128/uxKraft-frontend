import { Button } from "@/components/ui/button";
import { LayersPlus, SquarePen, Trash2 } from "lucide-react";

interface EditTableProps {
  onBulkEdit: () => void;
  onUpdateTracking: () => void;
  onCreatePO: () => void;
  onDelete: () => void;
}
export function EditTable({
  onBulkEdit,
  onUpdateTracking,
  onCreatePO,
  onDelete,
}: EditTableProps) {
  const selected = 2;
  return (
    <div>
      <div className="flex flex-nowrap items-center gap-2 text-xs mb-2">
        {selected > 0 && (
          <span>
            {selected} {selected > 1 ? "items" : "item"} selected
          </span>
        )}
        <Button
          variant="ghost"
          size="sm"
          className="text-xs"
          disabled={!selected}
          onClick={onBulkEdit}
        >
          <SquarePen className="h-4 w-4" /> Bulk Edit
        </Button>
        <Button
          variant="ghost"
          size="sm"
          className="text-xs"
          disabled={!selected}
          onClick={onUpdateTracking}
        >
          <SquarePen className="h-4 w-4" /> Update Tracking
        </Button>
        <Button
          variant="ghost"
          size="sm"
          className="text-xs"
          disabled={!selected}
          onClick={onCreatePO}
        >
          <LayersPlus className="h-4 w-4" /> Create PO
        </Button>
        <Button
          variant="ghost"
          size="sm"
          className="text-xs text-red-500"
          disabled={!selected}
          onClick={onDelete}
        >
          <Trash2 className="h-4 w-4" /> Delete
        </Button>
      </div>
    </div>
  );
}

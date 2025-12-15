import { Button } from "@/components/ui/button";
import { useOrderItemsStore } from "@/store/orderItems.store";
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
  const { selectedItemIds } = useOrderItemsStore();

  return (
    <div>
      <div className="flex flex-nowrap items-center gap-2 text-xs mb-2">
        {selectedItemIds.length > 0 && (
          <span>
            {selectedItemIds.length}{" "}
            {selectedItemIds.length > 1 ? "items" : "item"} selected
          </span>
        )}
        <Button
          variant="ghost"
          size="sm"
          className="text-xs"
          disabled={selectedItemIds.length < 1}
          onClick={onBulkEdit}
        >
          <SquarePen className="h-4 w-4" /> Bulk Edit
        </Button>
        <Button
          variant="ghost"
          size="sm"
          className="text-xs"
          disabled={selectedItemIds.length < 1}
          onClick={onUpdateTracking}
        >
          <SquarePen className="h-4 w-4" /> Update Tracking
        </Button>
        <Button
          variant="ghost"
          size="sm"
          className="text-xs"
          disabled={selectedItemIds.length < 1}
          onClick={onCreatePO}
        >
          <LayersPlus className="h-4 w-4" /> Create PO
        </Button>
        <Button
          variant="ghost"
          size="sm"
          className="text-xs text-red-500"
          disabled={selectedItemIds.length < 1}
          onClick={onDelete}
        >
          <Trash2 className="h-4 w-4" /> Delete
        </Button>
      </div>
    </div>
  );
}

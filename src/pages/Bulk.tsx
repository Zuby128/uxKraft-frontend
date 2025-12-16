import { useEffect, useMemo, useCallback } from "react";
import BulkEdit from "@/components/bulk/BulkEdit";
import UpdateTracking from "@/components/bulk/UpdateTracking";
import { DataTable } from "@/components/common/DataTable";
import { EditTable } from "@/components/common/EditTable";
import TableSearch from "@/components/common/TableSearch";
import { useTimeline } from "@/context/TimelineContext";
import {
  patchBulkItems,
  patchBulkOrderLogistics,
  patchBulkOrderPlanning,
  patchBulkOrderProduction,
} from "@/services/bulk.service";
import { useRightSidebarStore } from "@/store/RightSidebarStore";
import { useOrderItemsStore } from "@/store/orderItems.store";
import { useVendorsStore } from "@/store/vendorsStore";
import { exportToCsv } from "@/utils/export-to-csv";
import { mapOrderItemsToCsv } from "@/utils/json-to-csv";
import { toast } from "sonner";

const PHASES = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"];

function Bulk() {
  const { openBar } = useRightSidebarStore();
  const { getState, reset } = useTimeline();

  const {
    items,
    loading,
    fetchAll,
    search,
    mapObject,
    selectedItemIds,
    setSelectedItemIds,
    clearSelectedItemIds,
    updateList,
  } = useOrderItemsStore();

  const { vendors, fetchVendors } = useVendorsStore();

  useEffect(() => {
    fetchAll();
    fetchVendors();
  }, [fetchAll, fetchVendors]);

  useEffect(() => {
    clearSelectedItemIds();
  }, [clearSelectedItemIds]);

  const handleExport = useCallback(() => {
    const csvData = mapOrderItemsToCsv(items);
    exportToCsv("order-items.csv", csvData);
  }, [items]);

  const onSelectedElements = useCallback(
    (ids: number[]) => {
      setSelectedItemIds(ids);
    },
    [setSelectedItemIds]
  );

  const onBulkEditAction = useCallback(async () => {
    if (!selectedItemIds.length) {
      toast("No items selected");
      return;
    }

    const state = getState();

    try {
      await Promise.all([
        patchBulkOrderLogistics({
          orderItemIds: selectedItemIds,
          orderedDate: state.logistics.orderedDate as any,
          shippedDate: state.logistics.shippedDate as any,
          deliveredDate: state.logistics.deliveredDate as any,
          shippingNotes: state.logistics.shippingNotes as any,
        }),
        patchBulkOrderPlanning({
          orderItemIds: selectedItemIds,
          poApprovalDate: state.planning.poApprovalDate as any,
          hotelNeedByDate: state.planning.hotelNeedByDate as any,
          expectedDelivery: state.planning.expectedDelivery as any,
        }),
        patchBulkOrderProduction({
          orderItemIds: selectedItemIds,
          cfaShopsSend: state.production.cfaShopsSend as any,
          cfaShopsApproved: state.production.cfaShopsApproved as any,
          cfaShopsDelivered: state.production.cfaShopsDelivered as any,
        }),
      ]);

      selectedItemIds.forEach((orderItemId) => {
        updateList(orderItemId, {
          logistics: state.logistics,
          planning: state.planning,
          production: state.production,
        } as any);
      });

      toast("Items Updated");
      clearSelectedItemIds();
      reset();
    } catch {
      toast("Items Not Updated, please try again later");
    }
  }, [selectedItemIds, getState, updateList, clearSelectedItemIds, reset]);

  const onEditItemAction = useCallback(async () => {
    if (!selectedItemIds.length) {
      toast("No items selected");
      return;
    }

    const { bulkEdit } = getState();
    if (!bulkEdit) return;

    const itemIds = Array.from(
      new Set(
        selectedItemIds
          .map((id) => mapObject[id]?.item?.itemId)
          .filter((id): id is number => typeof id === "number")
      )
    );

    if (!itemIds.length) {
      toast("No valid items found");
      return;
    }

    try {
      await patchBulkItems({
        itemIds,
        ...(bulkEdit.categoryId != null && { categoryId: bulkEdit.categoryId }),
        ...(bulkEdit.location?.trim() && { location: bulkEdit.location }),
        ...(bulkEdit.shipFrom?.trim() && { shipFrom: bulkEdit.shipFrom }),
        ...(bulkEdit.notes?.trim() && { notes: bulkEdit.notes }),
      });

      selectedItemIds.forEach((orderItemId) => {
        const currentItem = mapObject[orderItemId]?.item;
        if (!currentItem) return;

        updateList(orderItemId, {
          item: {
            ...currentItem,
            ...(bulkEdit.categoryId != null && {
              categoryId: bulkEdit.categoryId,
            }),
            ...(bulkEdit.location && { location: bulkEdit.location }),
            ...(bulkEdit.shipFrom && { shipFrom: bulkEdit.shipFrom }),
            ...(bulkEdit.notes && { notes: bulkEdit.notes }),
          },
        } as any);
      });

      toast("Items Updated");
      clearSelectedItemIds();
      reset();
    } catch (error) {
      console.error(error);
      toast("Items Not Updated, please try again later");
    }
  }, [
    selectedItemIds,
    getState,
    mapObject,
    updateList,
    clearSelectedItemIds,
    reset,
  ]);

  const openTrackingSidebar = useCallback(
    (title: string, content: React.ReactNode) => {
      openBar(title, content, `${selectedItemIds.length} items selected`, {
        text: "Save Changes",
        onClick: onBulkEditAction,
      });
    },
    [openBar, selectedItemIds.length, onBulkEditAction]
  );

  const openBulkSidebar = useCallback(
    (title: string, content: React.ReactNode) => {
      openBar(title, content, `${selectedItemIds.length} items selected`, {
        text: "Save Changes",
        onClick: onEditItemAction,
      });
    },
    [openBar, selectedItemIds.length, onEditItemAction]
  );

  const columns = useMemo(
    () => [
      { key: "orderItemId", header: "Order #" },
      { key: "item", header: "Item #", render: (r: any) => r?.item?.itemId },
      { key: "spec", header: "Spec #", render: (r: any) => r?.item?.specNo },
      {
        key: "name",
        header: "Item Name",
        render: (r: any) => r?.item?.itemName,
      },
      {
        key: "vendor",
        header: "Vendor",
        render: (r: any) => r?.vendor?.vendorName,
      },
      {
        key: "shipTo",
        header: "Ship To",
        render: (r: any) => (
          <div className="truncate max-w-[150px]">{r?.customer?.name}</div>
        ),
      },
      { key: "quantity", header: "Qty" },
      { key: "phase", header: "Phase" },
      {
        key: "price",
        header: "Price",
        render: (r: any) => r?.totalPrice / 100,
      },
      {
        key: "shipNotes",
        header: "Ship Notes",
        render: (r: any) => (
          <div className="truncate max-w-[150px]">
            {r?.logistics?.shippingNotes}
          </div>
        ),
      },
    ],
    []
  );

  return (
    <div>
      <TableSearch
        vendors={vendors}
        phase={PHASES}
        onSearch={search}
        onReset={fetchAll}
        onExport={handleExport}
      />

      <EditTable
        onBulkEdit={() => openBulkSidebar("Bulk Edit", <BulkEdit />)}
        onUpdateTracking={() =>
          openTrackingSidebar("Update Tracking", <UpdateTracking />)
        }
        onCreatePO={() => {}}
        onDelete={() => {}}
      />

      <DataTable
        columns={columns as any}
        data={items}
        selectable
        selectedElements={onSelectedElements}
      />
    </div>
  );
}

export default Bulk;

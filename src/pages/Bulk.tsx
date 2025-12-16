import { useEffect, useMemo } from "react";
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

function Bulk() {
  const { openBar } = useRightSidebarStore();
  const { getState, reset } = useTimeline();

  const phase = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"];

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
    clearSelectedItemIds(); // sayfa açılınca temiz başla
  }, [fetchAll, fetchVendors, clearSelectedItemIds]);

  const handleExport = () => {
    const csvData = mapOrderItemsToCsv(items);
    exportToCsv("order-items.csv", csvData);
  };

  const columns = useMemo(
    () => [
      { key: "orderItemId", header: "Order #" },
      {
        key: "item",
        header: "Item #",
        render: (row: any) => row?.item?.itemId,
      },
      {
        key: "spec",
        header: "Spec #",
        render: (row: any) => row?.item?.specNo,
      },
      {
        key: "name",
        header: "Item Name",
        render: (row: any) => row?.item?.itemName,
      },
      {
        key: "vendor",
        header: "Vendor",
        render: (row: any) => row?.vendor?.vendorName,
      },
      {
        key: "shipTo",
        header: "Ship To",
        render: (row: any) => (
          <div className="truncate max-w-[150px]">{row?.customer?.name}</div>
        ),
      },
      { key: "quantity", header: "Qty" },
      { key: "phase", header: "Phase" },
      {
        key: "price",
        header: "Price",
        render: (row: any) => row?.totalPrice / 100,
      },
      {
        key: "shipNotes",
        header: "Ship Notes",
        render: (row: any) => (
          <div className="truncate max-w-[150px]">
            {row?.logistics?.shippingNotes}
          </div>
        ),
      },
    ],
    []
  );

  const onSelectedElements = (ids: number[]) => {
    setSelectedItemIds(ids);
  };

  const onBulkEditAction = async () => {
    if (!selectedItemIds.length) {
      toast("No items selected");
      return;
    }
    const state = getState();

    try {
      await patchBulkOrderLogistics({
        orderItemIds: selectedItemIds,
        orderedDate: state.logistics.orderedDate as any,
        shippedDate: state.logistics.shippedDate as any,
        deliveredDate: state.logistics.deliveredDate as any,
        shippingNotes: state.logistics.shippingNotes as any,
      });

      await patchBulkOrderPlanning({
        orderItemIds: selectedItemIds,
        poApprovalDate: state.planning.poApprovalDate as any,
        hotelNeedByDate: state.planning.hotelNeedByDate as any,
        expectedDelivery: state.planning.expectedDelivery as any,
      });

      await patchBulkOrderProduction({
        orderItemIds: selectedItemIds,
        cfaShopsSend: state.production.cfaShopsSend as any,
        cfaShopsApproved: state.production.cfaShopsApproved as any,
        cfaShopsDelivered: state.production.cfaShopsDelivered as any,
      });

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
  };

  const openTrackingSidebar = (title: string, content: any) => {
    openBar(title, content, `${selectedItemIds.length} items selected`, {
      text: "Save Changes",
      onClick: onBulkEditAction,
    });
  };

  const onEditItemAction = async () => {
    if (!selectedItemIds.length) {
      toast("No items selected");
      return;
    }

    const timelineState = getState();
    const bulk = timelineState.bulkEdit;

    const itemIds = Array.from(
      new Set(
        selectedItemIds
          .map((orderItemId) => mapObject[orderItemId]?.item?.itemId)
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
        ...(bulk?.categoryId !== undefined &&
          bulk?.categoryId !== null && { categoryId: bulk.categoryId }),
        ...(bulk?.location?.trim() && { location: bulk.location }),
        ...(bulk?.shipFrom?.trim() && { shipFrom: bulk.shipFrom }),
        ...(bulk?.notes?.trim() && { notes: bulk.notes }),
      });

      selectedItemIds.forEach((orderItemId) => {
        updateList(orderItemId, {
          item: {
            ...mapObject[orderItemId].item,
            ...(bulk?.categoryId != null && { categoryId: bulk.categoryId }),
            ...(bulk?.location && { location: bulk.location }),
            ...(bulk?.shipFrom && { shipFrom: bulk.shipFrom }),
            ...(bulk?.notes && { notes: bulk.notes }),
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
  };

  const openBulkSidebar = (title: string, content: any) => {
    openBar(title, content, `${selectedItemIds.length} items selected`, {
      text: "Save Changes",
      onClick: onEditItemAction,
    });
  };

  return (
    <div>
      <TableSearch
        vendors={vendors}
        phase={phase}
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

import { useMemo, useCallback, lazy, Suspense } from "react";
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
import Spinning from "@/components/common/Spinning";
import formatPrice from "@/utils/format-price";
import { useOrderItemStore } from "@/store/order-item.store";

const PHASES = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"];

const BulkEdit = lazy(() => import("@/components/bulk/BulkEdit"));
const UpdateTracking = lazy(() => import("@/components/bulk/UpdateTracking"));
const IndividualItemDetails = lazy(
  () => import("@/components/individual/IndividualItemDetails")
);

function Bulk() {
  const { openBar } = useRightSidebarStore();
  const { getState, reset } = useTimeline();

  const {
    items,
    fetchAll,
    search,
    mapObject,
    selectedItemIds,
    setSelectedItemIds,
    updateList,
  } = useOrderItemsStore();

  const { vendors } = useVendorsStore();

  const { selectItem } = useOrderItemStore();

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
      toast.error("No items selected");
      return;
    }

    const state = getState();

    try {
      await Promise.all([
        patchBulkOrderLogistics({
          itemIds: selectedItemIds,
          orderedDate: state.orderLogistics.orderedDate as any,
          shippedDate: state.orderLogistics.shippedDate as any,
          deliveredDate: state.orderLogistics.deliveredDate as any,
          shippingNotes: state.orderLogistics.shippingNotes as any,
        }),
        patchBulkOrderPlanning({
          itemIds: selectedItemIds,
          poApprovalDate: state.orderPlanning.poApprovalDate as any,
          hotelNeedByDate: state.orderPlanning.hotelNeedByDate as any,
          expectedDelivery: state.orderPlanning.expectedDelivery as any,
        }),
        patchBulkOrderProduction({
          itemIds: selectedItemIds,
          cfaShopsSend: state.orderProduction.cfaShopsSend as any,
          cfaShopsApproved: state.orderProduction.cfaShopsApproved as any,
          cfaShopsDelivered: state.orderProduction.cfaShopsDelivered as any,
        }),
      ]);

      selectedItemIds.forEach((orderItemId) => {
        updateList(orderItemId, {
          orderLogistics: state.orderLogistics,
          orderPlanning: state.orderPlanning,
          orderProduction: state.orderProduction,
        } as any);
      });

      toast.success("Items Updated");
      reset();
    } catch {
      toast.error("Items Not Updated, please try again later");
    }
  }, [selectedItemIds, getState, updateList, reset]);

  const onEditItemAction = useCallback(async () => {
    if (!selectedItemIds.length) {
      toast.error("No items selected");
      return;
    }

    const { bulkEdit } = getState();
    if (!bulkEdit) return;

    const itemIds = Array.from(
      new Set(
        selectedItemIds
          .map((id) => mapObject[id]?.itemId)
          .filter((id): id is number => typeof id === "number")
      )
    );

    if (!itemIds.length) {
      toast.error("No valid items found");
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

      selectedItemIds.forEach((itemId) => {
        const currentItem = mapObject[itemId];

        console.log(currentItem);
        if (!currentItem) return;

        updateList(itemId, {
          ...currentItem,
          ...(bulkEdit.categoryId != null && {
            categoryId: bulkEdit.categoryId,
          }),
          ...(bulkEdit.location && { location: bulkEdit.location }),
          ...(bulkEdit.shipFrom && { shipFrom: bulkEdit.shipFrom }),
          ...(bulkEdit.notes && { notes: bulkEdit.notes }),
        });
      });

      toast.success("Items Updated");
      reset();
    } catch (error) {
      console.error(error);
      toast.error("Items Not Updated, please try again later");
    }
  }, [selectedItemIds, getState, mapObject, updateList, reset]);

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

  const onOpenSideBar = useCallback(
    (row: any) => {
      if (!row) return;

      selectItem(row);

      openBar(
        <>
          {row?.item?.itemName} #{row?.itemId}
          <span className="text-sm underline ml-4">Edit</span>
        </>,
        <Suspense fallback={<Spinning />}>
          <IndividualItemDetails />
        </Suspense>
      );
    },
    [openBar, selectItem]
  );

  const columns = useMemo(
    () => [
      { key: "item", header: "Item #", render: (r: any) => r?.itemId },
      { key: "spec", header: "Spec #", render: (r: any) => r?.specNo },
      {
        key: "name",
        header: "Item Name",
        render: (row: any) => (
          <button
            type="button"
            className="text-primary cursor-pointer text-left"
            onClick={() => onOpenSideBar(row)}
          >
            {row?.itemName}
          </button>
        ),
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
        render: (r: any) => <span>$ {formatPrice(r?.totalPrice / 100)}</span>,
      },
      {
        key: "shipNotes",
        header: "Ship Notes",
        render: (r: any) => (
          <div className="truncate max-w-[150px]">
            {r?.orderLogistics?.shippingNotes}
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
        onBulkEdit={() =>
          openBulkSidebar(
            "Bulk Edit",
            <Suspense fallback={<Spinning />}>
              <BulkEdit />
            </Suspense>
          )
        }
        onUpdateTracking={() =>
          openTrackingSidebar(
            "Update Tracking",
            <Suspense fallback={<Spinning />}>
              <UpdateTracking />
            </Suspense>
          )
        }
        onCreatePO={() => {}}
        onDelete={() => {}}
      />

      <DataTable
        columns={columns as any}
        data={items as any}
        selectable
        selectedElements={onSelectedElements}
      />
    </div>
  );
}

export default Bulk;

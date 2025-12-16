import BulkEdit from "@/components/bulk/BulkEdit";
import UpdateTracking from "@/components/bulk/UpdateTracking";
import { DataTable } from "@/components/common/DataTable";
import { EditTable } from "@/components/common/EditTable";
import TableSearch from "@/components/common/TableSearch";
import { useTimeline } from "@/context/TimelineContext";
import {
  patchBulkOrderLogistics,
  patchBulkOrderPlanning,
  patchBulkOrderProduction,
} from "@/services/bulk.service";
import { useRightSidebarStore } from "@/store/RightSidebarStore";
import { useOrderItemsStore } from "@/store/orderItems.store";
import { useVendorsStore } from "@/store/vendorsStore";
import { exportToCsv } from "@/utils/export-to-csv";
import { mapOrderItemsToCsv } from "@/utils/json-to-csv";
import { useEffect, useMemo, useState } from "react";
import { toast } from "sonner";

function Bulk() {
  const { openBar } = useRightSidebarStore();
  const phase = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"];
  const [orderItemIds, setOrderItemIds] = useState<number[]>([]);

  const { state, reset } = useTimeline();

  const {
    items,
    loading,
    search,
    fetchAll,
    setSelectedItemIds,
    selectedItemIds,
    mapObject,
    updateList,
  } = useOrderItemsStore();

  const { vendors, fetchVendors } = useVendorsStore();

  useEffect(() => {
    fetchAll();
    fetchVendors();
  }, [fetchAll, fetchVendors]);

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
    [openBar]
  );

  const onSelectedElements = (idx: number[]) => {
    setOrderItemIds(idx);
    setSelectedItemIds(idx);
  };

  console.log(selectedItemIds, state, mapObject);

  const onBulkEditAction = async () => {
    try {
      const itemOrderIds: number[] = [];

      selectedItemIds.forEach((i) => {
        const id = mapObject[i + 1]?.orderItemId;
        console.log(i, id, mapObject[i + 1]?.orderItemId);
        itemOrderIds.push(id);
      });

      console.log("--------", state);

      await patchBulkOrderLogistics({
        orderItemIds: itemOrderIds,
        orderedDate: state.logistics.orderedDate as any,
        shippedDate: state.logistics.shippedDate as any,
        deliveredDate: state.logistics.deliveredDate as any,
        shippingNotes: state.logistics.shippingNotes as any,
      });
      await patchBulkOrderPlanning({
        orderItemIds: itemOrderIds,
        poApprovalDate: state.planning.poApprovalDate as any,
        hotelNeedByDate: state.planning.hotelNeedByDate as any,
        expectedDelivery: state.planning.expectedDelivery as any,
      });
      await patchBulkOrderProduction({
        orderItemIds: itemOrderIds,
        cfaShopsSend: state.production.cfaShopsSend as any,
        cfaShopsApproved: state.production.cfaShopsApproved as any,
        cfaShopsDelivered: state.production.cfaShopsDelivered as any,
      });

      // itemOrderIds.forEach((id) => {
      //   updateList(id, state as any);
      // });

      toast("Items Updated");

      // reset()
    } catch (error) {
      toast("Items Not Updated, please try again later");
    }
  };

  const onBulkEdit = () => {
    openBar(
      "Bulk Edit",
      <BulkEdit />,
      `${selectedItemIds.length} items selected`,
      {
        text: "Save Changes",
        onClick: () => onBulkEditAction(),
      }
    );
  };
  const onUpdateTracking = () => {
    openBar(
      "Update Tracking",
      <UpdateTracking />,
      `${selectedItemIds.length} items selected`,
      {
        text: "Save Changes",
        onClick: () => onBulkEditAction(),
      }
    );
  };
  const onCreatePO = () => {};
  const onDelete = () => {};

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
        onBulkEdit={onBulkEdit}
        onUpdateTracking={onUpdateTracking}
        onCreatePO={onCreatePO}
        onDelete={onDelete}
      />
      <DataTable
        columns={columns}
        data={items}
        selectable={true}
        selectedElements={onSelectedElements}
      />
    </div>
  );
}

export default Bulk;

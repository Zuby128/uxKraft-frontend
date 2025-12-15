import BulkEdit from "@/components/bulk/BulkEdit";
import UpdateTracking from "@/components/bulk/UpdateTracking";
import { DataTable } from "@/components/common/DataTable";
import { EditTable } from "@/components/common/EditTable";
import TableSearch from "@/components/common/TableSearch";
import { useRightSidebarStore } from "@/store/RightSidebarStore";
import { useOrderItemStore } from "@/store/order-item.store";
import { useOrderItemsStore } from "@/store/orderItems.store";
import { useVendorsStore } from "@/store/vendorsStore";
import { exportToCsv } from "@/utils/export-to-csv";
import { mapOrderItemsToCsv } from "@/utils/json-to-csv";
import { useEffect, useMemo, useState } from "react";

function Bulk() {
  const { openBar } = useRightSidebarStore();
  const phase = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"];
  const [orderItemIds, setOrderItemIds] = useState<number[]>([]);

  const {
    items,
    loading,
    search,
    fetchAll,
    setSelectedItemIds,
    selectedItemIds,
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

  const onBulkEdit = () => {
    openBar(
      "Bulk Edit",
      <BulkEdit />,
      `${selectedItemIds.length} items selected`,
      {
        text: "Save Changes",
        onClick: () => {},
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
        onClick: () => {},
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

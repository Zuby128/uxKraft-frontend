import { DataTable } from "@/components/common/DataTable";
import TableSearch from "@/components/common/TableSearch";
import IndividualItemDetails from "@/components/individual/IndividualItemDetails";
import { useRightSidebarStore } from "@/store/RightSidebarStore";
import { useOrderItemsStore } from "@/store/orderItems.store";
import { useVendorsStore } from "@/store/vendorsStore";
import { exportToCsv } from "@/utils/export-to-csv";
import { mapOrderItemsToCsv } from "@/utils/json-to-csv";
import { useEffect, useMemo } from "react";

function Individual() {
  const { openBar } = useRightSidebarStore();
  const phase = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"];

  const items = useOrderItemsStore((s) => s.items);
  const loading = useOrderItemsStore((s) => s.loading);
  const search = useOrderItemsStore((s) => s.search);
  const fetchAll = useOrderItemsStore((s) => s.fetchAll);

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
        render: (row: any) => (
          <a
            className="text-primary cursor-pointer"
            onClick={() =>
              openBar(
                <>
                  {row?.item?.itemName} #{row?.item?.itemId}
                  <span className="text-sm underline ml-4">Edit</span>
                </>,
                <IndividualItemDetails />
              )
            }
          >
            {row?.item?.itemName}
          </a>
        ),
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

  return (
    <div className="w-full max-w-7xl">
      <TableSearch
        vendors={vendors}
        phase={phase}
        onSearch={search}
        onReset={fetchAll}
        onExport={handleExport}
      />
      <DataTable columns={columns} data={items} selectable={false} />
    </div>
  );
}

export default Individual;

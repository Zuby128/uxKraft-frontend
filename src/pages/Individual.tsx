import { useEffect, useMemo, useCallback, lazy, Suspense } from "react";
import { DataTable } from "@/components/common/DataTable";
import TableSearch from "@/components/common/TableSearch";
import { useRightSidebarStore } from "@/store/RightSidebarStore";
import { useOrderItemsStore } from "@/store/orderItems.store";
import { useVendorsStore } from "@/store/vendorsStore";
import { useOrderItemStore } from "@/store/order-item.store";
import { exportToCsv } from "@/utils/export-to-csv";
import { mapOrderItemsToCsv } from "@/utils/json-to-csv";
import Spinning from "@/components/common/Spinning";
import { useGlobalLoading } from "@/hooks/useGlobalLoading";

const PHASES = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"];

const IndividualItemDetails = lazy(
  () => import("@/components/individual/IndividualItemDetails")
);

function Individual() {
  const { openBar } = useRightSidebarStore();
  const { selectItem } = useOrderItemStore();
  const { openLoading, closeLoading } = useGlobalLoading();
  const { items, search, fetchAll } = useOrderItemsStore();
  const { vendors } = useVendorsStore();

  useEffect(() => {
    fetchIt();
  }, [fetchAll]);

  const fetchIt = () => {
    try {
      openLoading();
      fetchAll();
    } catch (error) {
    } finally {
      closeLoading();
    }
  };

  const handleExport = useCallback(() => {
    const csvData = mapOrderItemsToCsv(items);
    exportToCsv("order-items.csv", csvData);
  }, [items]);

  const onOpenSideBar = useCallback(
    (row: any) => {
      if (!row) return;

      selectItem(row);

      openBar(
        <>
          {row?.item?.itemName} #{row?.item?.itemId}
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
          <button
            type="button"
            className="text-primary cursor-pointer text-left"
            onClick={() => onOpenSideBar(row)}
          >
            {row?.item?.itemName}
          </button>
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
    [onOpenSideBar]
  );

  return (
    <div className="w-full max-w-7xl">
      <TableSearch
        vendors={vendors}
        phase={PHASES}
        onSearch={search}
        onReset={fetchAll}
        onExport={handleExport}
      />

      <DataTable columns={columns as any} data={items} selectable={false} />
    </div>
  );
}

export default Individual;

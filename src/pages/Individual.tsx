import { DataTable } from "@/components/common/DataTable";
import TableSearch from "@/components/common/TableSearch";
import IndividualItemDetails from "@/components/individual/IndividualItemDetails";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useRightSidebarStore } from "@/store/RightSidebarStore";
import { ChevronDown } from "lucide-react";

const data = [
  {
    key: "select", // checkbox için kullanılacak (genelde id veya unique key)
    item: "ITM-001",
    spec: "SPEC-101",
    name: 'Stainless Steel Pipe 4"',
    vendor: "Acme Suppliers Inc.",
    shipTo: "Warehouse A - New York",
    qty: 150,
    phase: "Phase 1",
    price: 2450.0,
    shipNotes: "Handle with care, fragile fittings included",
  },
  {
    key: "select",
    item: "ITM-002",
    spec: "SPEC-205",
    name: "Gate Valve DN100",
    vendor: "Global Valves Ltd.",
    shipTo: "Site B - Construction Zone 3",
    qty: 24,
    phase: "Phase 2",
    price: 1820.5,
    shipNotes: "Requires immediate delivery before 20 Dec",
  },
  {
    key: "select",
    item: "ITM-003",
    spec: "SPEC-308",
    name: "Electric Motor 15kW",
    vendor: "PowerTech Industries",
    shipTo: "Plant C - Main Building",
    qty: 8,
    phase: "Phase 1",
    price: 5670.0,
    shipNotes: "",
  },
  {
    key: "select",
    item: "ITM-004",
    spec: "SPEC-412",
    name: "Pressure Transmitter",
    vendor: "Sensor Solutions GmbH",
    shipTo: "Warehouse A - New York",
    qty: 45,
    phase: "Phase 3",
    price: 890.75,
    shipNotes: "Calibration certificate required",
  },
  {
    key: "select",
    item: "ITM-005",
    spec: "SPEC-119",
    name: 'PVC Conduit 2"',
    vendor: "PipeMaster Co.",
    shipTo: "Site B - Construction Zone 1",
    qty: 500,
    phase: "Phase 2",
    price: 1200.0,
    shipNotes: "Bundle in 10m lengths",
  },
];

function Individual() {
  const { openBar } = useRightSidebarStore();
  const columns: any = [
    { key: "select", header: "" }, // checkbox için boş başlık
    { key: "item", header: "Item#" },
    { key: "spec", header: "Spec #" },
    {
      key: "name",
      header: "Item Name",
      render: (row: any) => (
        <a
          className="text-primary cursor-pointer"
          onClick={() =>
            openBar(
              <>
                "Item Name #003"{" "}
                <span className="text-sm underline ml-4">Edit</span>
              </>,
              <IndividualItemDetails />
            )
          }
        >
          {row.name}
        </a>
      ),
    },
    {
      key: "vendor",
      header: "Vendor",
    },
    {
      key: "shipTo",
      header: "Ship To",
    },
    {
      key: "qty",
      header: "Qty",
    },
    {
      key: "phase",
      header: "Phase",
    },
    {
      key: "price",
      header: "Price",
    },
    {
      key: "shipNotes",
      header: "Ship Notes",
      render: (row: any) => (
        <div className="w-full max-w-[150px] truncate">{row.shipNotes}</div>
      ),
    },
    {
      key: "action",
      header: "Action",
      render: (row: any) => (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="sm" className="text-xs">
              Action <ChevronDown />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start">
            <DropdownMenuGroup>
              <DropdownMenuItem>Edit</DropdownMenuItem>
              <DropdownMenuItem>Delete</DropdownMenuItem>
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      ),
    },
  ];

  return (
    <div className="w-full max-w-7xl">
      <TableSearch />
      <DataTable columns={columns} data={data} />
    </div>
  );
}

export default Individual;

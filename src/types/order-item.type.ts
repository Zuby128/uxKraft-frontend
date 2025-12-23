export type DateSectionKey =
  | "orderPlanning"
  | "orderProduction"
  | "orderLogistics"
  | "item"
  | "vendor"
  | "customer"
  | "upload";

interface Item {
  itemId: number;
  specNo: string;
  itemName: string;
  description: string | null;
  categoryId: number;
  unitType: string;
  notes: string | null;
  location: string;
  shipFrom: string;
  unitPrice: number;
  markupPercentage: string;
  totalPrice: number;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
}

interface Vendor {
  vendorId: number;
  vendorName: string;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
}

interface Customer {
  id: number;
  name: string;
  address: string;
}

interface Upload {
  id: number;
  itemId: number;
  name: string;
  url: string;
}

interface Planning {
  planningId: number;
  itemId: number;
  poApprovalDate: string;
  hotelNeedByDate: string;
  expectedDelivery: string;
  createdAt: string;
  updatedAt: string;
}

interface Production {
  productionId: number;
  itemId: number;
  cfaShopsSend: string;
  cfaShopsApproved: string;
  cfaShopsDelivered: string | null;
  createdAt: string;
  updatedAt: string;
}

interface Logistics {
  logisticsId: number;
  itemId: number;
  orderedDate: string;
  shippedDate: string;
  deliveredDate: string;
  shippingNotes: string;
  createdAt: string;
  updatedAt: string;
}

export interface OrderItem {
  itemId: number;
  vendorId: number;
  quantity: number;
  unitPrice: number;
  markupPercentage: string;
  totalPrice: number;
  phase: number;
  upload: string | null;
  shipTo: number;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;

  item: Item;
  vendor: Vendor;
  customer: Customer;
  uploads: Upload[];
  orderPlanning: Planning;
  orderProduction: Production;
  orderLogistics: Logistics;
}

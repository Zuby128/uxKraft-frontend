import { api } from "@/lib/axiosinstance";

export const patchBulkOrderPlanning = async (body: {
  orderItemIds: number[];
  poApprovalDate?: string;
  hotelNeedByDate?: string;
  expectedDelivery?: string;
}) => {
  const apix = await api();

  return apix.patch(`/order-planning/bulk-update`, body);
};

export const patchBulkOrderLogistics = async (body: {
  orderItemIds: number[];
  orderedDate?: string;
  shippedDate?: string;
  deliveredDate?: string | null;
  shippingNotes?: string;
}) => {
  const apix = await api();
  return apix.patch(`/order-logistics/bulk-update`, body);
};

export const patchBulkOrderProduction = async (body: {
  orderItemIds: number[];
  cfaShopsSend?: string;
  cfaShopsApproved?: string;
  cfaShopsDelivered?: string | null;
}) => {
  const apix = await api();

  return apix.patch(`/order-production/bulk-update`, body);
};

export const patchBulkItems = async (body: {
  itemIds: number[];
  categoryId?: number;
  location?: string;
  shipFrom?: string;
  notes?: string;
}) => {
  const apix = await api();

  return apix.patch(`/order-production/bulk-update`, body);
};

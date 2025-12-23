import { api } from "@/lib/axiosinstance";

export const patchOrderPlanning = async (
  id: number,
  body: {
    poApprovalDate?: string;
    hotelNeedByDate?: string;
    expectedDelivery?: string;
  }
) => {
  const apix = await api();

  return apix.patch(`/order-planning/${id}`, body);
};

export const createOrderPlanning = async (body: {
  itemId: number;
  poApprovalDate?: string;
  hotelNeedByDate?: string;
  expectedDelivery?: string;
}) => {
  const apix = await api();

  return apix.post(`/order-planning`, body);
};

export const patchOrderProduction = async (
  id: number,
  body: {
    cfaShopsSend?: string;
    cfaShopsApproved?: string;
    cfaShopsDelivered?: string | null;
  }
) => {
  const apix = await api();

  return apix.patch(`/order-production/${id}`, body);
};

export const createOrderProduction = async (body: {
  itemId: number;
  cfaShopsSend?: string;
  cfaShopsApproved?: string;
  cfaShopsDelivered?: string;
}) => {
  const apix = await api();

  return apix.post(`/order-production`, body);
};

export const patchOrderLogistics = async (
  id: number,
  body: {
    orderedDate?: string;
    shippedDate?: string;
    deliveredDate?: string | null;
    shippingNotes?: string;
  }
) => {
  const apix = await api();
  return apix.patch(`/order-logistics/${id}`, body);
};

export const createOrderLogistics = async (body: {
  itemId: number;
  orderedDate?: string;
  shippedDate?: string;
  deliveredDate?: string;
  shippingNotes?: string;
}) => {
  const apix = await api();

  return apix.post(`/order-logistics`, body);
};

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

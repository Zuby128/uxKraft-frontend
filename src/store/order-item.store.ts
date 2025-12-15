import {
  patchOrderLogistics,
  patchOrderPlanning,
  patchOrderProduction,
} from "@/services/sub-orders.service";
import { create } from "zustand";

export type DateSectionKey = "planning" | "production" | "logistics";

export interface Planning {
  planningId?: number;
  poApprovalDate?: string;
  hotelNeedByDate?: string;
  expectedDelivery?: string;
}

export interface Production {
  productionId?: number;
  cfaShopsSend?: string;
  cfaShopsApproved?: string;
  cfaShopsDelivered?: string | null;
}

export interface Logistics {
  logisticsId?: number;
  orderedDate?: string;
  shippedDate?: string;
  deliveredDate?: string | null;
  shippingNotes?: string;
}

export interface OrderItem {
  orderItemId: number;
  planning?: Planning;
  production?: Production;
  logistics?: Logistics;
}

interface OrderItemState {
  item: OrderItem | null;
  loading: boolean;
  error: string | null;

  selectItem: (item: OrderItem) => void;

  updateSection: (
    section: DateSectionKey,
    partial: Record<string, any>
  ) => Promise<void>;
}

export const useOrderItemStore = create<OrderItemState>((set, get) => ({
  item: null,
  loading: false,
  error: null,

  selectItem: (item) => set({ item }),

  updateSection: async (section, partial) => {
    const { item } = get();
    if (!item) return;

    set({
      item: {
        ...item,
        [section]: {
          ...(item as any)[section],
          ...partial,
        },
      },
    });

    try {
      if (section === "planning" && item.planning?.planningId) {
        await patchOrderPlanning(item.planning.planningId, partial);
      }

      if (section === "production" && item.production?.productionId) {
        await patchOrderProduction(item.production.productionId, partial);
      }

      if (section === "logistics" && item.logistics?.logisticsId) {
        await patchOrderLogistics(item.logistics.logisticsId, partial);
      }
    } catch (error) {
      console.error("Section update failed:", error);
      set({ error: "Update failed" });
    }
  },
}));

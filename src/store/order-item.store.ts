import type { DateSectionKey, OrderItem } from "@/types/order-item.type";
import { create } from "zustand";

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
  },
}));

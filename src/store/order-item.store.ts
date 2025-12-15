import type { DateSectionKey, OrderItem } from "@/types/order-item.type";
import { create } from "zustand";
import { useOrderItemsStore } from "./orderItems.store";

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

    const updatedItem = {
      ...item,
      [section]: {
        ...(item as any)[section],
        ...partial,
      },
    };

    set({ item: updatedItem });

    useOrderItemsStore.getState().updateList(item.orderItemId, updatedItem);
  },
}));

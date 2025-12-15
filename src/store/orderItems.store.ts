import { create } from "zustand";
import {
  getOrderItems,
  getFilteredOrderItems,
} from "@/services/order-items.service";
import type { OrderItem } from "@/types/order-item.type";

interface OrderItemsState {
  items: any[];
  meta: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
  loading: boolean;
  error: string | null;

  fetchAll: () => Promise<void>;
  search: (params: {
    search?: string;
    vendorId?: string;
    phase?: string;
  }) => Promise<void>;

  updateList: (id: number, item: OrderItem) => void;
}

export const useOrderItemsStore = create<OrderItemsState>((set, get) => ({
  items: [],
  meta: {
    page: 1,
    limit: 10,
    total: 0,
    totalPages: 0,
  },
  loading: false,
  error: null,

  fetchAll: async () => {
    try {
      set({ loading: true, error: null });
      const res = await getOrderItems();
      set({
        items: res.data,
        meta: res.meta,
        loading: false,
      });
    } catch (e) {
      set({ error: "Order items alınamadı", loading: false });
    }
  },

  search: async ({ search, vendorId, phase }) => {
    try {
      set({ loading: true, error: null });

      const res = await getFilteredOrderItems({
        search,
        vendorId,
        phase,
      });

      set({
        items: res.data,
        meta: res.meta,
        loading: false,
      });
    } catch {
      set({ loading: false, error: "Search failed" });
    }
  },

  updateList: (id: number, payload: Partial<OrderItem>) => {
    set((state) => ({
      items: state.items.map((item) =>
        item.orderItemId === id ? { ...item, ...payload } : item
      ),
    }));
  },
}));

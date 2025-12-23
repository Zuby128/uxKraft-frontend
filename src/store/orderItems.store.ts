import { create } from "zustand";
import {
  getOrderItems,
  getFilteredOrderItems,
} from "@/services/order-items.service";
import type { OrderItem } from "@/types/order-item.type";

const buildMap = (items: OrderItem[]) =>
  items.reduce((acc, item) => {
    acc[item.itemId] = item;
    return acc;
  }, {} as Record<number, OrderItem>);

interface OrderItemsState {
  items: OrderItem[];
  mapObject: Record<number, OrderItem>;

  selectedItemIds: number[];
  setSelectedItemIds: (ids: number[]) => void;
  clearSelectedItemIds: () => void;

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

  updateList: (id: number, payload: Partial<OrderItem>) => void;
}

export const useOrderItemsStore = create<OrderItemsState>((set) => ({
  items: [],
  mapObject: {},

  selectedItemIds: [],

  setSelectedItemIds: (ids) => {
    set({ selectedItemIds: Array.from(new Set(ids)) });
  },

  clearSelectedItemIds: () => {
    set({ selectedItemIds: [] });
  },

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
        mapObject: buildMap(res.data),
        meta: res.meta,
        loading: false,
      });
    } catch {
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
        mapObject: buildMap(res.data),
        meta: res.meta,
        loading: false,
      });
    } catch {
      set({ loading: false, error: "Search failed" });
    }
  },

  updateList: (id, payload) => {
    set((state) => {
      const items = state.items.map((item) =>
        item.itemId === id ? { ...item, ...payload } : item
      );

      console.log("iiiiiiiiiii", payload);

      return {
        items,
        mapObject: buildMap(items),
      };
    });
  },
}));

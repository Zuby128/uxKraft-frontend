import { create } from "zustand";
import {
  getOrderItems,
  getFilteredOrderItems,
} from "@/services/order-items.service";
import type { OrderItem } from "@/types/order-item.type";

const buildMap = (items: OrderItem[]) =>
  items.reduce((acc, item) => {
    acc[item.orderItemId] = item;
    return acc;
  }, {} as Record<number, OrderItem>);

interface OrderItemsState {
  items: any[];
  mapObject: Record<number, OrderItem>;

  selectedItemIds: number[];
  setSelectedItemIds: (ids: number[]) => void;
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
  mapObject: {},
  selectedItemIds: [],
  meta: {
    page: 1,
    limit: 10,
    total: 0,
    totalPages: 0,
  },
  loading: false,
  error: null,

  setSelectedItemIds: (ids: number[]) => {
    set({ selectedItemIds: ids });
  },

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
      const updatedItems = state.items.map((item) =>
        item.orderItemId === id ? { ...item, ...payload } : item
      );

      return {
        items: updatedItems,
        mapObject: buildMap(updatedItems),
      };
    });
  },
}));

import { create } from "zustand";
import { getVendors } from "@/services/vendors.service";

interface VendorsState {
  vendors: any[];
  loading: boolean;
  error: string | null;

  fetchVendors: () => Promise<void>;
}

export const useVendorsStore = create<VendorsState>((set) => ({
  vendors: [],
  loading: false,
  error: null,

  fetchVendors: async () => {
    try {
      set({ loading: true, error: null });
      const data = await getVendors();
      set({ vendors: data, loading: false });
    } catch (e) {
      set({ error: "Vendor listesi alınamadı", loading: false });
    }
  },
}));

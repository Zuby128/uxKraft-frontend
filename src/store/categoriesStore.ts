import { getCategories } from "@/services/category.service";
import { create } from "zustand";

export interface Category {
  categoryId: number;
  name: string;
}

interface CategoriesState {
  categories: Category[];
  loading: boolean;
  error: string | null;

  fetchCategories: () => Promise<void>;
}

export const useCategoriesStore = create<CategoriesState>((set) => ({
  categories: [],
  loading: false,
  error: null,

  fetchCategories: async () => {
    try {
      set({ loading: true, error: null });

      const { data } = await getCategories();

      set({
        categories: data,
        loading: false,
      });
    } catch (e) {
      set({
        error: "Category listesi alınamadı",
        loading: false,
      });
    }
  },
}));

import { api } from "@/lib/axiosinstance";

export const getCategories = async () => {
  const apix = await api();

  return apix.get(`/categories`);
};

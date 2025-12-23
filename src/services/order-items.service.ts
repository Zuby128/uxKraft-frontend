import { api } from "@/lib/axiosinstance";

export const getOrderItems = async () => {
  try {
    const apix = await api();
    const { data } = await apix.get("/items?includeRelations=true");
    return data;
  } catch (error) {
    console.log(error);
  }
};

interface OrderItemSearchParams {
  search?: string;
  vendorId?: string;
  phase?: string;
}

export const getFilteredOrderItems = async (params: OrderItemSearchParams) => {
  try {
    const apix = await api();

    const query = new URLSearchParams();

    const safeAppend = (key: string, value?: string) => {
      if (!value) return;

      const cleaned = value.trim();

      if (cleaned === "" || cleaned === "undefined" || cleaned === "null") {
        return;
      }

      query.append(key, cleaned);
    };

    safeAppend("search", params.search);
    safeAppend("vendorId", params.vendorId);
    safeAppend("phase", params.phase);

    const queryString = query.toString();
    const url = queryString ? `/items/search?${queryString}` : `/items/search`;

    const { data } = await apix.get(url);
    return data;
  } catch (error) {
    console.error("getFilteredOrderItems error:", error);
    throw error;
  }
};

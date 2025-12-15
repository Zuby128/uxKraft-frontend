import { api } from "@/lib/axiosinstance";

export const getVendors = async () => {
  try {
    const apix = await api();
    const { data } = await apix.get("/vendors?includeAddresses=false");
    return data;
  } catch (error) {
    console.log(error);
  }
};

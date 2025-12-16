import { api } from "@/lib/axiosinstance";

export const uploadFile = async (id: string | number, formData: FormData) => {
  try {
    const apix = await api();
    const { data } = await apix.post(`order-items/${id}/upload`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return data;
  } catch (error) {
    console.log(error);
  }
};

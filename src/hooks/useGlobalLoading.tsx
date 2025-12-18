import { useLoadingStore } from "../store/LoadingStore";

export const useGlobalLoading = () => {
  const { openLoading, closeLoading } = useLoadingStore();
  return { openLoading, closeLoading };
};

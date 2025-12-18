import { useLoadingStore } from "@/store/LoadingStore";
import Spinning from "./Spinning";

function GlobalLoading() {
  const { isOpen } = useLoadingStore();

  return <>{isOpen && <Spinning />}</>;
}

export default GlobalLoading;

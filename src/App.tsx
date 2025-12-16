import { useEffect, useState } from "react";
import { Navigate, Outlet } from "react-router-dom";
import useAuthStore from "./store/AuthStore";
import { Spinner } from "./components/ui/spinner";
import DashboardLayout from "./components/layout/DashboardLayout";
import { useCategoriesStore } from "./store/categoriesStore";
import { useVendorsStore } from "./store/vendorsStore";

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const { initial, token } = useAuthStore();
  const { fetchCategories } = useCategoriesStore();
  const { fetchVendors } = useVendorsStore();

  useEffect(() => {
    fetchVendors();
    fetchCategories();
  }, []);

  useEffect(() => {
    let isMounted = true;

    const initAuth = async () => {
      try {
        await initial();
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    };

    initAuth();

    return () => {
      isMounted = false;
    };
  }, []);

  if (isLoading) {
    return (
      <div className="h-screen w-screen flex justify-center items-center">
        <Spinner />
      </div>
    );
  }

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  return (
    <DashboardLayout>
      <Outlet />
    </DashboardLayout>
  );
}

export default App;

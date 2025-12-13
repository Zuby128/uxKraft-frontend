import { useEffect, useState } from "react";
import { Navigate, Outlet } from "react-router-dom";
import useAuthStore from "./store/AuthStore";
import { Spinner } from "./components/ui/spinner";
import DashboardLayout from "./components/layout/DashboardLayout";

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const { initial, token } = useAuthStore();

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
  }, []); // initial fonksiyonunu dependency'den çıkar

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

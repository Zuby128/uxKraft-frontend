import { Suspense, useEffect, useState } from "react";
import { Navigate, Outlet } from "react-router-dom";
import useAuthStore from "./store/AuthStore";
import DashboardLayout from "./components/layout/DashboardLayout";
import Spinning from "./components/common/Spinning";

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
  }, []);

  if (isLoading) {
    return <Spinning />;
  }

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  return (
    <DashboardLayout>
      <Suspense fallback={<Spinning />}>
        <Outlet />
      </Suspense>
    </DashboardLayout>
  );
}

export default App;

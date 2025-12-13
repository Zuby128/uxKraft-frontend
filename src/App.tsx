import { useEffect, useState } from "react";
import { Outlet, useLocation, Navigate } from "react-router-dom";
import useAuthStore from "./store/AuthStore";
import Dashboard from "./pages/Dashboard";
import Individual from "./pages/Individual";
import { Spinner } from "./components/ui/spinner";
import RightSidebar from "./components/common/RightSidebar";
import { Toaster } from "sonner";

function App() {
  const [load, setLoad] = useState(false);

  const { initial, token } = useAuthStore();

  useEffect(() => {
    initial();
    const timer = setTimeout(() => {
      setLoad(true);
    }, 0);

    return () => clearTimeout(timer);
  }, []);

  const location = useLocation();
  const { pathname } = location;

  if (!load) {
    return (
      <div className="h-screen w-screen backdrop-blur-xs absolute top-0 left-0 flex justify-center items-center z-50">
        <Spinner />
      </div>
    );
  }

  return token ? (
    <Dashboard>
      {pathname === "/dashboard" ? <Individual /> : <Outlet />}
      <RightSidebar />
      <Toaster />
    </Dashboard>
  ) : (
    <Navigate to="/login" replace />
  );
}

export default App;

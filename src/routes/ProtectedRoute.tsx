import React from "react";
import { Navigate } from "react-router-dom";
import useAuthStore from "../store/AuthStore";

interface ProtectedRouteProps {
  allowedRoles: string[];
  children: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  allowedRoles,
  children,
}) => {
  const { user, token } = useAuthStore();

  // Auth check - ama bu zaten App.tsx'de yapılıyor
  if (!token || !user) {
    return <Navigate to="/login" replace />;
  }

  // Role check
  if (!allowedRoles.includes(user.role as string)) {
    // Sonsuz loop olmaması için farklı bir sayfaya yönlendir
    return (
      <div className="p-8">
        <h1 className="text-2xl font-bold text-red-600">Access Denied</h1>
        <p>You don't have permission to access this page.</p>
      </div>
    );
  }

  return <>{children}</>;
};

export default ProtectedRoute;

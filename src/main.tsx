import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import {
  Navigate,
  RouterProvider,
  createBrowserRouter,
} from "react-router-dom";
import App from "./App";
import Login from "./pages/Login";
import Individual from "./pages/Individual";
import ProtectedRoute from "./routes/ProtectedRoute";
import { UserRole } from "./types/enums.type";
import Bulk from "./pages/Bulk";
import SchemaPage from "./pages/Schema";

const router = createBrowserRouter([
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/",
    element: <App />,
    children: [
      {
        index: true,
        element: <Navigate to="/dashboard/schema" replace />,
      },
      {
        path: "dashboard/schema",
        element: (
          <ProtectedRoute allowedRoles={[UserRole.user]}>
            <SchemaPage />
          </ProtectedRoute>
        ),
      },
      {
        path: "dashboard/individual",
        element: (
          <ProtectedRoute allowedRoles={[UserRole.user]}>
            <Individual />
          </ProtectedRoute>
        ),
      },
      {
        path: "dashboard/bulk",
        element: (
          <ProtectedRoute allowedRoles={[UserRole.user]}>
            <Bulk />
          </ProtectedRoute>
        ),
      },
      // Fallback for /dashboard
      {
        path: "dashboard",
        element: <Navigate to="/dashboard/schema" replace />,
      },
    ],
  },
  {
    path: "*",
    element: <Navigate to="/dashboard/individual" replace />,
  },
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);

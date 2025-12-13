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
        element: <Navigate to="/dashboard/individual" replace />,
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
        element: <Navigate to="/dashboard/individual" replace />,
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

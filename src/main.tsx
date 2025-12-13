import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import {
  Navigate,
  RouterProvider,
  createBrowserRouter,
} from "react-router-dom";
import Login from "./pages/Login.tsx";
import ProtectedRoute from "./routes/ProtectedRoute.tsx";
import { UserRole } from "./types/enums.type.ts";
import Individual from "./pages/Individual.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Navigate to="/dashboard" replace />,
  },
  {
    path: "dashboard",
    element: <App />,
    children: [
      {
        path: "home",
        element: (
          <ProtectedRoute allowedRoles={[UserRole.user]}>
            <Individual />
          </ProtectedRoute>
        ),
      },
    ],
  },
  { path: "/login", element: <Login /> },
  { path: "*", element: <Navigate to="/dashboard" replace /> },
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);

// src/routes/ProtectedRoute.tsx
import type { ReactElement } from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }: { children: ReactElement }) => {
  const token = useSelector((state: any) => state.auth?.token);

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default ProtectedRoute;

import { Navigate } from "react-router-dom";
import type { ReactNode } from "react";

export default function ProtectedAdmin({
  children,
}: {
  children: ReactNode;
}) {
  const role = localStorage.getItem("role");
  const token = localStorage.getItem("token");

  if (!token || role !== "admin") {
    return <Navigate to="/sweets" replace />;
  }

  return <>{children}</>;
}

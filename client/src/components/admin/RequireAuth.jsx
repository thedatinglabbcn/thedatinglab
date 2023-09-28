import React from "react";
import { useLocation, Navigate, Outlet } from "react-router-dom";
import useAuth from "../../hooks/useAuth";

const RequireAuth = ({ allowedRoles }) => {
  const { auth } = useAuth();
  const location = useLocation();

 
  const isAdmin = auth?.roles?.includes("admin");

  console.log("auth:", auth);
  console.log("isAdmin:", isAdmin);

  if (isAdmin) {
    console.log("Redirecting to /dashboard");
    return <Navigate to="/dashboard" state={{ from: location }} replace />;
  }

  return auth?.roles?.find((role) => allowedRoles?.includes(role)) ? (
    <Outlet />
  ) : auth?.user ? (
    <Navigate to="/admin-login" state={{ from: location }} replace />
  ) : null; 
};

export default RequireAuth;


import React from "react";
import { useLocation, Navigate, Outlet } from "react-router-dom";
import useAuth from "../../hooks/useAuth";

const RequireAuth = ({ allowedRoles }) => {
  const { auth } = useAuth();

  const isAdmin = auth?.roles?.includes("admin");

  if (isAdmin || (allowedRoles && auth?.roles?.some((role) => allowedRoles.includes(role)))) {
    return <Outlet />;
  }

  if (!auth?.user) {
    return <Navigate to="/admin-login" />;
  }

  return <Navigate to="/" />;
};

export default RequireAuth;
// RutaPrivadaAdmin.jsx (ubicado en utils)
import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const PrivateAdminRoutes = ({ children }) => {
  const { auth } = useAuth();
  const isAdmin = auth?.role === 'admin';

  return isAdmin ? <Outlet /> : <Navigate to="/admin-login" />;
};

export default PrivateAdminRoutes;

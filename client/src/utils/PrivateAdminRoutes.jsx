// RutaPrivadaAdmin.jsx (ubicado en utils)
import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const PrivateAdminRoutes = ({ children }) => {
  const { auth } = useAuth();
  const isAdmin = auth?.role === 'admin';

  return(<div> {isAdmin ? children : <Navigate to={"/admin-login"} />}</div>)
};

export default PrivateAdminRoutes;

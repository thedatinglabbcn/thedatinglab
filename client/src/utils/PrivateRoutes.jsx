import React from 'react';
import { Navigate } from 'react-router-dom';
const PrivateRoutes = ({children}) => {
  const auth = localStorage.getItem('auth_token');

    return (
    auth ? children : <Navigate to={'/login'} />
  );
}

export default PrivateRoutes;

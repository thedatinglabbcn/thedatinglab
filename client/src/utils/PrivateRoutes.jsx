import React from 'react'
import { Navigate } from 'react-router-dom';

export const PrivateRoutes = ({children}) => {
  const auth = localStorage.getItem('auth_token');
//   const isAdmin = auth && auth.includes('admin');


    return (
    <div>
        {auth ? children : <Navigate to={'/login'} />}
        {/* { isAdmin ? children : <Navigate to={'/admin-login'} />} */}

      {/* auth ? children : <Navigate to={'/register'} /> */}

    </div>
  )
}


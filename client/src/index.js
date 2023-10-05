import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import 'bootstrap/dist/css/bootstrap.min.css'; 
import 'bootstrap/dist/js/bootstrap.bundle.js';
import { RouterProvider } from 'react-router-dom';
import router from './application/Router';
import { AuthProvider } from './contexts/AuthContext';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  
  <React.StrictMode>
    <AuthProvider>
      <RouterProvider router={router}/>
      </AuthProvider>
  </React.StrictMode>
);


reportWebVitals();

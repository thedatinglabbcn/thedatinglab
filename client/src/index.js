import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import 'bootstrap/dist/css/bootstrap.min.css'; 
import 'bootstrap/dist/js/bootstrap.bundle.js';
import { RouterProvider } from 'react-router-dom';
import router from './application/Router';
// import '@fortawesome/fontawesome-free/css/all.min.css';
import { MatchingUsersProvider } from './contexts/MatchingUsersContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  
  <React.StrictMode>
    <MatchingUsersProvider>
      <RouterProvider router={router}/>
    </MatchingUsersProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

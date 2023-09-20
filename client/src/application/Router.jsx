import { createBrowserRouter } from 'react-router-dom';
import HomePage from '../pages/home/HomePage';
import RegisterPage from '../pages/register/RegisterPage';
import LoginPage from '../pages/login/LoginPage';
import ProfilePage from '../pages/profile/ProfilePage';

const router = createBrowserRouter([
  { 
    path: '/', 
    element: <HomePage />
   },
  {
    path: '/register',
    element: <RegisterPage />
  },
  {
    path: '/login',
    element: <LoginPage />
  },
  {
    path: '/profile',
    element: <ProfilePage />
  }
])

export default router;

import { createBrowserRouter } from 'react-router-dom';
import HomePage from '../pages/home/HomePage';
import RegisterPage from '../pages/register/RegisterPage';
import LoginPage from '../pages/login/LoginPage'
import ProfileFormPage from '../pages/register/ProfileFormPage';
import PreferencesPage from '../pages/register/PreferencesPage';
import Dashboard from '../pages/admin/Dashboard';
import DashboardEvents from '../pages/admin/DashboardEvents';
import MatchCard from '../components/matchCard/MatchCard';


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
    path: '/preferences',
    element: <PreferencesPage />
  },
  {
    path: '/profile-form',
    element: <ProfileFormPage />
  },
  {
    path: '/matches',
    element: <MatchCard />
  },
  {
    path: '/login',
    element: <LoginPage />
  },

  {
    path: '/dashboard',
    element: <Dashboard />
  },

  {
    path: '/dashboard/events',
    element: <DashboardEvents />
  },

 
])

export default router;

import { createBrowserRouter } from 'react-router-dom';
import HomePage from '../pages/home/HomePage';
import RegisterPage from '../pages/register/RegisterPage';
import LoginPage from '../pages/login/LoginPage'
import Dashboard from '../pages/admin/Dashboard';
import DashboardEvents from '../pages/admin/DashboardEvents';
import MatchCard from '../components/matchCard/MatchCard';
import PreferencesForm from '../components/forms/PreferencesForm';
import ProfileForm from '../components/forms/ProfileForm';

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
    element: <PreferencesForm />
  },
  {
    path: '/profile-form',
    element: <ProfileForm />
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

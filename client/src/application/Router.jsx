import { createBrowserRouter } from 'react-router-dom';
import HomePage from '../pages/home/HomePage';
import RegisterPage from '../pages/register/RegisterPage';
import CreateForm from '../components/admin/CreateForm';
import EditForm from '../components/admin/EditForm';
import LoginPage from '../pages/login/LoginPage'
import ProfileFormPage from '../pages/register/ProfileFormPage';
import PreferencesPage from '../pages/register/PreferencesPage';
import ProfileEditForm from '../components/forms/ProfileEditForm';
import ProfilePage from '../pages/profile/ProfilePage'
import Dashboard from '../pages/admin/Dashboard';
import DashboardEvents from '../pages/admin/DashboardEvents';
import MatchCard from '../components/matchCard/MatchCard';
import AdminLoginPage from '../pages/admin/AdminLoginPage';
import EventsPage from '../pages/events/EventsPage';
import EventDetail from '../pages/events/EventDetail';
import PaymentPage from '../pages/payment/PaymentPage';
import { PrivateRoutes } from '../utils/PrivateRoutes';


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
    path: '/profile/:id',
    element: <PrivateRoutes><ProfilePage /></PrivateRoutes>
  },
  {
    path: '/matches',
    element: <PrivateRoutes><MatchCard /></PrivateRoutes>
  },
  {
    path: '/login',
    element: <LoginPage />
  },
  {
    path: '/dashboard/create',
    element: <CreateForm />
  },
  {
    path: '/dashboard/edit/:eventId',
    element: <EditForm />
  },
  {
    path: '/dashboard',
    element: <Dashboard />
  },

  {
    path: '/dashboard/events',
    element: <DashboardEvents />
  },
  {
    path: '/admin-login',
    element: <AdminLoginPage />
  },
  {
    path: '/event',
    element: <EventsPage />
  },
  {
    path: '/event/:eventId',
    element: <EventDetail />
  },
  {
    path: '/payment/:eventId',
    element: <PrivateRoutes><PaymentPage /></PrivateRoutes>
  }
 
])

export default router;

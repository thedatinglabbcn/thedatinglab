import { createBrowserRouter } from 'react-router-dom';
import HomePage from '../pages/home/HomePage';
import RegisterPage from '../pages/register/RegisterPage';
import CreateForm from '../components/admin/CreateForm';
import EditForm from '../components/admin/EditForm';
import LoginPage from '../pages/login/LoginPage'
import ProfileFormPage from '../pages/register/ProfileFormPage';
import PreferencesPage from '../pages/register/PreferencesPage';
import ProfilePage from '../pages/profile/ProfilePage'
import Dashboard from '../pages/admin/Dashboard';
import DashboardEvents from '../pages/admin/DashboardEvents';
import DashboardUsers from '../pages/admin/DashboardUsers';
import MatchCard from '../components/matchCard/MatchCard';
import AdminLoginPage from '../pages/admin/AdminLoginPage';
import EventsPage from '../pages/events/EventsPage';
import EventDetail from '../pages/events/EventDetail';
import PaymentPage from '../pages/payment/PaymentPage';
import { PrivateRoutes } from '../utils/PrivateRoutes';
import PrivateAdminRoutes from '../utils/PrivateAdminRoutes';
import Faqs from '../pages/faqs/Faqs';


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
    element: <PrivateAdminRoutes><CreateForm /></PrivateAdminRoutes>
  },
  {
    path: '/dashboard/edit/:eventId',
    element: <PrivateAdminRoutes><EditForm /></PrivateAdminRoutes>
  },
  {
    path: '/dashboard',
    element: <PrivateAdminRoutes><Dashboard /></PrivateAdminRoutes>
  },
  {
    path: '/dashboard/events',
    element: <PrivateAdminRoutes><DashboardEvents /></PrivateAdminRoutes>
  },
  {
    path: '/dashboard/users',
    element: <PrivateAdminRoutes><DashboardUsers /></PrivateAdminRoutes>
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
    path: '/faqs',
    element: <Faqs />
  },
  {
    path: '/payment/:eventId',
    element: <PrivateRoutes><PaymentPage /></PrivateRoutes>
  }
])

export default router;

import { createBrowserRouter } from 'react-router-dom';
import HomePage from '../pages/home/HomePage';
import RegisterPage from '../pages/register/RegisterPage';
import LoginPage from '../pages/login/LoginPage';
import CreateForm from '../components/forms/CreateForm';
import EditForm from '../components/forms/EditForm';
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
    path: '/matches',
    element: <MatchCard />
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
    path: '/dashboard/edit',
    element: <EditForm />
  }

])

export default router;

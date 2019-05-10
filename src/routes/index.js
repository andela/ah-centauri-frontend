import HomePage from '../views/HomePage/Homepage';
import Login from '../views/Login/Login';
import RegisterPage from '../views/RegisterPage/RegisterPage';
import ProfilePage from '../views/ProfilePage/ProfilePage';
import ResetPassword from '../views/ResetPassword/ResetPassword';
import ResetPasswordLink from '../views/ResetPassword/ResetPasswordLink';
import VerifyEmail from '../components/VerifyEmail/VerifyEmail';

const routes = [
  {
    id: 1,
    path: '/',
    component: HomePage,
  },
  {
    id: 2,
    path: '/login',
    component: Login,
  },
  {
    id: 3,
    path: '/register',
    component: RegisterPage,
  },
  {
    id: 4,
    path: '/reset',
    name: 'ResetPasswordLink',
    component: ResetPasswordLink,
  },
  {
    id: 5,
    path: '/reset/:token',
    name: 'ResetPassword',
    component: ResetPassword,
  },
  {
    id: 6,
    path: '/profile',
    component: ProfilePage,
  },
  {
    id: 6,
    path: '/verify/:token/:uid',
    component: VerifyEmail,
  },
];

export default routes;

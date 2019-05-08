import HomePage from '../views/HomePage/Homepage';
import Login from '../views/Login/Login';
import RegisterPage from '../views/RegisterPage/RegisterPage';
import ResetPassword from '../views/ResetPassword/ResetPassword';
import ResetPasswordLink from '../views/ResetPassword/ResetPasswordLink';

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
    id:4,
    path: '/reset',
    name: 'ResetPasswordLink',
    component: ResetPasswordLink,
  },
  {
    id:5,
    path: '/reset/:token',
    name: 'ResetPassword',
    component: ResetPassword,
  }
];

export default routes;

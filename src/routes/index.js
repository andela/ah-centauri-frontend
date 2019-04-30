import HomePage from '../views/HomePage/Homepage';
import Login from '../views/Login/Login';
import RegisterPage from '../views/RegisterPage/RegisterPage';

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
];

export default routes;

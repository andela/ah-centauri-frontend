import HomePage from '../views/HomePage/Homepage';
import Login from '../views/Login/Login';

const routes = [
    {
        path: '/',
        name: 'HomePage',
        component: HomePage
    },
    {
        path: '/login',
        name: 'Login',
        component: Login,
    }
];

export default routes;
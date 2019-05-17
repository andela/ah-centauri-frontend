import HomePage from '../views/HomePage/Homepage';
import Login from '../views/Login/Login';
import RegisterPage from '../views/RegisterPage/RegisterPage';
import ProfilePage from '../views/ProfilePage/ProfilePage';
import ResetPassword from '../views/ResetPassword/ResetPassword';
import ResetPasswordLink from '../views/ResetPassword/ResetPasswordLink';
import VerifyEmail from '../components/VerifyEmail/VerifyEmail';
import ArticlesPage from '../views/ArticlesPage/ArticlesDescription';
import CreateArticlesPage from '../views/ArticlesPage/CreateArticlesPage';
import MyArticlesDraftPage from '../views/ArticlesPage/MyArticlesDraftPage';
import UpdateArticlesPage from '../views/ArticlesPage/UpdateArticlesPage';
import NotFoundPage from '../views/NotFoundPage/NotFoundPage';

const routes = [
  {
    id: 1,
    path: '/',
    component: HomePage,
  },
  {
    id: 2,
    path: '/article/:slug',
    component: ArticlesPage,
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
  {
    id: 7,
    path: '/create-article',
    component: CreateArticlesPage,
  },
  {
    id: 8,
    path: '/me/stories/drafts/:username',
    component: MyArticlesDraftPage,
  },
  {
    id: 9,
    path: '/article/:slug/edit',
    component: UpdateArticlesPage,
  },
  {
    id: 10,
    path: '/not-found',
    component: NotFoundPage,
  },
];

export default routes;

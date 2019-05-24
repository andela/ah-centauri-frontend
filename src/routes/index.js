import HomePage from '../views/HomePage/Homepage';
import ProfilePage from '../views/ProfilePage/ProfilePage';
import ResetPassword from '../views/ResetPassword/ResetPassword';
import ResetPasswordLink from '../views/ResetPassword/ResetPasswordLink';
import VerifyEmail from '../components/VerifyEmail/VerifyEmail';
import ArticlesPage from '../views/ArticlesPage/ArticlesDescription';
import CreateArticlesPage from '../views/ArticlesPage/CreateArticlesPage';
import MyArticlesDraftPage from '../views/ArticlesPage/MyArticlesDraftPage';
import UpdateArticlesPage from '../views/ArticlesPage/UpdateArticlesPage';
import NotFoundPage from '../views/NotFoundPage/NotFoundPage';
import SettingsPage from '../views/SettingsPage/SettingsPage';
import SingleProfile from '../views/ProfilePage/SingleProfile';
import StatsPage from '../views/StatsPage/StatsPage';

const routes = [
  {
    path: '/',
    component: HomePage,
  },
  {
    path: '/article/:slug',
    component: ArticlesPage,
  },
  {
    path: '/reset',
    name: 'ResetPasswordLink',
    component: ResetPasswordLink,
  },
  {
    path: '/reset/:token',
    name: 'ResetPassword',
    component: ResetPassword,
  },
  {
    path: '/profile',
    component: ProfilePage,
  },
  {
    path: '/verify/:token/:uid',
    component: VerifyEmail,
  },
  {
    path: '/create-article',
    component: CreateArticlesPage,
  },
  {
    path: '/me/stories/drafts/:username',
    component: MyArticlesDraftPage,
  },
  {
    path: '/article/:slug/edit',
    component: UpdateArticlesPage,
  },
  {
    path: '/me/settings',
    component: SettingsPage,
  },
  {
    path: '/profile/:username',
    component: SingleProfile,
  },
  {
    path: '/me/stats',
    component: StatsPage,
  },
  {
    path: '/not-found',
    component: NotFoundPage,
  },
  {
    component: NotFoundPage,
  },
];

export default routes;

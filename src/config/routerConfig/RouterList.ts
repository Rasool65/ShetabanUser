import IRoute from './IRoute';
import RouteType from './RouteType';
import Contact from '../../pages/contact/Contact';
import Home from '../../pages/home/Home';
import { URL_CONTACT_US, URL_MAIN, URL_LOGIN } from '../urls';
import Login from '../../pages/authentication/Login';

const routes: IRoute[] = [
  {
    path: URL_MAIN,
    component: Home,
    type: RouteType.private,
    props: {
      title: 'صفحه اصلی',
    },
  },
  {
    path: URL_LOGIN,
    component: Login,
    type: RouteType.public,
    props: {
      title: 'ورود به سیستم',
    },
  },
  {
    path: URL_CONTACT_US,
    component: Contact,
    type: RouteType.private,
    props: {
      title: 'تماس با ما',
    },
  },
];

export default routes;

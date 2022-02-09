import { URL_DASHBOARD, URL_HISTORY } from './../urls';
import IRoute from './IRoute';
import RouteType from './RouteType';
import { URL_CONTACT_US, URL_MAIN, URL_LOGIN } from '../urls';
import Login from '../../pages/authentication/Login';

import Contact from '../../views/contact/Contact';
import Home from '@src/pages/home/Home';
import Dashboard from '@src/pages/dashboard/Dashboard';
import History from '@src/pages/aboutUs/History';

const routes: IRoute[] = [
  {
    path: URL_MAIN,
    component: Home,
    type: RouteType.public,
    props: {
      title: 'شرکت شتابان شمال',
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
  {
    path: URL_DASHBOARD,
    component: Dashboard,
    type: RouteType.private,
    props: {
      title: 'داشبورد',
    },
  },
  {
    path: URL_HISTORY,
    component: History,
    type: RouteType.public,
    props: {
      title: 'تاریخچه شرکت',
    },
  },
];

export default routes;

import { URL_DASHBOARD, URL_HISTORY } from './../urls';
import IRoute from './IRoute';
import RouteType from './RouteType';
import { URL_CONTACT_US, URL_MAIN, URL_LOGIN, URL_TICKET } from '../urls';

import Contact from '../../views/contact/Contact';
import Home from '@src/pages/home/Home';
import Dashboard from '@src/pages/dashboard/Dashboard';
import LoginLayout from '@src/pages/authentication/LoginLayout';
import History from '@src/pages/aboutUs/History';
import path from 'path/posix';
import AppChat from '@src/pages/chat';

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
    component: LoginLayout,
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
      title: 'پنل کاربری',
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
  {
    path: URL_TICKET,
    component: AppChat,
    type: RouteType.private,
    props: {
      title: 'تیکت',
    },
  },
];

export default routes;

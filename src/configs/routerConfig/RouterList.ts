import { ProfileEdit } from './../../pages/profile/ProfileEdit';
import { URL_DASHBOARD, URL_HISTORY, URL_PROFILE, URL_PROFILE_EDIT,URL_CONTACT_US, URL_MAIN, URL_LOGIN, URL_TICKET} from './../urls';
import IRoute from './IRoute';
import RouteType from './RouteType';


import Contact from '../../views/contact/Contact';
import Home from '@src/pages/home/Home';
import Dashboard from '@src/pages/dashboard/Dashboard';
import LoginLayout from '@src/pages/authentication/LoginLayout';
import History from '@src/pages/aboutUs/History';
import Profile from '@src/pages/profile/Profile';

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
    path: URL_PROFILE,
    component: Profile,
    type: RouteType.private,
    props: {
      title: 'پروفایل',
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
  {
    path: URL_PROFILE_EDIT,
    component: ProfileEdit,
    type: RouteType.private,
    props: {
      title: 'ویرایش پروفایل',
    },
  }
];

export default routes;

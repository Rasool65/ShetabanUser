import IRoute from './IRoute';
import RouteType from './RouteType';
// import Contact from '../../pages/contact/Contact';
// import Home from '../../pages/home/Home';
import { URL_CONTACT_US, URL_MAIN, URL_AUTH, PERSIAN_CALENDAR1, PERSIAN_CALENDAR_MODERN } from '../urls';

import Contact from '../../views/contact/Contact';
import Home from '@src/pages/home/Home';
import Calendar1 from './../../pages/persian-calendar/calndar1/index';
import CalendarModern from './../../pages/persian-calendar/calendar-modern';
import Auth from '@src/pages/authentication/Authentication';

const routes: IRoute[] = [
  {
    path: URL_MAIN,
    component: Home,
    type: RouteType.public,
    props: {
      title: 'صفحه اصلی',
    },
  },
  {
    path: URL_AUTH,
    component: Auth,
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
    path: PERSIAN_CALENDAR1,
    component: Calendar1,
    type: RouteType.private,
    props: {
      title: 'تقویم ۱',
    },
  },
  {
    path: PERSIAN_CALENDAR_MODERN,
    component: CalendarModern,
    type: RouteType.private,
    props: {
      title: 'تقویم ۲',
    },
  },
];

export default routes;

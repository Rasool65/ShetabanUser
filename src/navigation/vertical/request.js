// ** Icons Import
import { Home, Circle, Truck, Edit } from 'react-feather';

export default [
  {
    id: 'requests',
    title: 'درخواست سفارش',
    icon: <Truck size={20} />,
    badge: 'light-warning',
    badgeText: '1',
    children: [
      {
        id: 'requestDash',
        title: 'ثبت درخواست',
        icon: <Circle size={12} />,
        navLink: '/request',
      },
    ],
  },
];

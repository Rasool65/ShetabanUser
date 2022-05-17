// ** Icons Import
import { Home, Truck } from 'react-feather';

export default [
  {
    id: 'dashboards',
    title: 'Dashboards',
    icon: <Home size={20} />,
    navLink: '/dashboard',
  },
  {
    id: 'requestDash',
    title: 'requestShipment',
    icon: <Truck size={12} />,
    navLink: '/request',
  },
];

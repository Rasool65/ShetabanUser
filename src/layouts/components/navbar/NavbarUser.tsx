import IntlDropdown from './IntlDropdown';
import UserDropdown from './UserDropdown';
import NavbarSearch from './NavbarSearch';
import NotificationDropdown from './NotificationDropdown';
import { Sun, Moon, MessageSquare } from 'react-feather';
import { NavItem, NavLink } from 'reactstrap';
import { Link } from 'react-router-dom';
import { URL_TICKET } from '@src/configs/urls';
const NavbarUser = (props: any) => {
  const { skin, setSkin } = props;

  // ** Function to toggle Theme (Light/Dark)
  const ThemeToggler = () => {
    if (skin === 'dark') {
      return <Sun className="ficon" onClick={() => setSkin('light')} />;
    } else {
      return <Moon className="ficon" onClick={() => setSkin('dark')} />;
    }
  };

  return (
    <ul className="nav navbar-nav align-items-center ms-auto">
      {/* <IntlDropdown /> */}

      <NavItem className="d-none d-lg-block">
        <NavLink className="nav-link-style">
          <ThemeToggler />
        </NavLink>
      </NavItem>
      <NavItem className="d-none d-lg-block">
        <Link to={URL_TICKET}>
          <NavLink className="nav-link-style">
            <MessageSquare />
          </NavLink>
        </Link>
      </NavItem>
      <NavbarSearch />
      {/* <NotificationDropdown /> */}
      <UserDropdown />
    </ul>
  );
};
export default NavbarUser;

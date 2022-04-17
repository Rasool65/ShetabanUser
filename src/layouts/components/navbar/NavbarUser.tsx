import IntlDropdown from './IntlDropdown';
import UserDropdown from './UserDropdown';
import NavbarSearch from './NavbarSearch';
import NotificationDropdown from './NotificationDropdown';
import { Sun, Moon, MessageSquare } from 'react-feather';
import { NavItem, NavLink, Badge } from 'reactstrap';
import { Link } from 'react-router-dom';
import { URL_TICKET } from '@src/configs/urls';
import { useSelector, useDispatch } from 'react-redux';
import { RootStateType } from '@src/redux/Store';
import useHttpRequest from '@src/hooks/useHttpRequest';
import { IConversationModel } from '@src/models/output/ticket/IConversationModel';
import { IOutputResult } from '@src/models/output/IOutputResult';
import { APIURL_NEW_MESSAGE_COUNT } from '@src/configs/apiConfig/apiUrls';
import { handleNewMessageCount } from '@src/redux/reducers/ticketReducer';
import { useEffect } from 'react';

const NavbarUser = (props: any) => {
  const { skin, setSkin } = props;
  const dispatch = useDispatch();

  // ** Function to toggle Theme (Light/Dark)
  const ThemeToggler = () => {
    if (skin === 'dark') {
      return <Sun className="ficon" onClick={() => setSkin('light')} />;
    } else {
      return <Moon className="ficon" onClick={() => setSkin('dark')} />;
    }
  };
  const userId = useSelector((state: RootStateType) => state.authentication?.userData?.userRole);
  const messageCount = useSelector((state: RootStateType) => state.ticket.newMessageCount);
  let { getRequest } = useHttpRequest();

  useEffect(() => {
    if (userId !== undefined) {
      getMessageCount();
      const fetcher = setInterval(() => {
        getMessageCount();
      }, 10000);

      return () => clearInterval(fetcher);
    }
  }, [messageCount]);

  const getMessageCount = () =>
    getRequest<IOutputResult<IConversationModel>>(APIURL_NEW_MESSAGE_COUNT).then((resp) => {
      dispatch(handleNewMessageCount(resp.data.data));
    });

  return (
    <ul className="nav navbar-nav align-items-center ms-auto">
      {/* <IntlDropdown /> */}

      <NavItem className="d-none d-lg-block">
        <NavLink className="nav-link-style">
          <ThemeToggler />
        </NavLink>
      </NavItem>
      <NavbarSearch />
      <NavItem className="d-none d-lg-block">
        <Link to={URL_TICKET}>
          <NavLink className="nav-link-style position-relative">
            <MessageSquare />
            {messageCount > 0 && (
              <Badge color="danger" className="badge-up" style={{ top: '-2px', left: '-1px' }} pill>
                {messageCount}
              </Badge>
            )}
          </NavLink>
        </Link>
      </NavItem>
      {/* <NotificationDropdown /> */}
      <UserDropdown />
    </ul>
  );
};
export default NavbarUser;

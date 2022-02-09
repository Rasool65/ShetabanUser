import { URL_DASHBOARD, URL_LOGIN } from '@src/configs/urls';
import { RootStateType } from '@src/redux/Store';
import { FunctionComponent, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { Dropdown, DropdownItem, DropdownMenu, DropdownToggle, Nav, NavItem } from 'reactstrap';

import userAvatar from '@src/assets/images/avatars/avatar-blank.png';
import { handleLogout } from '@src/redux/reducers/authenticationReducer';

export const PrivateMenu: FunctionComponent = (props: any) => {
  const authenticationStore = useSelector((state: RootStateType) => state.authentication);
  const [userDropdownOpen, setuserDropdownOpen] = useState<boolean>(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleUserDropdownToggle = () => {
    setuserDropdownOpen(!userDropdownOpen);
  };

  const logout = () => {
    dispatch(handleLogout());
    navigate(URL_LOGIN);
  };

  return (
    <>
      <Nav pills className="navbar-nav ml-auto menu">
        <NavItem>
          <Link to={URL_DASHBOARD}>داشبورد </Link>
        </NavItem>
        <NavItem>
          <a href="#">تنظیمات</a>
        </NavItem>
        <Dropdown nav isOpen={userDropdownOpen} toggle={() => handleUserDropdownToggle()}>
          <DropdownToggle caret nav>
            {authenticationStore.userData?.mobile}
          </DropdownToggle>
          <DropdownMenu>
            <DropdownItem header className="text-center">
              <img src={userAvatar} className="user-avatar" alt="user image" />
            </DropdownItem>
            <DropdownItem>پروفایل کاربری</DropdownItem>
            <DropdownItem divider />
            <DropdownItem onClick={() => logout()}>خروج</DropdownItem>
          </DropdownMenu>
        </Dropdown>
      </Nav>
    </>
  );
};

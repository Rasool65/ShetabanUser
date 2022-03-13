import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Avatar from '@components/avatar';
import { useDispatch, useSelector } from 'react-redux';
import { User, Mail, CheckSquare, MessageSquare, Settings, CreditCard, HelpCircle, Power } from 'react-feather';

import { UncontrolledDropdown, DropdownMenu, DropdownToggle, DropdownItem, Button } from 'reactstrap';

import defaultAvatar from '../../../assets/images/avatars/avatar-blank.png';
import { handleLogout } from '@src/redux/reducers/authenticationReducer';
import { RootStateType } from '@src/redux/Store';
import { URL_LOGIN, URL_PROFILE } from '@src/configs/urls';
import { BASE_URL } from '@src/configs/apiConfig/apiBaseUrl';

const UserDropdown = () => {
  const dispatch = useDispatch();

  const authenticationStore = useSelector((state: RootStateType) => state.authentication);
  const userAvatar =
    authenticationStore.userData?.profile?.avatar == null
      ? defaultAvatar
      : BASE_URL + authenticationStore.userData.profile?.avatar;

  const userFullName = authenticationStore.userData?.profile?.firstName + ' ' + authenticationStore.userData?.profile?.lastName;

  return (
    <UncontrolledDropdown tag="li" className="dropdown-user nav-item">
      <DropdownToggle href="/" tag="a" className="nav-link dropdown-user-link" onClick={(e) => e.preventDefault()}>
        <div className="user-nav d-sm-flex d-none">
          <span className="user-name fw-bold">{userFullName}</span>
          <span className="user-status">{authenticationStore.userData?.mobile}</span>
        </div>
        <Avatar imgClassName="" className="" img={userAvatar} imgHeight="40" imgWidth="40" status="online" />
      </DropdownToggle>
      <DropdownMenu end>
        <DropdownItem tag={Link} to={URL_PROFILE}>
          <User size={14} className="me-75" />
          <span className="align-middle">پروفایل</span>
        </DropdownItem>
        <DropdownItem
          href="#"
          onClick={() => {
            dispatch(handleLogout());
            window.location.href = URL_LOGIN;
          }}
        >
          <Power size={14} className="me-75" />
          <span className="align-middle">خروج</span>
        </DropdownItem>
      </DropdownMenu>
    </UncontrolledDropdown>
  );
};

export default UserDropdown;

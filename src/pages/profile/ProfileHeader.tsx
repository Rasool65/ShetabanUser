import { useState } from 'react';
import { AlignJustify, Rss, Info, Image, Users, Edit, Lock } from 'react-feather';
import { Card, CardImg, Collapse, Navbar, Nav, NavItem, NavLink, Button } from 'reactstrap';

import defaultAvatar from '@src/assets/images/avatars/avatar-blank.png';
import userCover from '@src/assets/images/shetaban/user_cover.jpg';
import { IProfileProp } from './IProfileProp';

const ProfileHeader = (props: IProfileProp) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);

  const userAvatar = (props.data && props.data?.profile && props.data?.profile?.avatar) || defaultAvatar;

  return (
    <Card className="profile-header mb-2">
      <CardImg src={userCover} alt="User Profile Cover" top />
      {/* <div className="position-relative">
        <div className="profile-img-container d-flex align-items-center">
          <div className="profile-img">
            <img className="rounded img-fluid" src={userAvatar} alt="user avatar" />
          </div>
          <div className="profile-title ms-3">
            <h2>{props.data?.profile?.firstName + ' ' + props.data?.profile?.lastName}</h2>
            <p>{props.data?.mobile}</p>
          </div>
        </div>
      </div> */}
      <div className="profile-header-nav">
        <Navbar container={false} className="justify-content-end justify-content-md-between w-100" expand="md" light>
          <Button color="" className="btn-icon navbar-toggler" onClick={toggle}>
            <AlignJustify size={21} />
          </Button>
          <Collapse isOpen={isOpen} navbar>
            {/* profile-tabs */}
            <div className="d-flex justify-content-between flex-wrap mt-1 mt-md-0">
              <Nav className="mb-0" pills>
                <NavItem>
                  <NavLink
                    className="fw-bold"
                    active={props.pageIndex == 0}
                    onClick={() => {
                      props.changePage(0);
                    }}
                  >
                    <span className="d-none d-md-block">پروفایل</span>
                    <Info className="d-block d-md-none" size={14} />
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink
                    className="fw-bold"
                    active={props.pageIndex == 1}
                    onClick={() => {
                      props.changePage(1);
                    }}
                  >
                    <span className="d-none d-md-block">تغییر کلمه عبور</span>
                    <Lock className="d-block d-md-none" size={14} />
                  </NavLink>
                </NavItem>
              </Nav>
            </div>
          </Collapse>
        </Navbar>
      </div>
    </Card>
  );
};

export default ProfileHeader;

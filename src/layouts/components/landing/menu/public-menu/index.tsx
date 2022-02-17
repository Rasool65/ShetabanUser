import { URL_LOGIN } from '@src/configs/urls';
import { FunctionComponent, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Nav, NavItem } from 'reactstrap';

export const PublicMenu: FunctionComponent = (props: any) => {
  const navigate = useNavigate();

  return (
    <>
      <Nav pills className="navbar-nav ml-auto menu">
        <NavItem>
          <a href="#" className="page-scroll">
            خانه
          </a>
        </NavItem>
        <NavItem>
          <a href="#about" className="page-scroll">
            درباره ما
          </a>
        </NavItem>
        <NavItem>
          <a href="#contact" className="page-scroll">
            تماس با ما
          </a>
        </NavItem>
        <NavItem>
          <Link to={URL_LOGIN}>
            <span className="fa fa-user"></span>
            ورود به حساب
          </Link>
        </NavItem>
      </Nav>
    </>
  );
};

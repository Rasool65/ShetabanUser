import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

// ** Store & Actions
import { useSelector } from 'react-redux';

// ** Styles
import '@src/scss/theme/main.scss';
import '../assets/scss/style-rtl.scss';
import '../scss/base/core/menu/menu-types/vertical-menu.scss';
import '../scss/base/core/menu/menu-types/vertical-overlay-menu.scss';
import { RootStateType } from '@src/redux/Store';

import ThemeNavbar from './components/landing/navbar';
import { PublicMenu } from './components/landing/menu/public-menu';
import { PrivateMenu } from './components/landing/menu/private-menu';
import Footer from './components/landing/footer';
import animateScrollTo from 'animated-scroll-to';
import useHttpRequest from '@src/hooks/useHttpRequest';
import { APIURL_GET_GENERAL_INFO } from '@src/configs/apiConfig/apiUrls';
import { IOutputResult } from '@src/models/output/IOutputResult';
import { IGeneralInformationState } from '@src/redux/states/IGeneralInformationState';
import { loadGeneralInformation } from '@src/redux/reducers/generalInformationReducer';

const LandingLayout = (props: any) => {
  // ** Props
  const { children } = props;

  const [scrollTopClass, setScrollTopClass] = useState<string>('');

  // ** States
  const [isMounted, setIsMounted] = useState(false);
  const [menuVisibility, setMenuVisibility] = useState(false);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  const authenticationStore = useSelector((state: RootStateType) => state.authentication);

  const httpRequest = useHttpRequest();

  // ** Update Window Width
  const handleWindowWidth = () => {
    setWindowWidth(window.innerWidth);
  };

  // ** Vars
  const navigate = useNavigate();

  //** This function will detect the Route Change and will hide the menu on menu item click
  useEffect(() => {
    if (menuVisibility && windowWidth < 1200) {
      setMenuVisibility(false);
    }
  }, [navigate]);

  useEffect(() => {
    const element = document.getElementsByTagName('html')[0];
    element.setAttribute('dir', 'ltr');
  }, []);

  //** Sets Window Size & Layout Props
  useEffect(() => {
    if (window !== undefined) {
      window.addEventListener('resize', handleWindowWidth);
    }
  }, [windowWidth]);

  //** ComponentDidMount
  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    setIsMounted(true);

    //load general information
    httpRequest.getRequest<IOutputResult<IGeneralInformationState>>(APIURL_GET_GENERAL_INFO).then((result) => {
      loadGeneralInformation(result);
    });

    return () => setIsMounted(false);
  }, []);

  const handleScroll = (event: any) => {
    let scrollTop = document.documentElement.scrollTop;
    if (scrollTop > 500) {
      setScrollTopClass('open');
    } else {
      setScrollTopClass('');
    }
  };

  const handleScrollToTop = () => {
    animateScrollTo(0);
  };

  if (!isMounted) {
    return null;
  }
  return (
    <>
      <ThemeNavbar>{authenticationStore.isAuthenticate ? <PrivateMenu /> : <PublicMenu />}</ThemeNavbar>
      {children}
      <Footer />

      <div
        className={'scroll-top scroll-to-target primary-bg text-white ' + scrollTopClass}
        onClick={() => handleScrollToTop()}
        data-target="html"
      >
        <span className="fas fa-hand-point-up"></span>
      </div>
    </>
  );
};

export default LandingLayout;

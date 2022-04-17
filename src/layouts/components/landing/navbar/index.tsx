import { Fragment, FunctionComponent, useEffect, useState } from 'react';
import INavbarProps from './INavbarProps';

const ThemeNavbar: FunctionComponent<INavbarProps> = (props: INavbarProps) => {
  const [navbarDrw, setNavbarDrw] = useState<string>('');
  const [navbarCollapseClass, setNavbarCollapseClass] = useState<string>('');

  const handleNavbarCollapse = () => {
    if (navbarCollapseClass == '') setNavbarCollapseClass('show');
    else setNavbarCollapseClass('');
  };

  const handleScroll = (event: any) => {
    let scrollTop = document.documentElement.scrollTop;
    if (scrollTop > 0) {
      setNavbarDrw('affix');
    } else {
      setNavbarDrw('');
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
  }, []);

  const { children } = props;

  return (
    <Fragment>
      <header className="header">
        <nav className={'navbar navbar-expand-lg fixed-top white-bg ' + navbarDrw}>
          <div className="container">
            <a className="navbar-brand" href="#">
              <img src={require('@src/assets/images/shetaban/logo.png')} alt="logo" className="img-fluid" />
            </a>
            <button className="navbar-toggler" onClick={() => handleNavbarCollapse()} type="button">
              <span className="ti-menu"></span>
            </button>

            <div className={'navbar-collapse h-auto collapse ' + navbarCollapseClass} id="navbarSupportedContent">
              {children}
            </div>
          </div>
        </nav>
      </header>
    </Fragment>
  );
};

export default ThemeNavbar;

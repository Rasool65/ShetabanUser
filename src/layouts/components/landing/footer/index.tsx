import { BASE_URL } from '@src/configs/apiConfig/apiBaseUrl';
import { URL_DASHBOARD, URL_HISTORY } from '@src/configs/urls';
import { RootStateType } from '@src/redux/Store';
import { FunctionComponent } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { FooterSocialLink } from './social-link';
import { FooterSocialLinkType } from './social-link/IFooterSocialLinkProp';

const Footer: FunctionComponent = () => {
  const generalInformationStore = useSelector((state: RootStateType) => state.generalInformation);
  return (
    <>
      <footer className="footer-1 ptb-60 footer-with-newsletter">
        <div className="container">
          <div className="row">
            <div className="col-md-12 col-lg-4 mb-4 mb-md-4 mb-sm-4 mb-lg-0">
              <a href="#" className="navbar-brand mb-2">
                <img
                  src={require('@src/assets/images/shetaban/logo_2.png')}
                  alt={generalInformationStore.title}
                  className="img-fluid"
                />
              </a>
              <br />
              <p>{generalInformationStore.description}</p>
            </div>
            <div className="col-md-12 col-lg-8">
              <div className="row mt-0">
                <div className="col-sm-6 col-md-3 col-lg-3 mb-4 mb-sm-4 mb-md-0 mb-lg-0 pt-4">
                  <h6 className="text-uppercase">خدمات</h6>
                  <ul>
                    <li>
                      <Link to={URL_DASHBOARD}>درخواست خدمات</Link>
                    </li>
                    <li>
                      <Link to={URL_DASHBOARD}>پیگیری و سوابق درخواست ها</Link>
                    </li>
                  </ul>
                </div>
                <div className="col-sm-6 col-md-3 col-lg-3 mb-4 mb-sm-4 mb-md-0 mb-lg-0 pt-4">
                  <h6 className="text-uppercase">شرکت</h6>
                  <ul>
                    <li>
                      <a href={URL_HISTORY}>تاریخچه شتابان شمال</a>
                    </li>
                    <li>
                      <a href={`${'/#contact'}`}>تماس با ما</a>
                    </li>
                  </ul>
                </div>
                <div className="col-sm-6 col-md-6 col-lg-5 pt-4">
                  <h6 className="text-uppercase text-center mb-4">ما را در شبکه های اجتماعی دنبال کنید</h6>
                  <div className="text-center">
                    <div className="list-inline social-list-default background-color social-hover-2 mt-2">
                      <FooterSocialLink url={generalInformationStore.instagramLink} type={FooterSocialLinkType.instagram} />
                      <FooterSocialLink url={generalInformationStore.twitterLink} type={FooterSocialLinkType.twitter} />
                      <FooterSocialLink url={generalInformationStore.lindInLink} type={FooterSocialLinkType.linkedin} />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </footer>

      <div className="footer-bottom py-3 gray-light-bg">
        <div className="container">
          <div className="row">
            <div className="col-md-6 col-lg-7">
              <div className="copyright-wrap small-text">
                <p className="mb-0">© تمامی حقوق برای شتابان محفوظ است.</p>
              </div>
            </div>
            <div className="col-md-6 col-lg-5">
              <div className="terms-policy-wrap text-lg-right text-md-right text-left">
                <ul className="list-inline">
                  <li className="list-inline-item">
                    <a className="small-text" href="#">
                      مقررات
                    </a>
                  </li>
                  <li className="list-inline-item">
                    <a className="small-text" href="#">
                      امنیت
                    </a>
                  </li>
                  <li className="list-inline-item">
                    <a className="small-text" href="#">
                      سیاست حفظ حریم خصوصی
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Footer;

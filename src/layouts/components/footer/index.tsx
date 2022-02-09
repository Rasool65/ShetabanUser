import { RootStateType } from '@src/redux/Store';
import { FunctionComponent } from 'react';
import { useSelector } from 'react-redux';
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
              <div className="list-inline social-list-default background-color social-hover-2 mt-2">
                <FooterSocialLink url={generalInformationStore.instagramLink} type={FooterSocialLinkType.instagram} />
                <FooterSocialLink url={generalInformationStore.twitterLink} type={FooterSocialLinkType.twitter} />
                <FooterSocialLink url={generalInformationStore.lindInLink} type={FooterSocialLinkType.linkedin} />
              </div>
            </div>
            <div className="col-md-12 col-lg-8">
              <div className="row mt-0">
                <div className="col-sm-6 col-md-3 col-lg-3 mb-4 mb-sm-4 mb-md-0 mb-lg-0">
                  <h6 className="text-uppercase">منابع</h6>
                  <ul>
                    <li>
                      <a href="#">راهنمایی</a>
                    </li>
                    <li>
                      <a href="#">مناسبت ها</a>
                    </li>
                    <li>
                      <a href="#">جلسات زنده</a>
                    </li>
                    <li>
                      <a href="#">متن باز</a>
                    </li>
                    <li>
                      <a href="#">مستندات</a>
                    </li>
                  </ul>
                </div>
                <div className="col-sm-6 col-md-3 col-lg-3 mb-4 mb-sm-4 mb-md-0 mb-lg-0">
                  <h6 className="text-uppercase">محصولات</h6>
                  <ul>
                    <li>
                      <a href="#">قیمت گذاری</a>
                    </li>
                    <li>
                      <a href="#">جهت یابی</a>
                    </li>
                    <li>
                      <a href="#">استودیو </a>
                    </li>
                    <li>
                      <a href="#">متن ساختگی</a>
                    </li>
                    <li>
                      <a href="#">کارایی</a>
                    </li>
                  </ul>
                </div>
                <div className="col-sm-6 col-md-3 col-lg-3 mb-4 mb-sm-4 mb-md-0 mb-lg-0">
                  <h6 className="text-uppercase">شرکت</h6>
                  <ul>
                    <li>
                      <a href="#">درباره ما</a>
                    </li>
                    <li>
                      <a href="#">مشاغل</a>
                    </li>
                    <li>
                      <a href="#">مشتریان</a>
                    </li>
                    <li>
                      <a href="#">انجمن</a>
                    </li>
                    <li>
                      <a href="#">تیم ما</a>
                    </li>
                  </ul>
                </div>
                <div className="col-sm-6 col-md-3 col-lg-3">
                  <h6 className="text-uppercase">حمایت کردن</h6>
                  <ul>
                    <li>
                      <a href="#">سؤالات متداول</a>
                    </li>
                    <li>
                      <a href="#">فروش</a>
                    </li>
                    <li>
                      <a href="#">تماس با پشتیبانی</a>
                    </li>
                    <li>
                      <a href="#">وضعیت شبکه</a>
                    </li>
                    <li>
                      <a href="#">خدمات محصولات</a>
                    </li>
                  </ul>
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

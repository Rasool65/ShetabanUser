import { FunctionComponent, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import IPageProps from '../../configs/routerConfig/IPageProps';
import { RootStateType } from '../../redux/Store';
import OwlCarousel from 'react-owl-carousel';
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';
import '../../scss/theme/main.scss';
import useHttpRequest from '@src/hooks/useHttpRequest';

const Home: FunctionComponent<IPageProps> = (props) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const httpRequest = useHttpRequest();
  const mapState = useSelector((state: RootStateType) => state.map);
  const [navbarDrw, setNavbarDrw] = useState<string>('');
  const [scrollTopClass, setScrollTopClass] = useState<string>('');

  useEffect(() => {
    document.title = props.title;
  }, [props.title]);

  const handleScroll = (event: any) => {
    let scrollTop = document.documentElement.scrollTop;
    console.log(scrollTop);
    if (scrollTop > 0) {
      setNavbarDrw('affix');
      setScrollTopClass('open');
    } else {
      setNavbarDrw('');
      setScrollTopClass('');
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <header className="header m-10 white-bg">
        <nav className={'navbar navbar-expand-lg fixed-top white-bg ' + navbarDrw}>
          <div className="container">
            <a className="navbar-brand" href="index.html">
              <img src={require('@src/assets/images/shetaban/logo.png')} alt="logo" className="img-fluid" />
            </a>
            <button className="navbar-toggler" type="button">
              <span className="ti-menu"></span>
            </button>

            <div className="collapse navbar-collapse h-auto" id="navbarSupportedContent">
              <ul className="navbar-nav ml-auto menu">
                <li>
                  <a href="#" className="dropdown-toggle">
                    {' '}
                    خانه
                  </a>
                  <ul className="sub-menu">
                    <li>
                      <a href="index.html">صفحه اصلی 1</a>
                    </li>
                    <li>
                      <a href="index-2.html">صفحه اصلی 2</a>
                    </li>
                    <li>
                      <a href="index-3.html">صفحه اصلی 3</a>
                    </li>
                    <li>
                      <a href="index-4.html">صفحه اصلی 4</a>
                    </li>
                    <li>
                      <a href="index-5.html">صفحه اصلی 5</a>
                    </li>
                    <li>
                      <a href="index-6.html">صفحه اصلی 6</a>
                    </li>
                    <li>
                      <a href="index-7.html">صفحه اصلی 7</a>
                    </li>
                    <li>
                      <a href="index-8.html">صفحه اصلی 8</a>
                    </li>
                    <li>
                      <a href="index-9.html">صفحه اصلی 9</a>
                    </li>
                    <li>
                      <a href="index-10.html">صفحه اصلی 10</a>
                    </li>
                    <li>
                      <a href="index-11.html">صفحه اصلی 11</a>
                    </li>
                    <li>
                      <a href="index-12.html">
                        صفحه اصلی 12 <span className="badge badge-danger">جدید</span>
                      </a>
                    </li>
                    <li>
                      <a href="index-13.html">
                        صفحه اصلی 13 <span className="badge badge-danger">جدید</span>
                      </a>
                    </li>
                  </ul>
                </li>
                <li>
                  <a href="#about" className="page-scroll">
                    درباره ما
                  </a>
                </li>
                <li>
                  <a href="#features" className="page-scroll">
                    امکانات
                  </a>
                </li>
                <li>
                  <a href="#" className="dropdown-toggle">
                    صفحات
                  </a>
                  <ul className="sub-menu">
                    <li>
                      <a href="#" className="dropdown-toggle-inner">
                        ورود و ثبت نام
                      </a>
                      <ul className="sub-menu">
                        <li>
                          <a href="login.html">صفحه ورود</a>
                        </li>
                        <li>
                          <a href="sign-up.html">صفحه ثبت نام</a>
                        </li>
                        <li>
                          <a href="password-reset.html">بازیابی رمز عبور</a>
                        </li>
                      </ul>
                    </li>
                    <li>
                      <a href="#" className="dropdown-toggle-inner">
                        خدمات رفاهی
                      </a>
                      <ul className="sub-menu">
                        <li>
                          <a href="faq.html">صفحه پرسش و پاسخ</a>
                        </li>
                        <li>
                          <a href="404.html">صفحه 404</a>
                        </li>
                        <li>
                          <a href="coming-soon.html">به زودی</a>
                        </li>
                        <li>
                          <a href="thank-you.html">صفحه ممنون</a>
                        </li>
                        <li>
                          <a href="download.html">صفحه بارگیری </a>
                        </li>
                        <li>
                          <a href="review.html">صفحه بازدید </a>
                        </li>
                      </ul>
                    </li>
                    <li>
                      <a href="#" className="dropdown-toggle-inner">
                        تیم
                      </a>
                      <ul className="sub-menu">
                        <li>
                          <a href="team.html">اعضای تیم ما</a>
                        </li>
                        <li>
                          <a href="team-single.html">پروفایل اعضای تیم</a>
                        </li>
                      </ul>
                    </li>
                    <li>
                      <a href="#" className="dropdown-toggle-inner">
                        وبلاگ ما
                      </a>
                      <ul className="sub-menu">
                        <li>
                          <a href="blog-default.html">شبکه وبلاگ</a>
                        </li>
                        <li>
                          <a href="blog-no-sidebar.html">وبلاگ بدون نوار کناری</a>
                        </li>
                        <li>
                          <a href="blog-left-sidebar.html">وبلاگ سمت چپ</a>
                        </li>
                        <li>
                          <a href="blog-right-sidebar.html">وبلاگ سمت راست </a>
                        </li>
                        <li>
                          <a href="blog-single-left-sidebar.html">جزئیات نوار کناری سمت چپ</a>
                        </li>
                        <li>
                          <a href="blog-single-right-sidebar.html">جزئیات نوار کناری سمت راست</a>
                        </li>
                      </ul>
                    </li>
                    <li>
                      <a href="about-us.html">درباره ما </a>
                    </li>
                    <li>
                      <a href="contact-us.html">با ما تماس بگیرید</a>
                    </li>
                    <li>
                      <a href="sale-invoice.html">
                        {' '}
                        فاکتور فروش <span className="badge badge-danger">جدید</span>
                      </a>
                    </li>
                  </ul>
                </li>
                <li>
                  <a href="#screenshots" className="page-scroll">
                    عکس های صفحه
                  </a>
                </li>
                <li>
                  <a href="#process" className="page-scroll">
                    برنامه ریزی
                  </a>
                </li>
                <li>
                  <a href="#pricing" className="page-scroll">
                    قیمت گذاری
                  </a>
                </li>
                <li>
                  <a href="#contact" className="page-scroll">
                    تماس با ما
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </nav>
      </header>

      <div className="main">
        <section className="position-relative ptb-100 main-bg">
          <div className="fit-cover background-image-wraper position-absolute"></div>
          <div className="container">
            <div className="row align-items-center justify-content-between">
              <div className="col-md-6 col-lg-6">
                <div className="section-heading py-5">
                  <h1>شرکت حمل و نقل شتابان</h1>
                  <p className="lead">
                    شرکت حمل یخچالی شتابان با بزرگترین ناوگان حمل یخچالی و شیر کشور در خدمت شما است. کارشناسان این شرکت برای
                    پاسخ‌گویی به سوالات شما آماده هستند.
                  </p>
                  <div className="action-btns mt-3">
                    <a href="#" className="btn btn-brand-03 btn-rounded mr-3">
                      اکنون بارگیری کن <i className="fas fa-cloud-download-alt pl-2"></i>
                    </a>
                    <a
                      href="https://www.youtube.com/watch?v=1APwq1df6Mw"
                      className="popup-youtube btn btn-white btn-circle btn-icon"
                    >
                      <i className="fas fa-play"></i>{' '}
                    </a>{' '}
                    <span className="pl-2">الان ببین</span>
                  </div>
                </div>
              </div>
              <div className="col-md-6 col-lg-5">
                <div className="hero-animation-img">
                  <img className="img-fluid" src={require('@src/assets/images/shetaban/s01.png')} alt="animation image" />
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="promo-block ptb-100">
          <div className="container">
            <div className="row justify-content-md-center">
              <div className="col-lg-4 col-md-6">
                <div className="promo-one-single rounded p-5 my-3 my-md-3 my-lg-0 shadow-lg text-center">
                  <img src={require('@src/assets/images/shetaban/bn01.jpg')} alt="promo" className="mb-4" width="200" />
                  <h5>حمل و نقل جاده‌ای</h5>
                  <p className="mb-0">
                    حمل و نقل جاده‌ای یخچالی تخصص ماست. شتابان با حمل بیش از ۴۰ میلیون تن بار یخچالی در خدمت شما است.{' '}
                  </p>
                  {/* <a href="#" className="icon-link accent-bg">
                    <span className="ti-angle-double-left"></span>
                  </a> */}
                </div>
              </div>
              <div className="col-lg-4 col-md-6">
                <div className="promo-one-single rounded p-5 my-3 my-md-3 my-lg-0 shadow-lg text-center">
                  <img src={require('@src/assets/images/shetaban/bn02.jpg')} alt="promo" className="mb-4" width="200" />
                  <h5>صدور بارنامه</h5>
                  <p className="mb-0">
                    شرکت شتابان با ۱۰ شعبه در سراسر کشور آماده صدور بارنامه است. تعداد این شعب در حال توسعه است.{' '}
                  </p>
                  {/* <a href="#" className="icon-link accent-bg">
                    <span className="ti-angle-double-left"></span>
                  </a> */}
                </div>
              </div>
              <div className="col-lg-4 col-md-6">
                <div className="promo-one-single rounded p-5 my-3 my-md-3 my-lg-0 shadow-lg text-center">
                  <img src={require('@src/assets/images/shetaban/bn03.jpg')} alt="promo" className="mb-4" width="200" />
                  <h5>انعقاد قرارداد حمل B2B</h5>
                  <p className="mb-0">
                    شتابان آمادگی انعقاد قرارداد بلند مدت با تعریف SLA مشخص دارد. تضمین حمل به موقع و صحیح بار شما تخصص ما است.
                  </p>
                  {/* <a href="#" className="icon-link accent-bg">
                    <span className="ti-angle-double-left"></span>
                  </a> */}
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="features" className="feature-section ptb-100 gray-light-bg">
          <div className="container">
            <div className="row justify-content-center">
              <div className="col-md-9 col-lg-8">
                <div className="section-heading text-center mb-5">
                  <h2>ویژگی های برنامه</h2>
                  <p className="text-muted para-desc mb-0 mx-auto">
                    کار را با آن شروع کنید که می تواند همه چیز را برای ایجاد آگاهی ، رانندگی ترافیک ، اتصال فراهم کند. ارزش دانه
                    ای را با محتوای متمرکز بر مشتری تغییر دهید. بازتعریف بازار.
                  </p>
                </div>
              </div>
            </div>

            <div className="row align-items-center">
              <div className="col-lg-8 col-md-12">
                <div className="row align-items-center">
                  <div className="col-md-6 col-12">
                    <div className="features-single-wrap mb-sm-0 mb-md-5 mb-lg-5">
                      <span className="ti-layout p-3 mr-4 mt-1 rounded-circle float-left"></span>
                      <div className="features-single-content d-block overflow-hidden">
                        <h5 className="mb-2">از هر دستگاهی استفاده کنید</h5>
                        <p>تشکیل شده به یک زبان شبه لاتین که کم و بیش زبان شبه لاتین مطابقت دارد.</p>
                      </div>
                    </div>
                  </div>

                  <div className="col-md-6 col-12">
                    <div className="features-single-wrap mb-sm-0 mb-md-5 mb-lg-5">
                      <span className="ti-themify-favicon-alt p-3 mr-4 mt-1 rounded-circle float-left"></span>
                      <div className="features-single-content d-block overflow-hidden">
                        <h5 className="mb-2">متن ساختگی</h5>
                        <p>تشکیل شده به یک زبان شبه لاتین که کم و بیش زبان شبه لاتین مطابقت دارد.</p>
                      </div>
                    </div>
                  </div>

                  <div className="col-md-6 col-12">
                    <div className="features-single-wrap mb-sm-0 mb-md-5 mb-lg-5">
                      <span className="ti-eye p-3 mr-4 mt-1 rounded-circle float-left"></span>
                      <div className="features-single-content d-block overflow-hidden">
                        <h5 className="mb-2">شبکیه چشم آماده است</h5>
                        <p>تشکیل شده به یک زبان شبه لاتین که کم و بیش زبان شبه لاتین مطابقت دارد.</p>
                      </div>
                    </div>
                  </div>

                  <div className="col-md-6 col-12">
                    <div className="features-single-wrap mb-sm-0 mb-md-5 mb-lg-5">
                      <span className="ti-thumb-up p-3 mr-4 mt-1 rounded-circle float-left"></span>
                      <div className="features-single-content d-block overflow-hidden">
                        <h5 className="mb-2">کد معتبر W3c</h5>
                        <p>تشکیل شده به یک زبان شبه لاتین که کم و بیش زبان شبه لاتین مطابقت دارد.</p>
                      </div>
                    </div>
                  </div>

                  <div className="col-md-6 col-12">
                    <div className="features-single-wrap mb-sm-0 mb-md-5 mb-lg-5">
                      <span className="ti-mobile p-3 mr-4 mt-1 rounded-circle float-left"></span>
                      <div className="features-single-content d-block overflow-hidden">
                        <h5 className="mb-2">کاملاً پاسخگو</h5>
                        <p>تشکیل شده به یک زبان شبه لاتین که کم و بیش زبان شبه لاتین مطابقت دارد.</p>
                      </div>
                    </div>
                  </div>

                  <div className="col-md-6 col-12">
                    <div className="features-single-wrap mb-sm-0 mb-md-5 mb-lg-5">
                      <span className="ti-world p-3 mr-4 mt-1 rounded-circle float-left"></span>
                      <div className="features-single-content d-block overflow-hidden">
                        <h5 className="mb-2">سازگاری مرورگر</h5>
                        <p>تشکیل شده به یک زبان شبه لاتین که کم و بیش زبان شبه لاتین مطابقت دارد.</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="col-lg-4 col-md-4 col-12">
                <img src="assets/img/app-mobile-image.png" className="img-fluid mx-auto d-lg-block d-none" alt="صفحه برنامه" />
              </div>
            </div>
          </div>
        </section>

        <section className="bg-image ptb-100" image-overlay="8">
          <div className="background-image-wraper"></div>
          <div className="container">
            <div className="row justify-content-center">
              <div className="col-md-9 col-lg-8">
                <div className="section-heading text-center mb-1 text-white">
                  <h2 className="text-white">برنامه های ما را بارگیری کنید</h2>
                  <p>
                    کار را با آن شروع کنید که می تواند همه چیز را برای ایجاد آگاهی ، رانندگی ترافیک ، اتصال فراهم کند. ارزش دانه
                    ای را با محتوای متمرکز بر مشتری تغییر دهید. بازتعریف بازار.
                  </p>
                  <div className="action-btns mt-4">
                    <ul className="list-inline">
                      <li className="list-inline-item">
                        <a href="#" className="d-flex align-items-center app-download-btn btn btn-brand-02 btn-rounded">
                          <span className="fab fa-windows icon-size-sm mr-3"></span>
                          <div className="download-text text-left">
                            <small>فرم بارگیری</small>
                            <h5 className="mb-0">پنجره ها</h5>
                          </div>
                        </a>
                      </li>
                      <li className="list-inline-item">
                        <a href="#" className="d-flex align-items-center app-download-btn btn btn-brand-02 btn-rounded">
                          <span className="fab fa-apple icon-size-sm mr-3"></span>
                          <div className="download-text text-left">
                            <small>فرم بارگیری</small>
                            <h5 className="mb-0">فروشگاه برنامه</h5>
                          </div>
                        </a>
                      </li>
                      <li className="list-inline-item">
                        <a href="#" className="d-flex align-items-center app-download-btn btn btn-brand-02 btn-rounded">
                          <span className="fab fa-google-play icon-size-sm mr-3"></span>
                          <div className="download-text text-left">
                            <small>فرم بارگیری</small>
                            <h5 className="mb-0">فروشگاه گوگل</h5>
                          </div>
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="process" className="work-process-section position-relative  ptb-100 ">
          <div className="container">
            <div className="row justify-content-center">
              <div className="col-md-9 col-lg-8">
                <div className="section-heading text-center mb-5">
                  <h2>برنامه ریزی کار ما</h2>
                  <p>
                    میزبانی حرفه ای با قیمت مناسب. مجزا صلاحیت های اصلی محور را از طریق صلاحیت های اصلی مشتری محور بازآفرینی کنید.
                  </p>
                </div>
              </div>
            </div>
            <div className="row align-items-center justify-content-md-center justify-content-sm-center">
              <div className="col-md-12 col-lg-6">
                <div className="work-process-wrap">
                  <div className="process-single-item">
                    <div className="process-icon-item left-shape">
                      <div className="d-flex align-items-center">
                        <div className="process-icon mr-4">
                          <i className="fas fa-project-diagram color-primary"></i>
                        </div>
                        <div className="process-content text-left">
                          <h5>ایده برنامه ریزی</h5>
                          <p>
                            کاملاً معمار متا-خدمات پایدار را برای صلاحیت های هسته پردازش محور معمار می کند. با اشتیاق مجدداً برون
                            سپاری از بهترین نژادها را مهندسی کنید.
                          </p>
                        </div>
                      </div>
                      <svg x="0px" y="0px" width="312px" height="130px">
                        <path
                          className="dashed1"
                          fill="none"
                          stroke="rgb(95, 93, 93)"
                          stroke-width="1"
                          stroke-dasharray="1300"
                          stroke-dashoffset="0"
                          d="M311.000,0.997 C311.000,0.997 313.123,123.592 214.535,79.996 C214.535,79.996 41.149,20.122 3.377,125.996"
                        ></path>
                        <path
                          className="dashed2"
                          fill="none"
                          stroke="#ffffff"
                          stroke-width="2"
                          stroke-dasharray="6"
                          stroke-dashoffset="1300"
                          d="M311.000,0.997 C311.000,0.997 313.123,123.592 214.535,79.996 C214.535,79.996 41.149,20.122 3.377,125.996"
                        ></path>
                      </svg>
                    </div>
                  </div>
                  <div className="process-single-item">
                    <div className="process-icon-item right-shape">
                      <div className="d-flex align-items-center">
                        <div className="process-icon ml-4">
                          <i className="fas fa-puzzle-piece color-primary"></i>
                        </div>
                        <div className="process-content text-right">
                          <h5>محصول نهایی توسعه یافته است</h5>
                          <p>
                            آمادگی یکپارچه وب را پس از کاتالیزورهای مبتنی بر چندرسانه ای برای تغییر مهار می کنید. سیستم های جلویی
                            کاملاً نام تجاری قبل از بینایی.
                          </p>
                        </div>
                      </div>

                      <svg x="0px" y="0px" width="312px" height="130px">
                        <path
                          className="dashed1"
                          fill="none"
                          stroke="rgb(95, 93, 93)"
                          stroke-width="1"
                          stroke-dasharray="1300"
                          stroke-dashoffset="0"
                          d="M3.121,2.028 C3.121,2.028 1.003,124.928 99.352,81.226 C99.352,81.226 272.319,21.200 310.000,127.338"
                        ></path>
                        <path
                          className="dashed2"
                          fill="none"
                          stroke="#ffffff"
                          stroke-width="2"
                          stroke-dasharray="6"
                          stroke-dashoffset="1300"
                          d="M3.121,2.028 C3.121,2.028 1.003,124.928 99.352,81.226 C99.352,81.226 272.319,21.200 310.000,127.338 "
                        ></path>
                      </svg>
                    </div>
                  </div>
                  <div className="process-single-item">
                    <div className="process-icon-item left-shape mb-0">
                      <div className="d-flex align-items-center">
                        <div className="process-icon mr-4">
                          <i className="fas fa-truck color-primary"></i>
                        </div>
                        <div className="process-content text-left">
                          <h5>تحویل به مشتری</h5>
                          <p>
                            تجارت یکپارچه هم افزایی تجارت الکترونیکی به صورت یکپارچه ادبی می کند. از نظر حرفه ای محصولات تولید شده
                            بینایی را به صورت مترقی افزایش دهید.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-md-6 col-lg-6">
                <div className="img-wrap">
                  <img src="assets/img/app-mobile-image-3.png" alt="امکانات" className="img-fluid" />
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="pricing" className="pricing-section ptb-100">
          <div className="container">
            <div className="row justify-content-center">
              <div className="col-md-9 col-lg-8">
                <div className="section-heading text-center mb-4">
                  <h2>قیمت انعطاف پذیر ما</h2>
                  <p>
                    میزبانی حرفه ای با قیمت مناسب. مجزا صلاحیت های اصلی محور را از طریق صلاحیت های اصلی مشتری محور بازآفرینی کنید.
                  </p>
                </div>
              </div>
            </div>
            <div className="row align-items-center justify-content-md-center justify-content-center">
              <div className="col-12">
                <div className="d-flex justify-content-center text-center">
                  <label className="pricing-switch-wrap">
                    <span className="beforeinput year-switch text-success">ماهانه</span>
                    <input type="checkbox" className="d-none" id="js-contcheckbox" />
                    <span className="switch-icon"></span>
                    <span className="afterinput year-switch">سالانه</span>
                  </label>
                </div>
              </div>
              <div className="col-lg-4 col-md-6 col-sm-8">
                <div className="text-center bg-white single-pricing-pack mt-4">
                  <div className="price-img pt-4">
                    <img src="assets/img/priching-img-1.png" alt="قیمت" width="120" className="img-fluid" />
                  </div>
                  <div className="py-4 border-0 pricing-header">
                    <div className="price text-center mb-0 monthly-price color-secondary">
                      19 تومان<span></span>
                    </div>
                    <div className="price text-center mb-0 yearly-price color-secondary">69 تومان </div>
                  </div>
                  <div className="price-name">
                    <h5 className="mb-0">استاندارد</h5>
                  </div>
                  <div className="pricing-content">
                    <ul className="list-unstyled mb-4 pricing-feature-list">
                      <li>
                        <span></span>دسترسی <span>محدود</span> به مدت یک ماه
                      </li>
                      <li>
                        <span>15</span> صفحه زیر را سفارشی کنید
                      </li>
                      <li className="text-deem">
                        <span>105</span> فضای دیسک
                      </li>
                      <li className="text-deem">
                        <span>3</span> دسترسی به دامنه
                      </li>
                      <li className="text-deem">پشتیبانی تلفنی 24/7</li>
                    </ul>
                    <a href="#" className="btn btn-outline-brand-02 btn-rounded mb-3" target="_blank">
                      هم اکنون بخرید
                    </a>
                  </div>
                </div>
              </div>
              <div className="col-lg-4 col-md-6 col-sm-8">
                <div className="popular-price bg-white text-center single-pricing-pack mt-4">
                  <div className="price-img pt-4">
                    <img src="assets/img/priching-img-2.png" alt="قیمت" width="120" className="img-fluid" />
                  </div>
                  <div className="py-4 border-0 pricing-header">
                    <div className="price text-center mb-0 monthly-price color-secondary">
                      49 تومان<span></span>
                    </div>
                    <div className="price text-center mb-0 yearly-price color-secondary">159 تومان </div>
                  </div>
                  <div className="price-name">
                    <h5 className="mb-0">حق بیمه</h5>
                  </div>
                  <div className="pricing-content">
                    <ul className="list-unstyled mb-4 pricing-feature-list">
                      <li>
                        <span></span>دسترسی <span>نامحدود</span> به مدت یک ماه
                      </li>
                      <li>
                        <span>25</span> صفحه زیر را سفارشی کنید
                      </li>
                      <li>
                        <span>150</span> فضای دیسک
                      </li>
                      <li className="text-deem">
                        <span>5</span> دسترسی به دامنه
                      </li>
                      <li className="text-deem">پشتیبانی تلفنی 24/7</li>
                    </ul>
                    <a href="#" className="btn btn-brand-02 btn-rounded mb-3" target="_blank">
                      هم اکنون بخرید
                    </a>
                  </div>
                </div>
              </div>
              <div className="col-lg-4 col-md-6 col-sm-8">
                <div className="text-center bg-white single-pricing-pack mt-4">
                  <div className="price-img pt-4">
                    <img src="assets/img/priching-img-3.png" alt="قیمت" width="120" className="img-fluid" />
                  </div>
                  <div className="py-4 border-0 pricing-header">
                    <div className="price text-center mb-0 monthly-price color-secondary">
                      69 تومان<span></span>
                    </div>
                    <div className="price text-center mb-0 yearly-price color-secondary">
                      259 تومان<span></span>
                    </div>
                  </div>
                  <div className="price-name">
                    <h5 className="mb-0">نامحدود</h5>
                  </div>
                  <div className="pricing-content">
                    <ul className="list-unstyled mb-4 pricing-feature-list">
                      <li>
                        <span></span>دسترسی <span>محدود</span> به مدت یک ماه
                      </li>
                      <li>
                        <span>15</span> صفحه زیر را سفارشی کنید
                      </li>
                      <li>
                        <span>120</span> فضای دیسک
                      </li>
                      <li>
                        <span>5</span> دسترسی به دامنه
                      </li>
                      <li>پشتیبانی تلفنی 24/7</li>
                    </ul>
                    <a href="#" className="btn btn-outline-brand-02 btn-rounded mb-3" target="_blank">
                      هم اکنون بخرید
                    </a>
                  </div>
                </div>
              </div>
              <div className="col-12">
                <div className="support-cta text-center mt-5">
                  <h5 className="mb-1">
                    <span className="ti-headphone-alt color-primary mr-3"></span>ما برای راهنمایی به شما اینجا هستیم
                  </h5>
                  <p>
                    سؤال دارید؟ <a href="#">اکنون با ما گپ بزنید</a> یا <a href="#">برای ارتباط با ما ایمیل بفرستید</a> .
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="counter-section gradient-bg ptb-40">
          <div className="container">
            <div className="row">
              <div className="col-sm-6 col-md-6 col-lg-3">
                <div className="text-white p-2 count-data text-center my-3">
                  <span className="fas fa-users icon-size-lg mb-2"></span>
                  <h3 className="count-number mb-1 text-white font-weight-bolder">21023</h3>
                  <span>مشتریان</span>
                </div>
              </div>
              <div className="col-sm-6 col-md-6 col-lg-3">
                <div className="text-white p-2 count-data text-center my-3">
                  <span className="fas fa-cloud-download-alt icon-size-lg mb-2"></span>
                  <h3 className="count-number mb-1 text-white font-weight-bolder">44023</h3>
                  <span>دریافت ها</span>
                </div>
              </div>
              <div className="col-sm-6 col-md-6 col-lg-3">
                <div className="text-white p-2 count-data text-center my-3">
                  <span className="fas fa-smile icon-size-lg mb-2"></span>
                  <h3 className="count-number mb-1 text-white font-weight-bolder">35023</h3>
                  <span>راضی</span>
                </div>
              </div>
              <div className="col-sm-6 col-md-6 col-lg-3">
                <div className="text-white p-2 count-data text-center my-3">
                  <span className="fas fa-mug-hot icon-size-lg mb-2"></span>
                  <h3 className="count-number mb-1 text-white font-weight-bolder">2323</h3>
                  <span>فنجان قهوه</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="team-two-section ptb-100">
          <div className="container">
            <div className="row justify-content-center">
              <div className="col-md-9 col-lg-8">
                <div className="section-heading text-center">
                  <h2>اعضای تیم ما</h2>
                  <p>
                    به طور موثق پارادایمهای شهودی را در مقابل مشارکتهای هدف محور مشبک کنید. پس از کاتالیزورهای متمرکز ، به طور
                    مداوم منبع باز را در خارج از جعبه گسترش دهید.
                  </p>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-md-6 col-lg-3">
                <div className="single-team-wrap bg-white text-center border rounded p-4 mt-4">
                  <img src="assets/img/team/team-member-1.png" alt="تصویر تیم" width="120" className="img-fluid m-auto pb-4" />
                  <div className="team-content">
                    <h5 className="mb-0">ریچارد فورد</h5>
                    <span>تحلیلگر</span>
                    <p className="mt-3">
                      لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با استفاده از طراحان گرافیک است.{' '}
                    </p>
                    <ul className="list-inline social-list-default social-color icon-hover-top-bottom">
                      <li className="list-inline-item">
                        <a className="facebook" href="#" target="_blank">
                          <i className="fab fa-facebook-f"></i>
                        </a>
                      </li>
                      <li className="list-inline-item">
                        <a className="twitter" href="#" target="_blank">
                          <i className="fab fa-twitter"></i>
                        </a>
                      </li>
                      <li className="list-inline-item">
                        <a className="dribbble" href="#" target="_blank">
                          <i className="fab fa-dribbble"></i>
                        </a>
                      </li>
                      <li className="list-inline-item">
                        <a className="linkedin" href="#" target="_blank">
                          <i className="fab fa-linkedin-in"></i>
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
              <div className="col-md-6 col-lg-3">
                <div className="single-team-wrap bg-white text-center border rounded p-4 mt-4">
                  <img src="assets/img/team/team-member-2.png" alt="تصویر تیم" width="120" className="img-fluid m-auto pb-4" />
                  <div className="team-content">
                    <h5 className="mb-0">نام کاربر</h5>
                    <span>طراح سرب</span>
                    <p className="mt-3">
                      لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با استفاده از طراحان گرافیک است.
                    </p>
                    <ul className="list-inline social-list-default social-color icon-hover-top-bottom">
                      <li className="list-inline-item">
                        <a className="facebook" href="#" target="_blank">
                          <i className="fab fa-facebook-f"></i>
                        </a>
                      </li>
                      <li className="list-inline-item">
                        <a className="twitter" href="#" target="_blank">
                          <i className="fab fa-twitter"></i>
                        </a>
                      </li>
                      <li className="list-inline-item">
                        <a className="dribbble" href="#" target="_blank">
                          <i className="fab fa-dribbble"></i>
                        </a>
                      </li>
                      <li className="list-inline-item">
                        <a className="linkedin" href="#" target="_blank">
                          <i className="fab fa-linkedin-in"></i>
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
              <div className="col-md-6 col-lg-3">
                <div className="single-team-wrap bg-white text-center border rounded p-4 mt-4">
                  <img src="assets/img/team/team-member-3.png" alt="تصویر تیم" width="120" className="img-fluid m-auto pb-4" />
                  <div className="team-content">
                    <h5 className="mb-0">جرالد نیکولز</h5>
                    <span>مدیر عامل</span>
                    <p className="mt-3">
                      لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با استفاده از طراحان گرافیک است.
                    </p>
                    <ul className="list-inline social-list-default social-color icon-hover-top-bottom">
                      <li className="list-inline-item">
                        <a className="facebook" href="#" target="_blank">
                          <i className="fab fa-facebook-f"></i>
                        </a>
                      </li>
                      <li className="list-inline-item">
                        <a className="twitter" href="#" target="_blank">
                          <i className="fab fa-twitter"></i>
                        </a>
                      </li>
                      <li className="list-inline-item">
                        <a className="dribbble" href="#" target="_blank">
                          <i className="fab fa-dribbble"></i>
                        </a>
                      </li>
                      <li className="list-inline-item">
                        <a className="linkedin" href="#" target="_blank">
                          <i className="fab fa-linkedin-in"></i>
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
              <div className="col-md-6 col-lg-3">
                <div className="single-team-wrap bg-white text-center border rounded p-4 mt-4">
                  <img src="assets/img/team/team-member-4.png" alt="تصویر تیم" width="120" className="img-fluid m-auto pb-4" />
                  <div className="team-content">
                    <h5 className="mb-0">جرالد نیکولز</h5>
                    <span>مدیر تیم</span>
                    <p className="mt-3">قبل از پردازش موازی ، همزمان فناوری های پیشرفته فناوری های جعبه را تحقق بخشید</p>
                    <ul className="list-inline social-list-default social-color icon-hover-top-bottom">
                      <li className="list-inline-item">
                        <a className="facebook" href="#" target="_blank">
                          <i className="fab fa-facebook-f"></i>
                        </a>
                      </li>
                      <li className="list-inline-item">
                        <a className="twitter" href="#" target="_blank">
                          <i className="fab fa-twitter"></i>
                        </a>
                      </li>
                      <li className="list-inline-item">
                        <a className="dribbble" href="#" target="_blank">
                          <i className="fab fa-dribbble"></i>
                        </a>
                      </li>
                      <li className="list-inline-item">
                        <a className="linkedin" href="#" target="_blank">
                          <i className="fab fa-linkedin-in"></i>
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="faq" className="ptb-100 ">
          <div className="container">
            <div className="row justify-content-center">
              <div className="col-md-9 col-lg-8">
                <div className="section-heading text-center mb-5">
                  <h2>اغلب نمایش داده شد</h2>
                  <p>
                    پارادایمهای قابل اطمینان را قبل از مدلهای همه جا تولید کنید. به طور مداوم از مهارت های اصطکاک استفاده کنید در
                    حالی که روابط تاکتیکی. هنوز سوالی دارید؟ با ما تماس بگیرید
                  </p>
                </div>
              </div>
            </div>
            <div className="row align-items-center">
              <div className="col-md-12 col-lg-6 mb-5 mb-md-5 mb-sm-5 mb-lg-0">
                <div className="img-wrap">
                  <img src="assets/img/health.png" alt="دانلود" className="img-fluid" />
                </div>
              </div>
              <div className="col-md-12 col-lg-6">
                <div id="accordion" className="accordion faq-wrap">
                  <div className="card mb-3">
                    <a className="card-header " data-toggle="collapse" href="#collapse0" aria-expanded="false">
                      <h6 className="mb-0 d-inline-block">به کدام مجوز نیاز دارم؟</h6>
                    </a>
                    <div id="collapse0" className="collapse show" data-parent="#accordion">
                      <div className="card-body white-bg">
                        <p>
                          لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با استفاده از طراحان گرافیک است. چاپگرها و
                          متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است و برای شرایط فعلی تکنولوژی مورد نیاز و
                          کاربردهای متنوع با هدف بهبود ابزارهای کاربردی می باشد
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="card my-3">
                    <a className="card-header collapsed" data-toggle="collapse" href="#collapse1" aria-expanded="false">
                      <h6 className="mb-0 d-inline-block">چگونه می توانم به یک موضوع دسترسی پیدا کنم؟</h6>
                    </a>
                    <div id="collapse1" className="collapse " data-parent="#accordion">
                      <div className="card-body white-bg">
                        <p>
                          لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با استفاده از طراحان گرافیک است. چاپگرها و
                          متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است و برای شرایط فعلی تکنولوژی مورد نیاز و
                          کاربردهای متنوع با هدف بهبود ابزارهای کاربردی می باشد
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="card my-3">
                    <a className="card-header collapsed" data-toggle="collapse" href="#collapse2" aria-expanded="false">
                      <h6 className="mb-0 d-inline-block">چگونه سفارشات قبلی را می بینم؟</h6>
                    </a>
                    <div id="collapse2" className="collapse " data-parent="#accordion">
                      <div className="card-body white-bg">
                        <p>
                          لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با استفاده از طراحان گرافیک است. چاپگرها و
                          متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است و برای شرایط فعلی تکنولوژی مورد نیاز و
                          کاربردهای متنوع با هدف بهبود ابزارهای کاربردی می باشد
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="card mt-3">
                    <a className="card-header collapsed" data-toggle="collapse" href="#collapse3" aria-expanded="false">
                      <h6 className="mb-0 d-inline-block">مسائل مربوط به پشتیبانی از قالب؟</h6>
                    </a>
                    <div id="collapse3" className="collapse " data-parent="#accordion">
                      <div className="card-body white-bg">
                        <p>
                          لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با استفاده از طراحان گرافیک است. چاپگرها و
                          متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است و برای شرایط فعلی تکنولوژی مورد نیاز و
                          کاربردهای متنوع با هدف بهبود ابزارهای کاربردی می باشد
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="position-relative gradient-bg ptb-100">
          <div className="container">
            <div className="row align-items-center">
              <div className="col-md-6 col-lg-5 mb-4 mb-sm-4 mb-md-0 mb-lg-0">
                <div className="testimonial-heading text-white">
                  <h2 className="text-white">نظرات مشتریان شتابان</h2>
                  <p>
                    ما در شتابان همیشه به دنبال بهبود عملکرد و افزایش بهره‌وری در حمل یخچالی بوده و در این راستا همیشه شنونده
                    نظرات مشتریان این شرکت هستیم.
                  </p>
                </div>
              </div>
              <div className="col-md-6 col-lg-6">
                <div className="testimonial-content-wrap">
                  <OwlCarousel
                    className="owl-carousel owl-theme client-testimonial-1 dot-indicator testimonial-shape"
                    loop
                    margin={30}
                    nav={false}
                    dots={true}
                    responsiveClass={true}
                    autoPlay={true}
                    autoplayHoverPause={true}
                    items={1}
                  >
                    <div className="item">
                      <div className="testimonial-quote-wrap">
                        <div className="media author-info mb-3">
                          <div className="author-img mr-3">
                            <img src={require('@src/assets/images/shetaban/customer1.jpeg')} alt="مشتری" className="img-fluid" />
                          </div>
                          <div className="media-body text-white">
                            <h5 className="mb-0 text-white">آقای نعیم شکوهی</h5>
                            <span>مدیر انبارهای شرکت گوشتی کاله آمل</span>
                          </div>
                          <i className="fas fa-quote-right text-white"></i>
                        </div>
                        <div className="client-say text-white">
                          <p>
                            شرکت محترم شتابان شمال فارغ از اینکه بخشی از خانواده بزرگ هولدینگ سولیکو است اما مانند هر شرکت دیگری
                            براساس توانایی و تخصص آن سنجیده می‌شود امری که شتابان با ارائه سرویس‌های منظم و با تعهد بالا، نمره
                            بسیار قابل قبولی را دریافت می‌کند.
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="item">
                      <div className="testimonial-quote-wrap">
                        <div className="media author-info mb-3">
                          <div className="author-img mr-3">
                            <img src={require('@src/assets/images/shetaban/customer2.jpg')} alt="مشتری" className="img-fluid" />
                          </div>
                          <div className="media-body text-white">
                            <h5 className="mb-0 text-white">آقای شهریار درزی</h5>
                            <span>مدیر بیزینس گوشت گروه سولیکو</span>
                          </div>
                          <i className="fas fa-quote-right text-white"></i>
                        </div>
                        <div className="client-say text-white">
                          <p>
                            از زمانی که با شرکت شتابان شمال همکاری خود را آغاز کرده‌ایم، دغدغه‌های ما در حوزه لجستیک کاملا مرتفع
                            شده و با اطمینان خاطر از تعهد شتابان کارهای مربوط به حمل و نقل را به آنها سپرده‌ایم.
                          </p>
                        </div>
                      </div>
                    </div>
                  </OwlCarousel>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="our-blog-section ptb-100 gray-light-bg">
          <div className="container">
            <div className="row justify-content-center">
              <div className="col-md-9 col-lg-8">
                <div className="section-heading text-center">
                  <h2>آخرین اخبار ما</h2>
                  <p>
                    ارتباط کاملاً مناسب ماتریس پس از پهنای باند موقعیت یابی بازار. به طور کامل مواد را به جای پارادایم های انعطاف
                    پذیر با نام تجاری در مقابل تجارت الکترونیکی مهم و مهم ، بازیابی کنید.
                  </p>
                </div>
              </div>
            </div>
            <div className="row justify-content-center">
              <div className="col-md-6 col-lg-4">
                <div className="single-blog-card card border-0 shadow-sm mt-4">
                  <div className="blog-img position-relative">
                    <img src="assets/img/blog/1.jpg" className="card-img-top" alt="وبلاگ" />
                    <div className="meta-date">
                      <strong>24 </strong>
                      <small>تیر</small>
                    </div>
                  </div>
                  <div className="card-body">
                    <div className="post-meta mb-2">
                      <ul className="list-inline meta-list">
                        <li className="list-inline-item">
                          <i className="fas fa-heart mr-2"></i>
                          <span>45</span>
                          نظر
                        </li>
                        <li className="list-inline-item">
                          <i className="fas fa-share-alt mr-2"></i>
                          <span>10 به</span>
                          اشتراک بگذارید
                        </li>
                      </ul>
                    </div>
                    <h3 className="h5 mb-2 card-title">
                      <a href="#">به طور مناسب به طور کامل تولید شود</a>
                    </h3>
                    <p className="card-text">برخی از متن های نمونه سریع برای ساختن عنوان کارت و تشکیل بخش عمده آن.</p>
                    <a href="#" className="detail-link">
                      بیشتر بخوانید <span className="ti-arrow-left"></span>
                    </a>
                  </div>
                </div>
              </div>
              <div className="col-md-6 col-lg-4">
                <div className="single-blog-card card border-0 shadow-sm mt-4">
                  <div className="blog-img position-relative">
                    <img src="assets/img/blog/2.jpg" className="card-img-top" alt="وبلاگ" />
                    <div className="meta-date">
                      <strong>24 </strong>
                      <small>تیر</small>
                    </div>
                  </div>
                  <div className="card-body">
                    <div className="post-meta mb-2">
                      <ul className="list-inline meta-list">
                        <li className="list-inline-item">
                          <i className="fas fa-heart mr-2"></i>
                          <span>45</span>
                          نظر
                        </li>
                        <li className="list-inline-item">
                          <i className="fas fa-share-alt mr-2"></i>
                          <span>10 به</span>
                          اشتراک بگذارید
                        </li>
                      </ul>
                    </div>
                    <h3 className="h5 mb-2 card-title">
                      <a href="#">سریع بک گراند را تدوین کنید</a>
                    </h3>
                    <p className="card-text">همزمان با کارآمد پس از مشارکت مشتری هدایت کنید.</p>
                    <a href="#" className="detail-link">
                      بیشتر بخوانید <span className="ti-arrow-left"></span>
                    </a>
                  </div>
                </div>
              </div>
              <div className="col-md-6 col-lg-4">
                <div className="single-blog-card card border-0 shadow-sm mt-4">
                  <div className="blog-img position-relative">
                    <img src="assets/img/blog/3.jpg" className="card-img-top" alt="وبلاگ" />
                    <div className="meta-date">
                      <strong>24 </strong>
                      <small>تیر</small>
                    </div>
                  </div>
                  <div className="card-body">
                    <div className="post-meta mb-2">
                      <ul className="list-inline meta-list">
                        <li className="list-inline-item">
                          <i className="fas fa-heart mr-2"></i>
                          <span>45</span>
                          نظر
                        </li>
                        <li className="list-inline-item">
                          <i className="fas fa-share-alt mr-2"></i>
                          <span>10 به</span>
                          اشتراک بگذارید
                        </li>
                      </ul>
                    </div>
                    <h3 className="h5 mb-2 card-title">
                      <a href="#">از نظر عینی گسترده است</a>
                    </h3>
                    <p className="card-text">رهبری منبع آزاد را به جای کاربران تحریک آمیز مشبک کنید. </p>
                    <a href="#" className="detail-link">
                      بیشتر بخوانید <span className="ti-arrow-left"></span>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="contact" className="contact-us-section ptb-100">
          <div className="container">
            <div className="row justify-content-around">
              <div className="col-12 pb-3 message-box d-none">
                <div className="alert alert-danger"></div>
              </div>
              <div className="col-md-12 col-lg-5 mb-5 mb-md-5 mb-sm-5 mb-lg-0">
                <div className="contact-us-form gray-light-bg rounded p-5">
                  <h4>برای شروع آماده هستید؟</h4>
                  <form action="#" method="POST" id="contactForm" className="contact-us-form">
                    <div className="form-row">
                      <div className="col-12">
                        <div className="form-group">
                          <input type="text" className="form-control" name="name" placeholder="نام را وارد کنید" />
                        </div>
                      </div>
                      <div className="col-12">
                        <div className="form-group">
                          <input type="email" className="form-control" name="email" placeholder="ایمیل را وارد کنید" />
                        </div>
                      </div>
                      <div className="col-12">
                        <div className="form-group">
                          <textarea name="message" id="message" className="form-control" placeholder="پیام"></textarea>
                        </div>
                      </div>
                      <div className="col-sm-12 mt-3">
                        <button type="submit" className="btn btn-brand-02" id="btnContactUs">
                          پیام فرستادن
                        </button>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
              <div className="col-md-12 col-lg-6">
                <div className="contact-us-content">
                  <h2>با ما تماس بگیرید</h2>
                  <p className="lead">مشاوران شتابان در خدمت شما هستند. </p>

                  <hr className="my-3" />

                  <ul className="contact-info-list">
                    <li className="d-flex pb-3">
                      <div className="contact-icon mr-3">
                        <span className="fas fa-location-arrow color-primary rounded-circle p-3"></span>
                      </div>
                      <div className="contact-text">
                        <h5 className="mb-1">محل شرکت</h5>
                        <p>تهران - خیابان قنبرزاده - میدان دوازدهم نیلوفر پلاک ۱۶</p>
                      </div>
                    </li>
                    <li className="d-flex pb-3">
                      <div className="contact-icon mr-3">
                        <span className="fas fa-envelope color-primary rounded-circle p-3"></span>
                      </div>
                      <div className="contact-text">
                        <h5 className="mb-1">آدرس ایمیل</h5>
                        <p>info@shetabanlogistics.com</p>
                      </div>
                    </li>
                    <li className="d-flex pb-3">
                      <div className="contact-icon mr-3">
                        <span className="fas fa-phone color-primary rounded-circle p-3"></span>
                      </div>
                      <div className="contact-text">
                        <h5 className="mb-1">تلفن تماس</h5>
                        <p>۰۲۱ - ۸۸۵۴۵۲۳۶</p>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>

      <footer className="footer-1 gradient-bg ptb-60 footer-with-newsletter">
        {/* <div className="container">
          <div className="row newsletter-wrap primary-bg rounded shadow-lg p-5">
            <div className="col-md-6 col-lg-7 mb-4 mb-md-0 mb-sm-4 mb-lg-0">
              <div className="newsletter-content text-white">
                <h3 className="mb-0 text-white">در خبرنامه ما عضو شوید</h3>
                <p className="mb-0">
                  لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با استفاده از طراحان گرافیک است.
                </p>
              </div>
            </div>
            <div className="col-md-6 col-lg-5">
              <form className="newsletter-form position-relative">
                <input
                  type="text"
                  className="input-newsletter form-control"
                  placeholder="ایمیل خود را وارد کنید"
                  name="email"
                  autocomplete="off"
                />
                <button type="submit" className="disabled">
                  <i className="fas fa-paper-plane"></i>
                </button>
              </form>
            </div>
          </div>
        </div> */}

        <div className="container">
          <div className="row">
            <div className="col-md-12 col-lg-4 mb-4 mb-md-4 mb-sm-4 mb-lg-0">
              <a href="#" className="navbar-brand mb-2">
                <img src={require('@src/assets/images/shetaban/logo.png')} alt="شتابان شمال" className="img-fluid" />
              </a>
              <br />
              <p>
                شرکت حمل و نقل سراسری شتابان شمال در سال ۱۳۸۷ با هدف ارتقای کمی و کیفی خدمات حمل و نقل در گروه سولیکو تاسیس شد.
                این شرکت پیمانکار انحصاری حمل محصولات هلدینگ سولیکو – کاله است.
              </p>
              <div className="list-inline social-list-default background-color social-hover-2 mt-2">
                <li className="list-inline-item">
                  <a className="twitter" href="#">
                    <i className="fab fa-twitter"></i>
                  </a>
                </li>
                <li className="list-inline-item">
                  <a className="youtube" href="#">
                    <i className="fab fa-youtube"></i>
                  </a>
                </li>
                <li className="list-inline-item">
                  <a className="linkedin" href="#">
                    <i className="fab fa-linkedin-in"></i>
                  </a>
                </li>
                <li className="list-inline-item">
                  <a className="dribbble" href="#">
                    <i className="fab fa-dribbble"></i>
                  </a>
                </li>
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

      <div className={'scroll-top scroll-to-target primary-bg text-white ' + scrollTopClass} data-target="html">
        <span className="fas fa-hand-point-up"></span>
      </div>
    </>
  );
};

export default Home;

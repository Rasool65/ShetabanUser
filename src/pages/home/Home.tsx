import { FunctionComponent, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import IPageProps from '../../configs/routerConfig/IPageProps';
import OwlCarousel from 'react-owl-carousel';
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';
import useHttpRequest from '@src/hooks/useHttpRequest';
import About from './About';
import { Link } from 'react-router-dom';
import { URL_DASHBOARD, URL_LOGIN } from '@src/configs/urls';
import { RootStateType } from '@src/redux/Store';

const Home: FunctionComponent<IPageProps> = (props) => {
  const generalInformationStore = useSelector((state: RootStateType) => state.generalInformation);
  const authenticationStore = useSelector((state: RootStateType) => state.authentication);

  useEffect(() => {
    document.title = props.title;
  }, [props.title]);

  return (
    <>
      <div className="main">
        <section className="position-relative ptb-100 main-bg bg-image">
          <div
            className="fit-cover background-image-wraper position-absolute"
            style={{ backgroundImage: 'url(' + require('@src/assets/images/shetaban/slide1.jpg') + ')', opacity: '1' }}
          ></div>
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
                    <Link to={authenticationStore.isAuthenticate ? URL_DASHBOARD : URL_LOGIN} className="btn btn-brand-03 btn-rounded mr-3">
                      {authenticationStore.isAuthenticate ? 'پنل کاربری' : 'وارد حساب کاربری خود شوید'}
                      <i className="fas fa-user-alt pl-2"></i>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="promo-block ptb-60">
          <div className="container">
            <div className="row justify-content-md-center">
              <div className="col-lg-4 col-md-6">
                <div className="promo-one-single rounded p-5 my-3 my-md-3 my-lg-0 shadow-lg text-center">
                  <img src={require('@src/assets/images/shetaban/bn01.jpg')} alt="promo" className="mb-4" width="200" />
                  <h5>حمل و نقل جاده‌ای</h5>
                  <p className="mb-0">
                    حمل و نقل جاده‌ای یخچالی تخصص ماست. شتابان با حمل بیش از ۴۰ میلیون تن بار یخچالی در خدمت شما است.{' '}
                  </p>
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

        <section className="bg-image ptb-100" image-overlay="8">
          <div
            className="background-image-wraper"
            style={{ backgroundImage: 'url(' + require('@src/assets/images/shetaban/cover1.jpg') + ')', opacity: '0.7' }}
          ></div>
          <div className="container">
            <div className="row justify-content-center">
              <div className="col-md-9 col-lg-8">
                <div className="section-heading text-center mb-1 text-white">
                  <h2 className="text-white">سریع، ایمن و قابل اعتماد در سراسر ایران</h2>
                  <p>خدمات حمل یخچالی مطمئن در سراسر کشور</p>
                  <div className="action-btns mt-4">
                    <ul className="list-inline">
                      <li className="list-inline-item">
                        <a href="#contact" className="d-flex align-items-center app-download-btn btn btn-brand-02 btn-rounded">
                          <span className="fa fa-phone icon-size-sm mr-3"></span>
                          <div className="download-text text-left">
                            <small>تماس با ما</small>
                            <h5 className="mb-0">در ارتباط با شما</h5>
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

        <About />

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

        <section id="contact" className="contact-us-section ptb-100">
          <div className="container">
            <div className="row justify-content-around">
              <div className="col-12 pb-3 message-box d-none">
                <div className="alert alert-danger"></div>
              </div>

              <div className="col-md-12 col-lg-12">
                <div className="contact-us-content">
                  <h2>تماس با ما</h2>
                  <p className="lead" style={{ fontSize: '17px' }}>
                    {generalInformationStore.description}
                  </p>

                  <hr className="my-3" />

                  <ul className="contact-info-list">
                    <li className="d-flex pb-3">
                      <div className="contact-icon mr-3">
                        <span className="fas fa-location-arrow color-primary rounded-circle p-3"></span>
                      </div>
                      <div className="contact-text">
                        <h5 className="mb-1">محل شرکت</h5>
                        <p>{generalInformationStore.address}</p>
                      </div>
                    </li>
                    <li className="d-flex pb-3">
                      <div className="contact-icon mr-3">
                        <span className="fas fa-envelope color-primary rounded-circle p-3"></span>
                      </div>
                      <div className="contact-text">
                        <h5 className="mb-1">آدرس ایمیل</h5>
                        <p>{generalInformationStore.email}</p>
                      </div>
                    </li>
                    <li className="d-flex pb-3">
                      <div className="contact-icon mr-3">
                        <span className="fas fa-phone color-primary rounded-circle p-3"></span>
                      </div>
                      <div className="contact-text">
                        <h5 className="mb-1">تلفن تماس</h5>
                        <p>{generalInformationStore.tel1}</p>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default Home;

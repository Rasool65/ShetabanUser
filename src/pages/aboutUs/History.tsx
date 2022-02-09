import IPageProps from '@src/configs/routerConfig/IPageProps';
import { FunctionComponent, useEffect, useRef, useState } from 'react';
import { Col, Container, Row } from 'reactstrap';
import OwlCarousel from 'react-owl-carousel';
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';
import useHttpRequest from '@src/hooks/useHttpRequest';
import { APIURL_GET_COMPANIES, APIURL_GET_PAGES_TYPE } from '@src/configs/apiConfig/apiUrls';
import { IOutputResult } from '@src/models/output/IOutputResult';
import { IHistoryModel } from './../../models/output/history/IHistoryModel';
import { ICompaniesModel } from './../../models/output/history/ICompaniesModel';

const History: FunctionComponent<IPageProps> = (props) => {
  const { getRequest } = useHttpRequest();
  const [history, setHistory] = useState<any>({
    id: 0,
    title: '',
    summery: '',
    body: '',
    dynamicPageType: 0,
  });

  const [companies, setCompanies] = useState<any>([
    {
      name: '',
      slug: '',
      description: '',
      logo: '',
      lang: '',
      brandLink: '',
      urlTarget: '',
    },
  ]);

  const getHistory = () => {
    getRequest<IOutputResult<IHistoryModel>>(`${APIURL_GET_PAGES_TYPE}?DynamicPageType=0`).then((result) => {
      setHistory(result.data.data);
    });
  };

  const getBrand = () => {
    getRequest<IOutputResult<ICompaniesModel>>(APIURL_GET_COMPANIES).then((result) => {
      setCompanies(result.data.data);
    });
  };
  useEffect(() => {
    getHistory();
    getBrand();
    console.log(companies);
    document.title = props.title;
  }, [props.title]);

  return (
    <>
      <div className="main">
        <section className="page-header-section ptb-100 bg-image" image-overlay="8">
          <div className="background-image-wraper" style={{ background: "url('assets/img/slider-bg-1.jpg')", opacity: '1' }} />
          <div className="container">
            <div className="row align-items-center">
              <div className="col-md-9 col-lg-7">
                <div className="page-header-content text-white pt-4">
                  <h1 className="text-white mb-0">درباره ما</h1>
                  <p className="lead">
                    لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با استفاده از طراحان گرافیک است.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
        <div className="breadcrumb-bar gray-light-bg border-bottom">
          <div className="container">
            <div className="row">
              <div className="col-12">
                <div className="custom-breadcrumb">
                  <ol className="breadcrumb pl-0 mb-0 bg-transparent">
                    <li className="breadcrumb-item">
                      <a href="#">خانه</a>
                    </li>
                    <li className="breadcrumb-item">
                      <a href="#">صفحات</a>
                    </li>
                    <li className="breadcrumb-item active">درباره ما</li>
                  </ol>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="overflow-hidden">
          <section id="about" className="position-relative overflow-hidden feature-section ptb-100  ">
            <div className="container">
              <div className="row align-items-center justify-content-between">
                <div className="col-md-12 col-lg-6">
                  <div className="feature-contents section-heading">
                    <h2>{history.title}</h2>
                    <p>{history.body}</p>

                    <ul className="check-list-wrap list-two-col py-3">
                      <li>بررسی کیفیت داده ها</li>
                      <li>محیط کار ایمن</li>
                      <li>پشتیبانی 24x7</li>
                      <li>به روزرسانی ها</li>
                      <li>تیم مدیریت</li>
                      <li>پشتیبانی فنی</li>
                      <li>ادغام آماده است</li>
                      <li>متن ساختگی</li>
                      <li>سازگاری محور فرایند</li>
                      <li>مدیریت نیروی کار</li>
                    </ul>

                    <div className="action-btns mt-4">
                      <a href="#" className="btn btn-brand-02 mr-3">
                        اکنون شروع کنید{' '}
                      </a>
                      <a href="#" className="btn btn-outline-brand-02">
                        بیشتر بدانید
                      </a>
                    </div>
                  </div>
                </div>
                <div className="col-md-6 col-lg-6">
                  <div className="">
                    <img src="assets/img/Capture.PNG" className="img-fluid" alt="درباره ما" />
                    <div className="item-icon video-promo-content">
                      <a
                        href="https://www.youtube.com/watch?v=9No-FiEInLA"
                        className="popup-youtube video-play-icon text-center m-auto"
                      >
                        <span className="ti-control-play"></span>{' '}
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
        <section className="position-relative overflow-hidden ptb-100">
          <div className="container">
            <div className="row">
              <div className="col-sm-6 col-md-6 col-lg-3">
                <div className="bg-white p-5 rounded shadow count-data text-center mt-4">
                  <span className="fas fa-users  color-primary icon-size-lg mb-2"></span>
                  <h3 className="count-number mb-1 color-secondary font-weight-bolder">21023</h3>
                  <h6 className="mb-0">مشتریان</h6>
                </div>
              </div>
              <div className="col-sm-6 col-md-6 col-lg-3">
                <div className="bg-white p-5 rounded shadow count-data text-center mt-4">
                  <span className="fas fa-cloud-download-alt  color-primary icon-size-lg mb-2"></span>
                  <h3 className="count-number mb-1 color-secondary font-weight-bolder">44023</h3>
                  <h6 className="mb-0">بارگیری ها</h6>
                </div>
              </div>
              <div className="col-sm-6 col-md-6 col-lg-3">
                <div className="bg-white p-5 rounded shadow count-data text-center mt-4">
                  <span className="fas fa-smile  color-primary icon-size-lg mb-2"></span>
                  <h3 className="count-number mb-1 color-secondary font-weight-bolder">35023</h3>
                  <h6 className="mb-0">رضایت مشتری</h6>
                </div>
              </div>
              <div className="col-sm-6 col-md-6 col-lg-3">
                <div className="bg-white p-5 rounded shadow count-data text-center mt-4">
                  <span className="fas fa-mug-hot  color-primary icon-size-lg mb-2"></span>
                  <h3 className="count-number mb-1 color-secondary font-weight-bolder">2323</h3>
                  <h6 className="mb-0">فنجان قهوه</h6>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="client-section  ptb-100">
          <div className="container">
            <div className="row justify-content-center">
              <div className="col-md-8">
                <div className="section-heading text-center mb-5">
                  <h2>مشتریان ارزشمند ما</h2>
                  <p>
                    منابع شفاف داخلی و یا منابع شفاف در حالی که منابع در حال مکیدن تجارت الکترونیکی هستند. به راحتی نوآورانه قانع
                    کننده داخلی.
                  </p>
                </div>
              </div>
            </div>
            <div className="row align-items-center">
              <div className="col-md-12">
                <div className="owl-carousel owl-theme clients-carousel dot-indicator owl-loaded owl-drag">
                  <div className="owl-stage-outer">
                    <div
                      className="owl-stage"
                      style={{ transform: `translated(-1875px, 0px, 0px)`, transition: `all 4.5s linear 0s`, width: '3750px' }}
                    >
                      {!!companies
                        ? companies.map((brand: any) => {
                            return (
                              <a href={brand.brandLink} target={brand.urlTarget}>
                                <div className="owl-item cloned" style={{ width: '172.5px', marginRight: '15px' }}>
                                  <div className="item single-customer">
                                    <img src={brand.logo} alt={brand.name} className="customer-logo" />
                                  </div>
                                </div>
                              </a>
                            );
                          })
                        : 'برندی ثبت نشده است'}
                    </div>
                  </div>
                  <div className="owl-nav disabled">
                    <button type="button" role="presentation" className="owl-prev">
                      <span aria-label="Previous">‹</span>
                    </button>
                    <button type="button" role="presentation" className="owl-next">
                      <span aria-label="Next">›</span>
                    </button>
                  </div>
                  <div className="owl-dots disabled"></div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default History;

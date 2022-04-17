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
import parse from 'html-react-parser';
import { BASE_URL } from '@src/configs/apiConfig/apiBaseUrl';

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
    document.title = props.title;
  }, []);

  return (
    <>
      <div className="main">
        <section className="page-header-section ptb-100 bg-image" image-overlay="1">
          <div
            className="background-image-wraper"
            style={{
              backgroundImage: 'url(' + require('@src/assets/images/shetaban/slide1.jpg') + ')',
              opacity: '1',
            }}
          />
          <div className="container">
            <div className="row align-items-center">
              <div className="col-md-9 col-lg-7">
                <div className="page-header-content text-white pt-4">
                  <h1 className="text-white mb-0">تاریخچه شرکت شتابان شمال</h1>
                  <p className="lead">{history.summery}</p>
                </div>
              </div>
            </div>
          </div>
        </section>
        <div className="overflow-hidden">
          <section id="about" className="position-relative overflow-hidden feature-section ptb-100  ">
            <div className="container">
              <div className="row align-items-center justify-content-between">
                <div className="col-md-12 col-lg-6">
                  <div className="feature-contents section-heading section-bg">
                    {/* <div className="html-body-container">{parse(history.body)}</div> */}
                    <p className="html-body-container">{history.body}</p>
                    <ul className="check-list-wrap list-two-col py-3">
                      <li>۱۲ سال تجربه</li>
                      <li>۶ شعبه در سراسر کشور</li>
                      <li>عقد قرارداد با SLA مشخص</li>
                      <li>ناوگان مجهز به GPS</li>
                      <li>حمل ۳۰ میلیون تن بار</li>
                      <li>طی بیش از ۵۰ میلیون کیلومتر</li>
                      <li>پاسخ‌گویی ۲۴ ساعته</li>
                      <li>مجهز به مرکز کنترل و هدایت</li>
                    </ul>
                  </div>
                </div>
                <div className="col-md-6 col-lg-6">
                  <div style={{ width: '400px', marginRight: '70px' }}>
                    <img src={require('@src/assets/images/shetaban/s01.png')} className="img-fluid" alt="درباره ما" />
                    {/* <div className="item-icon video-promo-content">
                      <a
                        href="https://www.youtube.com/watch?v=9No-FiEInLA"
                        className="popup-youtube video-play-icon text-center m-auto"
                      >
                        <span className="ti-control-play"></span>{' '}
                      </a>
                    </div> */}
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
                  <span className="fas fa-truck  color-primary icon-size-lg mb-2"></span>
                  <h3 className="count-number mb-1 color-secondary font-weight-bolder">300+</h3>
                  <h6 className="mb-0">کشنده سنگین</h6>
                </div>
              </div>
              <div className="col-sm-6 col-md-6 col-lg-3">
                <div className="bg-white p-5 rounded shadow count-data text-center mt-4">
                  <span className="fas fa-mobile color-primary icon-size-lg mb-2"></span>
                  <h3 className="count-number mb-1 color-secondary font-weight-bolder">700+</h3>
                  <h6 className="mb-0">دستگاه ایسوزو</h6>
                </div>
              </div>
              <div className="col-sm-6 col-md-6 col-lg-3">
                <div className="bg-white p-5 rounded shadow count-data text-center mt-4">
                  <span className="fas fa-road  color-primary icon-size-lg mb-2"></span>
                  <h3 className="count-number mb-1 color-secondary font-weight-bolder">50+</h3>
                  <h6 className="mb-0">میلیون کیلومتر پیمایش</h6>
                </div>
              </div>
              <div className="col-sm-6 col-md-6 col-lg-3">
                <div className="bg-white p-5 rounded shadow count-data text-center mt-4">
                  <span className="fas fa-cube  color-primary icon-size-lg mb-2"></span>
                  <h3 className="count-number mb-1 color-secondary font-weight-bolder">30+</h3>
                  <h6 className="mb-0">میلیون تن بار حمل شده</h6>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="client-section  ptb-100">
          <div className="container">
            <div className="row justify-content-center">
              <div className="col-md-8">
                <div className="section-heading text-center mb-5 section-bg">
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
                {/* <div
                  className="owl-stage"
                  style={{ transform: 'translated(-1875px, 0px, 0px)', transition: `all 4.5s linear 0s`, width: '3750px' }}
                > */}
                <div
                  style={{ display: "flex" }}
                  className=""
                >
                  {companies.map((brand: any) => {
                    return brand.brandLink ? (
                      <div className="owl-stage-outer">
                        <a href={brand.brandLink} target={brand.urlTarget}>
                          <div className="item single-customer">
                            <div>
                              <img src={`${BASE_URL + brand.logo}`} className="customer-logo" />
                            </div>
                          </div>
                        </a>
                      </div>
                    ) : (
                      <div className="owl-stage-outer">
                        <div className="item single-customer">
                          <div>
                            <img src={`${BASE_URL + brand.logo}`} className="customer-logo" />
                          </div>
                        </div>
                      </div>
                    );
                  })}
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

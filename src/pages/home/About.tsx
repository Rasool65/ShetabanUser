import { FunctionComponent } from 'react';

const About: FunctionComponent = () => {
  return (
    <>
      <section id="about" className="work-process-section position-relative  ptb-100 ">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-md-9 col-lg-8">
              <div className="text-center mb-5 about">
                <h2>درباره ما</h2>
                <p>
                  شرکت حمل و نقل سراسری شتابان شمال در سال ۱۳۸۷ با هدف ارتقای کمی و کیفی خدمات حمل و نقل در گروه سولیکو تاسیس شد.
                  این شرکت پیمانکار انحصاری حمل محصولات هلدینگ سولیکو – کاله است و محصولات شرکت‌های کاله، پمینا، بهاران گل، گوشتی
                  آمل، آریس، سوربن و غیره را از نقاط مختلف به سراسر ایران و کشورهای حاشیه خلیج فارس، کشورهای حوزه CIS و GIS‌حمل
                  می‌کند.{' '}
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
                <img src={require('@src/assets/images/shetaban/s01.png')} alt="امکانات" className="img-fluid" />
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default About;

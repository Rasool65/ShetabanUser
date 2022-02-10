import IPageProps from '@src/configs/routerConfig/IPageProps';
import { FunctionComponent, useEffect, useState } from 'react';
import { Col, Container, Row } from 'reactstrap';
import { ILoginPage, LoginPages } from './ILoginProp';

const LoginLayout: FunctionComponent<IPageProps> = (props) => {
  const [currentPageIndex, setCurrentPageIndex] = useState<number>(0);
  const [currentPage, setCurrentPage] = useState<ILoginPage>(LoginPages[0]);
  const [mobile, setMobile] = useState<string>();
  const [remainingTimeSeconds, setRemainingTimeSeconds] = useState<number>(0);

  const changePage = (pageIndex: number, mobile: string, remainingTimeSeconds: number = 0) => {
    setMobile(mobile);
    setCurrentPageIndex(pageIndex);
    setRemainingTimeSeconds(remainingTimeSeconds);
    setCurrentPage(LoginPages[pageIndex]);
  };

  useEffect(() => {
    document.title = currentPage.title;
  }, [currentPage.title]);

  return (
    <>
      <section className="page-header-section ptb-100 bg-image full-height transparent-bg" image-overlay="8">
        <div
          className="background-image-wraper"
          style={{ backgroundImage: 'url(' + require('@src/assets/images/shetaban/login-bg.jpg') + ')', opacity: '1' }}
        ></div>
        <Container>
          <Row className="align-items-center justify-content-center ">
            <Col sm={12} md={8} lg={6} className="login-box">
              {currentPageIndex > 0 ? (
                <button
                  type="button"
                  className="back-btn"
                  onClick={() => {
                    changePage(0, '');
                  }}
                >
                  <span className="fa fa-angle-right"></span>
                </button>
              ) : (
                ''
              )}
              <div className="login-signup-wrap p-5 rounded shadow">
                <div className="login-signup-header text-center">
                  <a href="/">
                    <img src={require('@src/assets/images/shetaban/logo.png')} className="img-fluid mb-3" alt="شتابان" />
                  </a>
                  <h4 className="mb-2">{currentPage.title}</h4>
                  <h5>{mobile}</h5>
                </div>
                <currentPage.component
                  pageIndex={currentPageIndex}
                  remainingTimeSeconds={remainingTimeSeconds}
                  mobile={mobile}
                  changePage={changePage}
                />
              </div>
            </Col>
          </Row>
          <Row className="justify-content-center">
            <Col md={8} lg={6}>
              <div className="copyright-wrap small-text text-center mt-5 text-white">
                <p className="mb-0">© شرکت شتابان شمال، کلیه حقوق محفوظ است</p>
              </div>
            </Col>
          </Row>
        </Container>
      </section>
    </>
  );
};

export default LoginLayout;

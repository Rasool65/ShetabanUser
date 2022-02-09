import IPageProps from '@src/configs/routerConfig/IPageProps';
import { FunctionComponent, useEffect, useRef } from 'react';
import { Col, Container, Row } from 'reactstrap';
import OwlCarousel from 'react-owl-carousel';
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';

import slide1 from '@src/assets/images/banner/banner-2.jpg';
import slide2 from '@src/assets/images/banner/banner-3.jpg';
import slide3 from '@src/assets/images/banner/banner-4.jpg';

const Dashboard: FunctionComponent<IPageProps> = (props) => {
  useEffect(() => {
    document.title = props.title;
  }, [props.title]);

  return (
    <>
      <Container className="page-panel">
        <Row>
          <Col lg={8}>
            <div className="container-fluid">
              <OwlCarousel
                className="owl-theme"
                loop={true}
                margin={8}
                nav={false}
                dots={true}
                responsiveClass={true}
                autoplay={true}
                autoplayHoverPause={true}
                items={1}
                rtlClass="owl-rtl"
              >
                <div className="item">
                  <Col>
                    <img src={slide1} />
                  </Col>
                </div>
                <div className="item">
                  <Col>
                    <img src={slide2} />
                  </Col>
                </div>
                <div className="item">
                  <Col>
                    <img src={slide3} />
                  </Col>
                </div>
              </OwlCarousel>
            </div>
          </Col>
          <Col lg={4}>
            <Col className="short-report">
              <span className="fa fa-list-alt icon"></span>
              <div className="text">10 درخواست</div>
            </Col>
            <Col className="short-report">
              <span className="fa fa-user icon"></span>
              <div className="text">25 کاربر جدید</div>
            </Col>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Dashboard;

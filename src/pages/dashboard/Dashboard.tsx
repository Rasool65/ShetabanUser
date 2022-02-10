import IPageProps from '@src/configs/routerConfig/IPageProps';
import { FunctionComponent, useEffect, useRef } from 'react';
import { Col, Container, Row } from 'reactstrap';
import OwlCarousel from 'react-owl-carousel';
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';

import slide1 from '@src/assets/images/shetaban/m_slide1.jpg';
import slide2 from '@src/assets/images/shetaban/m_slide2.jpg';
import slide3 from '@src/assets/images/shetaban/m_slide3.jpg';
import { Link } from 'react-router-dom';

const Dashboard: FunctionComponent<IPageProps> = (props) => {
  useEffect(() => {
    document.title = props.title;
  }, [props.title]);

  return (
    <>
      <OwlCarousel
        className="owl-theme dashboard-slide"
        loop={true}
        // margin={8}
        nav={false}
        dots={true}
        responsiveClass={true}
        autoplay={true}
        autoplayHoverPause={true}
        items={1}
        rtlClass="owl-rtl"
      >
        <div className="item">
          <img src={slide1} />
        </div>
        <div className="item">
          <img src={slide2} />
        </div>
        <div className="item">
          <img src={slide3} />
        </div>
      </OwlCarousel>
      <Container>
        <Row>
          <Col className="shortcut-btn">
            <Link to={''} className="bg-1">
              <span className="fa fa-plus"></span>
              ثبت درخواست جدید
            </Link>
            <Link to={''} className="bg-2">
              <span className="fa fa-file"></span>
              گزارش درخواست ها
            </Link>
            <Link to={''} className="bg-3">
              <span className="fa fa-print"></span>
              چاپ گزارش
            </Link>
            <Link to={''} className="bg-4">
              <span className="fa fa-user"></span>
              پروفایل کاربری
            </Link>
          </Col>
        </Row>
      </Container>
      <Container className="page-panel"></Container>
    </>
  );
};

export default Dashboard;

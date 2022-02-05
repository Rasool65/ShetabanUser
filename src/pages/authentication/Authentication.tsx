import { useState } from 'react';
import { Col, Row } from 'reactstrap';
import Login from './Login';
import ResetPassword from './ResetPassword';

export const AuthPages = [
  {
    id: 0,
    Component: Login,
  },

  {
    id: 1,
    Component: ResetPassword,
  },
];

const Auth = () => {
  const [CurrentPage, setCurrentPage] = useState(AuthPages[1]);

  return (
    <section className="page-header-section ptb-100 bg-image full-height" image-overlay="8">
      <div className="background-image-wraper" style={{ background: 'url("assets/img/cta-bg.jpg")', opacity: 1 }}></div>
      <div className="container">
        <Row className="align-items-center justify-content-center">
          <Col sm={12} md={8} lg={6}>
            <CurrentPage.Component changePage={setCurrentPage} />
          </Col>
        </Row>
      </div>
    </section>
  );
};

export default Auth;

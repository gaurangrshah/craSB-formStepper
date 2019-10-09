import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';

import Header from './Layout/Header/Header';
import Footer from './Layout/Footer/Footer';
import Navbar from './Layout/NavBar/navBar';

const Layout = ({ children, pageInfo }) => (
  <>
    <Container fluid className="px-0 main">
      <Header siteTitle="GS SANDBOX" />
      <Navbar pageInfo={pageInfo} />
      <Row noGutters>
        <Col>
          <Container className="mt-5">
            <main>{children}</main>
          </Container>
        </Col>
      </Row>
    </Container>
    <Footer />
  </>
);

export default Layout;

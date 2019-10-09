import React from "react";
import { Container, Row, Col } from "react-bootstrap";

const Footer = () => {
  return (
    <Container fluid className="px-0">
      <Row noGutters>
        <Col className="footer-col">
          <footer>
            <span>
              © {new Date().getFullYear()}, Built for
              {` `}
              <a href="https://www.gshahdev.com">GshahDev</a>
            </span>
          </footer>
        </Col>
      </Row>
    </Container>
  );
};

export default Footer;

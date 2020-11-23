import React from 'react';
import { Container, Row, Col } from 'reactstrap';
import styled from 'styled-components';

const FooterTop = styled.div`
  height: 80px;
  display: grid;
  grid-template-columns: 3fr 1fr;
  font-size: 14px;

  i {
    margin-right: 14px;
  }
`;

const Brand = styled.div`
  font-size: 28px;
  font-weight: 600;
`;

const Footer = () => {
  return (
    <React.Fragment>
      <footer className="footer">
        <Container fluid={true}>
          <FooterTop>
            <Brand>Tming</Brand>
            <div>
              <div>Contact us</div>
              <div>
                <i class="far fa-envelope"></i>
                <span>swmaestroccjam@gmail.com</span>
              </div>
            </div>
          </FooterTop>
          <Row>
            <Col md={6}>{new Date().getFullYear()} © Tming.</Col>
            <Col md={6}>
              <div className="text-sm-right d-none d-sm-block">
                Design & Develop by CCJAM
              </div>
            </Col>
          </Row>
        </Container>
      </footer>
    </React.Fragment>
  );
};

export default Footer;

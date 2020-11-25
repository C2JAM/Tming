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
  const year = new Date().getFullYear();
  return (
    <>
      <footer className="footer">
        <Container fluid="true">
          <FooterTop>
            <Brand>Tming</Brand>
            <div>
              <div>Contact us</div>
              <div>
                <i className="far fa-envelope" />
                <span>swmaestroccjam@gmail.com</span>
              </div>
            </div>
          </FooterTop>
          <Row>
            <Col md={6}>
              <span>{year}</span>
              <span> © Tming.</span>
            </Col>
            <Col md={6}>
              <div className="text-sm-right d-none d-sm-block">
                Design & Develop by CCJAM
              </div>
            </Col>
          </Row>
        </Container>
      </footer>
    </>
  );
};

export default Footer;

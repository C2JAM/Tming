import React from 'react';
import styled from 'styled-components';

const Brand = styled.div`
  font-size: 28px;
  font-weight: 600;
`;

const Footer = styled.footer`
  display: flex;
  flex-direction: column;
  background-color: #222831;
  padding: 50px 5vw 50px 5vw;

  .footer-top {
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
  }

  .footer-bottom {
    display: flex;
    height: 100px;
    justify-content: space-between;
    align-items: flex-end;
  }
`;

function Index() {
  const year = new Date().getFullYear();

  return (
    <>
      <Footer>
        <div className="footer-top">
          <Brand>Tming</Brand>
          <div>
            <div>Contact us</div>
            <div>
              <i className="far fa-envelope" />
              <span>swmaestroccjam@gmail.com</span>
            </div>
          </div>
        </div>
        <div className="footer-bottom">
          <div>
            <span>{year}</span>
            <span> © Tming.</span>
          </div>
          <div>
            <div className="text-sm-right d-none d-sm-block">
              Design & Develop by CCJAM
            </div>
          </div>
        </div>
      </Footer>
    </>
  );
}

export default Index;

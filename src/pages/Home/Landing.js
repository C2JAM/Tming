import React from 'react';
import styled from 'styled-components';
import Fade from 'react-reveal/Fade';
import { LangProvider } from '../../components/Languages/languages';

import LandingImage1 from '../../assets/images/home/landing/landing_1.svg';
import LandingImage2 from '../../assets/images/home/landing/landing_2.png';

const LandingWrapper = styled.div`
  padding: 150px 30px 30px 30px;
  display: flex;
  flex-direction: column;
  width: 92vw;

  h1 {
    color: #bcd9f1;
  }

  p {
    font-size: 16px;
  }

  img {
    width: 200px;
  }

  .landing-box__right {
    display: flex;
    align-items: center;
    justify-content: space-around;
    margin-bottom: 120px;
  }

  .landing-box__left {
    display: flex;
    align-items: center;
    justify-content: space-around;
    margin-bottom: 120px;
  }

  .landing-box__description {
    width: 30vw;
  }
`;

class Landing extends React.Component {
  render() {
    return (
      <React.Fragment>
        <LandingWrapper>
          <Fade bottom>
            <div className="landing-box__right">
              <div className="landing-box__description">
                <h1>
                  <LangProvider LangKey="landing_box_1_title" />
                </h1>
                <p>
                  <LangProvider LangKey="landing_box_1_description" />
                </p>
              </div>
              <img src={LandingImage1} />
            </div>
          </Fade>
          <Fade bottom>
            <div className="landing-box__left">
              <img src={LandingImage2} />
              <div className="landing-box__description">
                <h1>
                  <LangProvider LangKey="landing_box_2_title" />
                </h1>
                <p>
                  <LangProvider LangKey="landing_box_2_description" />
                </p>
              </div>
            </div>
          </Fade>
          {/* <Fade bottom>
                        <div className="landing-box__right">
                            <div className="landing-box__description">
                            <h1><LangProvider LangKey="landing_box_3_title" /></h1>
                                <p><LangProvider LangKey="landing_box_3_description" /></p>
                            </div>    
                            <img src={LandingImage3}/>
                        </div>
                    </Fade> */}
        </LandingWrapper>
      </React.Fragment>
    );
  }
}

export default Landing;

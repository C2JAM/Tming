import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import styled, { keyframes } from 'styled-components';

// actions
import { changeLanguage, connectToTwitchChat } from '../../store/actions';

// language
import { LangProvider } from '../../components/Languages/languages';

// assets
import WaveImage from '../../assets/images/login/wave.svg';
import DownWaveImage from '../../assets/images/login/down_wave.svg';
import LogoImage from '../../assets/images/logo/tming_logo.png';

const animate = keyframes`
    0%, 100% {
        transform: scale(1, .05);
    }
    5%,
    95% {
        transform: scale(1, 1);
    }
`;

const LogoWrapper = styled.div`
  margin: 0 0 0 40px;
  display: flex;
  align-items: center;
  top: 20px;
  left: 30px;
  position: fixed;

  h1 {
    margin: 0 0 3px 10px;
    color: #33a6dd;
    font-size: 28px;
    font-weight: 600;
  }

  img {
    width: 45px;
  }

  .logo-eye__1,
  .logo-eye__2 {
    width: 4px;
    height: 8px;
    background-color: #37a5da;
    animation: ${animate} 5s infinite;
  }

  .logo-eye__1 {
    position: absolute;
    top: 12px;
    left: 22px;
  }

  .logo-eye__2 {
    position: absolute;
    top: 12px;
    left: 31px;
  }
`;

const BrowserWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100vw;
  height: 100vh;
  overflow: hidden;
`;

const LoginWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-left: 20vw;
  z-index: 10;
  color: rgba(33, 39, 53, 0.9);
`;

const LoginBox = styled.div`
  width: 60vw;
`;

const TextMain = styled.div`
  font-size: 24px;

  .login-box__strong {
    font-size: 28px;
    font-weight: 500;
  }
`;

const TextSub = styled.div`
  display: flex;
  align-items: center;
`;

const Separator = styled.div`
  width: 2px;
  height: 24px;
  border-left: 2px solid rgba(33, 39, 53, 0.9);
  margin: 0px 10px;
`;

const Line = styled.hr`
  border-color: rgba(33, 39, 53, 0.9);
  border-width: 2px;
`;

const Wave1 = keyframes`
    0% {
        background-position-x: 0;
    }
    100% {
        background-position-x: 1000px;
    }
`;

const Wave2 = keyframes`
    0% {
        background-position-x: 0;
    }
    100% {
        background-position-x: 2000px;
    }
`;

const Wave3 = keyframes`
    0% {
        background-position-x: 0;
    }
    100% {
        background-position-x: 3000px;
    }
`;

const Wave4 = keyframes`
    0% {
        background-position-x: 0;
    }
    100% {
        background-position-x: -2000px;
    }
`;

const BackWaves = styled.div`
  position: fixed;
  top: 30vh + 30px;
  left: 0;
  opacity: 0.8;
  background-color: #0099ff;
  height: 380px;
  width: 100vw;
  z-index: -1;

  .down-wave {
    position: absolute;
    top: 100%;
    width: 100vw;
    height: 100px;
    background: url(${DownWaveImage});
    background-size: repeat;
    z-index: 2;
  }

  .wave {
    position: absolute;
    bottom: 100%;
    width: 100vw;
    height: 100px;
    background: url(${WaveImage});
    background-size: repeat;
    z-index: 2;
  }
  .wave1 {
    animation: ${Wave1} 30s linear infinite;
    animation-delay: 0s;
    opacity: 1;
  }
  .wave2 {
    animation: ${Wave2} 30s linear infinite;
    opacity: 0.4;
    animation-delay: 0s;
  }
  .wave3 {
    animation: ${Wave3} 30s linear infinite;
    animation-delay: -5s;
    opacity: 0.7;
  }
  .wave4 {
    animation: ${Wave4} 30s linear infinite;
    animation-delay: 0s;
    opacity: 0.5;
  }
`;

const LanguageSelector = styled.div`
  position: absolute;
  top: 25px;
  right: 40px;
`;

function Index({
  lang: Lang,
  changeLanguage: ChangeLanguage,
  connectToTwitchChat: dispatchConnectToTwitchChat,
}) {
  const [twitchId, setTwitchId] = useState('');
  const history = useHistory();

  function onChangeLanguage(event) {
    const { value: nextLang } = event.target;
    ChangeLanguage(nextLang);
  }

  function onChangeTwitchId(event) {
    const { value: newTwitchId } = event.target;
    setTwitchId(newTwitchId);
  }

  function onClickStartButton() {
    dispatchConnectToTwitchChat(twitchId);
    history.push('/vote');
  }

  return (
    <>
      <BrowserWrapper>
        <LogoWrapper>
          <img src={LogoImage} alt="" />
          <div className="logo-eye__1" />
          <div className="logo-eye__2" />
          <h1>TMING</h1>
        </LogoWrapper>
        <LoginWrapper>
          <LanguageSelector>
            <select
              name="languages"
              id="language"
              value={Lang}
              onChange={onChangeLanguage}
            >
              {/*  eslint-disable-next-line */}
              <option value="en">🇺🇸 English</option>
              {/*  eslint-disable-next-line */}
              <option value="ko">🇰🇷 Korean</option>
            </select>
          </LanguageSelector>
          <BackWaves>
            <div className="wave wave1" />
            <div className="wave wave2" />
            <div className="wave wave3" />
            <div className="wave wave4" />
            <div className="down-wave wave1" />
            <div className="down-wave wave2" />
            <div className="down-wave wave3" />
            <div className="down-wave wave4" />
          </BackWaves>
          <LoginBox>
            <TextMain>
              <p>
                <div className="login-box__strong">
                  <LangProvider LangKey="login_title" />
                </div>
              </p>
              <p>
                <LangProvider LangKey="login_description_1" />
              </p>
              <p>
                <LangProvider LangKey="login_description_2" />
              </p>
              <Line />
            </TextMain>
            <TextSub>
              <input
                value={twitchId}
                onChange={onChangeTwitchId}
                placeholder="트위치 아이디 입력"
              />
              <Separator />
              <button type="button" onClick={onClickStartButton}>
                시작
              </button>
            </TextSub>
          </LoginBox>
        </LoginWrapper>
      </BrowserWrapper>
    </>
  );
}

Index.propTypes = {
  lang: PropTypes.string.isRequired,
  changeLanguage: PropTypes.func.isRequired,
  connectToTwitchChat: PropTypes.func.isRequired,
};

const mapStateToProps = state => {
  return {
    lang: state.lang,
  };
};

const mapDispatchToProps = { changeLanguage, connectToTwitchChat };

export default connect(mapStateToProps, mapDispatchToProps)(Index);

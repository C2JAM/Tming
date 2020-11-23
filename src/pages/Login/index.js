import React from "react";
import { Component } from "react";
import styled, { keyframes } from "styled-components";
import { LangProvider } from "../../components/Languages/languages";
import Cookies from "react-cookies";

import ProfileImage from "../../assets/images/profile-img-modified.png";
import WaveImage from "../../assets/images/login/wave.svg";
import DownWaveImage from "../../assets/images/login/down_wave.svg";
import LoginButton from "./LoginButton";
import LogoImage from "../../assets/images/logo/tming_logo.png";

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

const ALink = styled.a`
    font-size: 16px;
    color: rgba(255, 255, 255, 0.7);
    transition: all 0.1s ease-in-out;
    &:hover {
        color: rgba(33, 39, 53, 0.7);
    }
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

const Profile = styled.img`
    position: absolute;
    width: 625px;
    right: 60px;
    bottom: 0;
    z-index: -1;
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

class LoginPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            lang: window.localStorage.getItem("lang"),
        };
    }

    changeLanguage = (event) => {
        const lang = event.target.value;
        window.localStorage.setItem("lang", lang);
        this.setState({ lang: lang });
        window.location.href = "#";
    };

    handleClick = () => {};

    render() {
        return (
            <React.Fragment>
                <BrowserWrapper>
                    <LogoWrapper>
                        <img src={LogoImage} alt="" />
                        <div className="logo-eye__1"></div>
                        <div className="logo-eye__2"></div>
                        <h1>TMING</h1>
                    </LogoWrapper>
                    <LoginWrapper>
                        <LanguageSelector>
                            <select
                                name="languages"
                                id="language"
                                onChange={this.changeLanguage}
                                value={this.state.lang}
                                onClick={() => window.gtag("event", "setLanguage")}
                            >
                                <option value="en">🇺🇸 English</option>
                                <option value="ko">🇰🇷 Korean</option>
                            </select>
                        </LanguageSelector>
                        <BackWaves>
                            <div className="wave wave1"></div>
                            <div className="wave wave2"></div>
                            <div className="wave wave3"></div>
                            <div className="wave wave4"></div>
                            <div className="down-wave wave1"></div>
                            <div className="down-wave wave2"></div>
                            <div className="down-wave wave3"></div>
                            <div className="down-wave wave4"></div>
                        </BackWaves>
                        <Profile src={ProfileImage} />
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
                                <LoginButton handleClick={this.handleClick} />
                                <Separator />
                                <ALink
                                    onClick={() => {
                                        window.gtag("event", "goLandigPage");
                                        window.open(
                                            "https://tming.tv",
                                            "PopupWin",
                                            "width=3000,height=3000"
                                        );
                                    }}
                                >
                                    <LangProvider LangKey="login_description_3" />
                                </ALink>
                            </TextSub>
                        </LoginBox>
                    </LoginWrapper>
                </BrowserWrapper>
            </React.Fragment>
        );
    }
}

export default LoginPage;

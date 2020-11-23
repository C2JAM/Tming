import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import styled, { keyframes } from "styled-components";
import classname from "classnames";
import { LangProvider } from "../Languages/languages";
import SweetAlert from "react-bootstrap-sweetalert";
import LogoImage from "../../assets/images/logo/tming_logo.png";

// Redux Store
import { toggleRightSidebar } from "../../store/actions";

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
    position: relative;

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
        right: 18px;
    }

    .logo-eye__2 {
        position: absolute;
        top: 12px;
        right: 9px;
    }
`;

const Icon = styled.i`
    &:hover {
        color: white;
    }
`;

class Header extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isVoteToggle: false,
            isWordCloudToggle: false,
            isManualToggle: false,
            lang: window.localStorage.getItem("lang"),
            logoutAlert: false,
        };
        this.toggleFullscreen = this.toggleFullscreen.bind(this);
    }

    toggleFullscreen() {
        if (
            !document.fullscreenElement &&
            /* alternative standard method */ !document.mozFullScreenElement &&
            !document.webkitFullscreenElement
        ) {
            // current working methods
            if (document.documentElement.requestFullscreen) {
                document.documentElement.requestFullscreen();
            } else if (document.documentElement.mozRequestFullScreen) {
                document.documentElement.mozRequestFullScreen();
            } else if (document.documentElement.webkitRequestFullscreen) {
                document.documentElement.webkitRequestFullscreen(Element.ALLOW_KEYBOARD_INPUT);
            }
        } else {
            if (document.cancelFullScreen) {
                document.cancelFullScreen();
            } else if (document.mozCancelFullScreen) {
                document.mozCancelFullScreen();
            } else if (document.webkitCancelFullScreen) {
                document.webkitCancelFullScreen();
            }
        }
    }

    changeLanguage = (event) => {
        const lang = event.target.value;
        window.localStorage.setItem("lang", lang);
        this.setState({ lang: lang });
        window.location.href = "";
    };

    logout = () => {
        this.setState({ logoutAlert: true });
    };

    refreshPage = () => {
        window.location.reload();
    };

    showMenu = (menu) => {
        this.setState({
            isVoteToggle: false,
            isWordCloudToggle: false,
            isManualToggle: false,
            [menu]: !this.state[menu],
        });
    };

    render() {
        return (
            <React.Fragment>
                flex-end
                <div id="page-topbar">
                    <div className="navbar-header">
                        <div className="d-flex">
                            <Link to="/">
                                <LogoWrapper>
                                    <img src={LogoImage} alt="" />
                                    <div className="logo-eye__1"></div>
                                    <div className="logo-eye__2"></div>
                                </LogoWrapper>
                            </Link>

                            {/* 토글메뉴 만드는 방법 : 이걸 템플릿에서 지원하는듯 */}
                            <div className="dropdown">
                                <Link
                                    className={classname("dropdown-toggle", {
                                        dropdown__clicked: this.state.isVoteToggle,
                                    })}
                                    onClick={(e) => {
                                        e.preventDefault();
                                        this.showMenu("isVoteToggle");
                                        window.gtag("event", "realtimeVote");
                                    }}
                                >
                                    <LangProvider LangKey="real_time_voting" />
                                </Link>
                                <div
                                    className={classname("dropdown-menu", {
                                        show: this.state.isVoteToggle,
                                    })}
                                >
                                    <Link to="/voteform" className="dropdown-item">
                                        <LangProvider LangKey="setting_up_voting" />
                                    </Link>
                                    <div className="dropdown-divider"></div>
                                    <Link to="/vote" className="dropdown-item">
                                        <LangProvider LangKey="current_voting" />
                                    </Link>
                                </div>
                            </div>
                            <div className="dropdown">
                                <Link
                                    className={classname("dropdown-toggle", {
                                        dropdown__clicked: this.state.isWordCloudToggle,
                                    })}
                                    onClick={(e) => {
                                        e.preventDefault();
                                        this.showMenu("isWordCloudToggle");
                                        window.gtag("event", "wordcloud");
                                    }}
                                >
                                    <LangProvider LangKey="wordcloud" />
                                </Link>
                                <div
                                    className={classname("dropdown-menu", {
                                        show: this.state.isWordCloudToggle,
                                    })}
                                >
                                    <Link to="/wordcloudform" className="dropdown-item">
                                        <LangProvider LangKey="wordcloud_setting" />
                                    </Link>
                                </div>
                            </div>
                            <div className="dropdown">
                                <Link
                                    className={classname("dropdown-toggle", {
                                        dropdown__clicked: this.state.isManualToggle,
                                    })}
                                    onClick={(e) => {
                                        e.preventDefault();
                                        this.showMenu("isManualToggle");
                                    }}
                                >
                                    <LangProvider LangKey="how_to_use" />
                                </Link>
                                <div
                                    className={classname("dropdown-menu", {
                                        show: this.state.isManualToggle,
                                    })}
                                >
                                    <Link to="/manualVote" className="dropdown-item">
                                        <LangProvider LangKey="manual_item_1" />
                                    </Link>
                                    <div className="dropdown-divider"></div>
                                    <Link to="/manualWordcloud" className="dropdown-item">
                                        <LangProvider LangKey="manual_item_2" />
                                    </Link>
                                </div>
                            </div>
                        </div>

                        <div className="d-flex">
                            <div className="dropdown d-lg-inline-block ml-1">
                                <div className="header-item">
                                    <select
                                        name="languages"
                                        id="language"
                                        onChange={this.changeLanguage}
                                        value={this.state.lang}
                                    >
                                        <option value="en">🇺🇸 English</option>
                                        <option value="ko">🇰🇷 Korean</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </React.Fragment>
        );
    }
}

const mapStatetoProps = (state) => {
    const { layoutType } = state.Layout;
    return { layoutType };
};

export default connect(mapStatetoProps, { toggleRightSidebar })(Header);

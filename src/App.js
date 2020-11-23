import React, { Component } from "react";
import { Switch, BrowserRouter as Router } from "react-router-dom";
import { connect } from "react-redux";
import socketio from "socket.io-client";
import { ThemeProvider, createGlobalStyle } from "styled-components";
import * as tmi from "tmi.js";
import Cookies from "react-cookies";

// Import Routes
import { authProtectedRoutes, noLayoutRoutes, publicRoutes } from "./routes/";
import AppRoute from "./routes/route";

// layouts
import HorizontalLayout from "./components/HorizontalLayout/";
import NonAuthLayout from "./components/NonAuthLayout";

// Import scss
import "./assets/scss/theme.scss";

// css 전역변수
const theme = {
    main_shadow: "0 5px 7px rgba(154,160,185,0.2), 0 15px 40px rgba(166,173,201,0.2)",
    main_color: "#9147ff",
    grey: "#36393e",
};

// 모든 css에 적용시키기
const GlobalStyle = createGlobalStyle`
`;

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            login: Cookies.load("login"),
            accessToken: Cookies.load("accessToken"),
        };
    }

    componentWillMount() {
        // 처음 방문인지 설정
        try {
            const isFirst = window.localStorage.getItem("isFirst");

            if (isFirst === null) {
                window.localStorage.setItem("isFirst", "yes");
            }
        } catch (err) {
            console.error(err);
        }

        // 초기 언어 설정
        try {
            let lang = window.localStorage.getItem("lang");

            if (lang === null) {
                if (navigator.language) {
                    lang = navigator.language.substring(0, 2).toLowerCase();
                } else {
                    lang = "en";
                }
                // 초기 설정값이 없으면 브라우저의 언어로 설정하자.
                window.localStorage.setItem("lang", lang);
            }
        } catch (err) {
            console.error(err);
        }

        // 서버의 트위치 챗봇 연결
        try {
            fetch("/api/v1/bot/create", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                redirect: "follow",
                body: JSON.stringify({
                    login: this.state.login,
                    accessToken: this.state.accessToken,
                }),
            });
        } catch (err) {
            console.error(err);
        }

        // 클라이언트의 트위치 챗봇 연결
        try {
            this.client = new tmi.Client({
                connection: {
                    secure: true,
                    reconnect: true,
                },
                channels: [`${this.state.login}`],
            });

            //트위치 챗봇 연결
            this.client.connect();
        } catch (err) {
            console.error(err);
        }

        // 클라이언트의 소켓 생성
        try {
            this.socket = socketio.connect("http://127.0.0.1:5000");
            this.socket.on("connect", () => {
                console.log("client-to-express socket is created!");
            });
        } catch (err) {
            console.error(err);
        }
    }

    componentWillUnmount() {
        this.socket.disconnect();
        this.client.disconnect();
    }

    render() {
        return (
            <React.Fragment>
                <GlobalStyle></GlobalStyle>
                <ThemeProvider theme={theme}>
                    <Router>
                        <Switch>
                            {publicRoutes.map((route, idx) => (
                                <AppRoute
                                    path={route.path}
                                    layout={HorizontalLayout}
                                    component={route.component}
                                    key={idx}
                                    isAuthProtected={false}
                                    socket={this.socket}
                                    isLayout={false}
                                    client={this.client}
                                />
                            ))}

                            {noLayoutRoutes.map((route, idx) => (
                                <AppRoute
                                    path={route.path}
                                    // 레이아웃을 false로 처리
                                    layout={NonAuthLayout}
                                    component={route.component}
                                    key={idx}
                                    isAuthProtected={false}
                                    socket={this.socket}
                                    isLayout={false}
                                    client={this.client}
                                />
                            ))}

                            {authProtectedRoutes.map((route, idx) => (
                                <AppRoute
                                    path={route.path}
                                    layout={HorizontalLayout}
                                    component={route.component}
                                    key={idx}
                                    isAuthProtected={true}
                                    socket={this.socket}
                                    isLayout={true}
                                    client={this.client}
                                />
                            ))}
                        </Switch>
                    </Router>
                </ThemeProvider>
            </React.Fragment>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        layout: state.Layout,
    };
};

export default connect(mapStateToProps, null)(App);

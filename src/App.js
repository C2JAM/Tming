import React, { useState, useEffect } from 'react';
import { Switch, BrowserRouter as Router } from 'react-router-dom';
import { connect } from 'react-redux';
import * as tmi from 'tmi.js';
import Cookies from 'react-cookies';

// Import Routes
import {
  authProtectedRoutes,
  noLayoutRoutes,
  publicRoutes,
} from './routes/index';
import AppRoute from './routes/route';

// layouts
import HorizontalLayout from './components/HorizontalLayout';
import NonAuthLayout from './components/NonAuthLayout';

// Import scss
import './assets/scss/theme.scss';

function App() {
  useEffect(() => {
    // 초기 언어 설정
    try {
      let lang = window.localStorage.getItem('lang');

      if (lang === null) {
        if (navigator.language) {
          lang = navigator.language.substring(0, 2).toLowerCase();
        } else {
          lang = 'en';
        }
        // 초기 설정값이 없으면 브라우저의 언어로 설정하자.
        window.localStorage.setItem('lang', lang);
      }
    } catch (err) {
      console.error(err);
    }

    // 서버의 트위치 챗봇 연결
    try {
      fetch('/api/v1/bot/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        redirect: 'follow',
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

      // 트위치 챗봇 연결
      this.client.connect();
    } catch (err) {
      console.error(err);
    }

    return () => {
      this.client.disconnect();
    };
  }, []);

  return (
    <>
      <Router>
        <Switch>
          {publicRoutes.map((route, idx) => (
            <AppRoute
              path={route.path}
              layout={HorizontalLayout}
              component={route.component}
              key={idx}
              isAuthProtected={false}
              isLayout={false}
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
              isLayout={false}
            />
          ))}

          {authProtectedRoutes.map((route, idx) => (
            <AppRoute
              path={route.path}
              layout={HorizontalLayout}
              component={route.component}
              key={idx}
              isAuthProtected={true}
              isLayout={true}
            />
          ))}
        </Switch>
      </Router>
    </>
  );
}

const mapStateToProps = state => {
  return {
    layout: state.Layout,
  };
};

export default connect(mapStateToProps, null)(App);

import React, { useEffect } from 'react';
import { Switch, BrowserRouter as Router } from 'react-router-dom';
import { connect } from 'react-redux';
import { nanoid } from 'nanoid';
import PropTypes from 'prop-types';

// actions
import { changeLanguage } from './store/actions';

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
import './assets/scss/index.scss';

function App({ lang: Lang, changeLanguage: ChangeLanguage }) {
  useEffect(() => {
    // 초기 언어 설정
    try {
      let tmpLang = window.localStorage.getItem('lang');

      if (tmpLang === null) {
        // 초기 설정값이 없으면 브라우저의 언어로 설정하자.
        if (navigator.language) {
          tmpLang = navigator.language.substring(0, 2).toLowerCase();
        }

        switch (tmpLang) {
          case 'en':
            tmpLang = 'en';
            break;
          case 'ko':
            tmpLang = 'ko';
            break;
          default:
            tmpLang = 'en';
            break;
        }
      }

      ChangeLanguage(tmpLang);
    } catch (err) {
      console.error(err);
    }
  }, []);

  return (
    <>
      <Router>
        <Switch>
          {publicRoutes.map(route => (
            <AppRoute
              path={route.path}
              layout={HorizontalLayout}
              component={route.component}
              key={nanoid()}
              isAuthProtected={false}
              isLayout={false}
            />
          ))}

          {noLayoutRoutes.map(route => (
            <AppRoute
              path={route.path}
              // 레이아웃을 false로 처리
              layout={NonAuthLayout}
              component={route.component}
              key={nanoid()}
              isAuthProtected={false}
              isLayout={false}
            />
          ))}

          {authProtectedRoutes.map(route => (
            <AppRoute
              path={route.path}
              layout={HorizontalLayout}
              component={route.component}
              key={nanoid()}
              isAuthProtected
              isLayout
            />
          ))}
        </Switch>
      </Router>
    </>
  );
}

App.propTypes = {
  lang: PropTypes.string.isRequired,
  changeLanguage: PropTypes.func.isRequired,
};

const mapStateToProps = state => {
  return {
    lang: state.lang,
  };
};

const mapDispatchToProps = { changeLanguage };

export default connect(mapStateToProps, mapDispatchToProps)(App);

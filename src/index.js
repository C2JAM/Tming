import React from 'react';
import ReactDOM from 'react-dom';
import { Helmet } from 'react-helmet';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';

import App from './App';

import store from './store';

const app = (
  <Provider store={store}>
    <Helmet>
      <title>Tming</title>
    </Helmet>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>
);

ReactDOM.render(app, document.getElementById('root'));

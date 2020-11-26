// @flow
import { CHANGE_LANGUAGE } from './actionTypes';

const INIT_STATE = {
  lang: 'en',
};

const Layout = (state = INIT_STATE, action) => {
  switch (action.type) {
    case CHANGE_LANGUAGE:
      return {
        ...state,
        lang: action.payload,
      };
    default:
      return state;
  }
};

export default Layout;

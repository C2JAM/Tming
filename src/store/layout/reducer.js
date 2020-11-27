import tmi from 'tmi.js';

import { CHANGE_LANGUAGE, CONNECT_TO_TWITCH_CHAT } from './actionTypes';

const INIT_STATE = {
  lang: 'en',
  twitchChat: new tmi.Client({
    connection: {
      reconnect: true,
      secure: true,
    },
  }),
  twitchId: '',
};

const Layout = (state = INIT_STATE, action) => {
  switch (action.type) {
    case CHANGE_LANGUAGE:
      return {
        ...state,
        lang: action.payload,
      };
    case CONNECT_TO_TWITCH_CHAT:
      return {
        ...state,
        twitchId: action.payload,
      };
    default:
      return state;
  }
};

export default Layout;

import {
  CHANGE_LANGUAGE,
  CHANGE_TWITCH_ID,
  CONNECT_TO_TWITCH_CHAT,
  START_VOTE,
  END_VOTE,
} from './actionTypes';

const INIT_STATE = {
  lang: window.localStorage.getItem('lang'),
  twitchChat: {},
  twitchId: window.localStorage.getItem('twitchId'),
  isVoting: window.localStorage.getItem('isVoting'),
};

const Layout = (state = INIT_STATE, action) => {
  switch (action.type) {
    case CHANGE_LANGUAGE:
      return {
        ...state,
        lang: action.payload,
      };
    case CHANGE_TWITCH_ID:
      return {
        ...state,
        twitchId: action.payload,
      };
    case CONNECT_TO_TWITCH_CHAT:
      return {
        ...state,
        twitchChat: action.payload,
      };
    case START_VOTE:
      return {
        ...state,
        isVoting: true,
      };
    case END_VOTE:
      return {
        ...state,
        isVoting: false,
      };
    default:
      return state;
  }
};

export default Layout;

import { CHANGE_LANGUAGE, CONNECT_TO_TWITCH_CHAT } from './actionTypes';

export const changeLanguage = lang => ({
  type: CHANGE_LANGUAGE,
  payload: lang,
});

export const connectToTwitchChat = lang => ({
  type: CONNECT_TO_TWITCH_CHAT,
  payload: lang,
});

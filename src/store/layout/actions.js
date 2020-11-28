import {
  CHANGE_LANGUAGE,
  CHANGE_TWITCH_ID,
  CONNECT_TO_TWITCH_CHAT,
  START_VOTE,
  END_VOTE,
} from './actionTypes';

export const changeLanguage = lang => ({
  type: CHANGE_LANGUAGE,
  payload: lang,
});

export const changeTwitchId = twitchId => ({
  type: CHANGE_TWITCH_ID,
  payload: twitchId,
});

export const connectToTwitchChat = twitchChat => ({
  type: CONNECT_TO_TWITCH_CHAT,
  payload: twitchChat,
});

export const startVote = () => ({
  type: START_VOTE,
});

export const endVote = () => ({
  type: END_VOTE,
});

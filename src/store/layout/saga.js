// @flow
import { all, fork, takeEvery, select } from 'redux-saga/effects';

import { CHANGE_LANGUAGE, CONNECT_TO_TWITCH_CHAT } from './actionTypes';

/**
 * Changes the site language
 * @param {string} payload.lang
 */
function* changeLanguage({ payload: lang }) {
  yield window.localStorage.setItem('lang', lang);
}

/**
 * Connect to twitch chat server
 * @param {string} payload.twitchId
 */
function* connectToTwitchServer({ payload: twitchId }) {
  const {
    Layout: { twitchChat: client },
  } = yield select();

  yield client.connect().catch(err => console.warn(err));

  const channels = yield client.getChannels().map(value => value.substr(1));

  yield channels.forEach(value => client.part(value));
  yield client.join(twitchId).catch(err => console.warn(err));
  window.localStorage.setItem('twitchId', twitchId);

  yield client.on('message', (channel, tags, message, self) => {
    if (self) return;
    console.warn(message);
  });
}

/**
 * Watchers
 */
export function* watchChangeLanguage() {
  yield takeEvery(CHANGE_LANGUAGE, changeLanguage);
}

export function* watchConnectToTwitchServer() {
  yield takeEvery(CONNECT_TO_TWITCH_CHAT, connectToTwitchServer);
}

function* LayoutSaga() {
  yield all([fork(watchChangeLanguage), fork(watchConnectToTwitchServer)]);
}

export default LayoutSaga;

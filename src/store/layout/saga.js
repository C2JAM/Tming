// @flow
import { all, fork, takeEvery, select } from 'redux-saga/effects';

import {
  CHANGE_LANGUAGE,
  CHANGE_TWITCH_ID,
  CONNECT_TO_TWITCH_CHAT,
  START_VOTE,
  END_VOTE,
} from './actionTypes';

function vote(tags, message) {
  const msgArr = message.split(' ');

  console.log(msgArr);
  if (msgArr[0] !== '!vote' && msgArr[0] !== '!투표') return;
}

/**
 * Changes the site language
 * @param {string} payload.lang
 */
function* changeLanguage({ payload: lang }) {
  yield window.localStorage.setItem('lang', lang);
}

function* changeTwitchID({ payload: twitchID }) {
  yield window.localStorage.setItem('twitchId', twitchID);
}

/**
 * Connect to twitch chat server
 * @param {string} payload.twitchId
 */
function* connectToTwitchServer({ payload: twitchChat }) {
  const {
    Layout: { twitchChat: prevTwitchChat },
  } = yield select();

  try {
    yield prevTwitchChat.disconnect();
  } catch (err) {
    console.error(err);
  } finally {
    const twitchId = window.localStorage.getItem('twitchId');

    yield twitchChat.connect().catch(err => console.warn(err));
    yield twitchChat.join(twitchId);

    yield twitchChat.on('message', (channel, tags, message, self) => {
      if (self) return;
      // Vote
      if (window.localStorage.getItem('isVoting') === 'true') {
        vote(tags, message);
      }
    });
  }
}

/**
 * Start vote
 */
function* startVote() {
  yield window.localStorage.setItem('isVoting', true);
}

/**
 * End vote
 */
function* endVote() {
  yield window.localStorage.setItem('isVoting', false);
}

/**
 * Watchers
 */
export function* watchChangeLanguage() {
  yield takeEvery(CHANGE_LANGUAGE, changeLanguage);
}

export function* watchChangeTwitchID() {
  yield takeEvery(CHANGE_TWITCH_ID, changeTwitchID);
}

export function* watchConnectToTwitchServer() {
  yield takeEvery(CONNECT_TO_TWITCH_CHAT, connectToTwitchServer);
}

export function* watchStartVote() {
  yield takeEvery(START_VOTE, startVote);
}

export function* watchEndVote() {
  yield takeEvery(END_VOTE, endVote);
}

function* LayoutSaga() {
  yield all([
    fork(watchChangeLanguage),
    fork(watchChangeTwitchID),
    fork(watchConnectToTwitchServer),
    fork(watchStartVote),
    fork(watchEndVote),
  ]);
}

export default LayoutSaga;

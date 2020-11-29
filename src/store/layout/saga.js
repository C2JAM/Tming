// @flow
import { all, fork, takeEvery } from 'redux-saga/effects';

import {
  CHANGE_LANGUAGE,
  CHANGE_TWITCH_ID,
  START_VOTE,
  END_VOTE,
} from './actionTypes';

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
    fork(watchStartVote),
    fork(watchEndVote),
  ]);
}

export default LayoutSaga;

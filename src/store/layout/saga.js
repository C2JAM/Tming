// @flow
import { all, fork, takeEvery } from 'redux-saga/effects';

import { CHANGE_LANGUAGE } from './actionTypes';

/**
 * Changes the site language
 * @param {string} payload.lang
 */
function* changeLanguage({ payload: lang }) {
  yield window.localStorage.setItem('lang', lang);
}

/**
 * Watchers
 */
export function* watchChangeLanguage() {
  yield takeEvery(CHANGE_LANGUAGE, changeLanguage);
}

function* LayoutSaga() {
  yield all([fork(watchChangeLanguage)]);
}

export default LayoutSaga;

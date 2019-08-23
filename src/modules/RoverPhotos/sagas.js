// Реализуйте саги
import { takeEvery, select, put, call, fork } from 'redux-saga/effects';
import { fetchPhotosRequest, fetchPhotosSuccess, fetchPhotosFailure, changeSol } from './actions';
import { getPhotos } from './api';
import { getApiKey } from '../Auth';

function* fetchPhotos() {
  yield takeEvery(fetchPhotosRequest, fetchPhotosFlow);
}

export function* fetchPhotosFlow(action) {
  const apiKey = yield select(getApiKey);
  const { sol, name } = action.payload;

  try {
    const result = yield call(getPhotos, apiKey, name, sol);
    const { photos } = result;

    yield put(fetchPhotosSuccess({photos, name, sol}));
    yield put(changeSol(sol))
  } catch ({ message }) {
    yield put(fetchPhotosFailure(message));
  }
}

export default function*() {
  yield fork(fetchPhotos);
}

import { call, put, takeLatest } from 'redux-saga/effects';
import { register as registerApi } from '@domain/api';
import { setLoading } from '@containers/App/actions';
import { REGISTER_REQUEST } from './constants';
import { registerFailure } from './actions';

function* register(action) {
  yield put(setLoading(true));
  try {
    const response = yield call(registerApi, action.payload);
    window.location.href = '/login';
  } catch (e) {
    console.log(e.response.data.message);
    yield put(registerFailure(e.response.data.message));
  } finally {
    yield put(setLoading(false));
  }
}

export function* registerSaga() {
  yield takeLatest(REGISTER_REQUEST, register);
}

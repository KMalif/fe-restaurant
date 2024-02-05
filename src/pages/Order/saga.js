import { call, put, takeLatest } from 'redux-saga/effects';
import { getOrder } from '@domain/api';
import { setLoading } from '@containers/App/actions';
import { GET_ORDER } from './constants';
import { error, setOrder } from './actions';

function* doGetOrder() {
  yield put(setLoading(true));
  try {
    const response = yield call(getOrder);
    yield put(setOrder(response));
  } catch (e) {
    yield put(error(e.response.data.message));
  } finally {
    yield put(setLoading(false));
  }
}

export function* orderSaga() {
  yield takeLatest(GET_ORDER, doGetOrder);
}

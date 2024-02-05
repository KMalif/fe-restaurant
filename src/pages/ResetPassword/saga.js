import { call, put, takeLatest } from 'redux-saga/effects';
import Swal from 'sweetalert2';

import { resetPassword as resetApi } from '@domain/api';

import { setLoading } from '@containers/App/actions';

import { resetFailure } from './actions';
import { RESET_REQUEST } from './constants';

function* resetPassword({ payload }) {
  const resetSuccess = () => {
    Swal.fire({
      icon: 'success',
      title: 'Reset Password',
      text: 'Password successfully changed.',
    });
    setTimeout(() => {
      Swal.close();
      window.location.href = '/login';
    }, 3000);
  };
  yield put(setLoading(true));
  try {
    const response = yield call(resetApi, payload.token, payload.data);
    yield call(resetSuccess());
  } catch (e) {
    yield put(resetFailure(e.response.data.message));
  } finally {
    yield put(setLoading(false));
  }
}

export function* resetSaga() {
  yield takeLatest(RESET_REQUEST, resetPassword);
}

import { call, put, takeLatest } from 'redux-saga/effects';
import { forgotPassword as forgotApi } from '@domain/api';
import { forgotFailure } from './actions';
import { setLoading } from '@containers/App/actions';
import { FORGOT_REQUEST } from './constants';
import Swal from 'sweetalert2';

function* forgotPassword(action) {
  const forgotSuccess = () => {
    Swal.fire({
      icon: 'success',
      title: 'We have already sent link to your email',
      text: 'Check your email to reset your password',
    });
    setTimeout(() => {
      Swal.close();
      window.location.href = '/forgot-password';
    }, 3000);
  };

  yield put(setLoading(true));
  try {
    const response = yield call(forgotApi, action.payload);
    yield call(forgotSuccess());
  } catch (e) {
    yield put(forgotFailure(e.response.data.message));
  } finally {
    yield put(setLoading(false));
  }
}

export function* forgotSaga() {
  yield takeLatest(FORGOT_REQUEST, forgotPassword);
}

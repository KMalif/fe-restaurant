import { call, put, takeLatest } from 'redux-saga/effects';
import { getManageOrder, serveMenu } from '@domain/api';
import { setLoading } from '@containers/App/actions';
import { GET_MANAGE_ORDER, SET_SERVE_MENU } from './constants';
import { error, setManageOrder } from './actions';
import Swal from 'sweetalert2';

function* doGetManageOrder() {
  yield put(setLoading(true));
  try {
    const response = yield call(getManageOrder);

    yield put(setManageOrder(response));
  } catch (e) {
    yield put(error(e.response.data.message));
  } finally {
    yield put(setLoading(false));
  }
}

function* doServeMenu(action) {
  function* serveSuccess() {
    try {
      Swal.fire({
        title: 'Serve Successful',
        icon: 'success',
        showConfirmButton: false,
      });
      setTimeout(() => {
        Swal.close();
        window.location.reload();
      }, 2000);
    } catch (error) {
      yield put(error(error.message));
    }
  }
  yield put(setLoading(true));
  try {
    const response = yield call(serveMenu, action.payload);
    yield call(serveSuccess);
  } catch (e) {
    yield put(error(e.response.data.message));
  } finally {
    yield put(setLoading(false));
  }
}
export function* manageOrderSaga() {
  yield takeLatest(GET_MANAGE_ORDER, doGetManageOrder);
  yield takeLatest(SET_SERVE_MENU, doServeMenu);
}

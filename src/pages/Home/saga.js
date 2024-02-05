import { call, put, takeLatest } from 'redux-saga/effects';
import { deleteMenu, getAllMenu } from '@domain/api';
import { setLoading } from '@containers/App/actions';
import { DELETE_MENU, GET_ALL_MENUS } from './constants';
import Swal from 'sweetalert2';
import { setAllMenus } from './actions';

function* deleteSuccess() {
  Swal.fire({
    title: 'Delete Successful',
    icon: 'success',
    showConfirmButton: false,
  });
  setTimeout(() => {
    Swal.close();
    window.location.reload();
  }, 2000);
}

function* deleteError(message) {
  Swal.fire({
    title: message,
    icon: 'error',
    showConfirmButton: false,
  });
  setTimeout(() => {
    Swal.close();
  }, 2000);
}
function* doGetAllMenus() {
  yield put(setLoading(true));
  try {
    const response = yield call(getAllMenu);
    yield put(setAllMenus(response));
  } catch (e) {
    yield put(showPopup());
  } finally {
    yield put(setLoading(false));
  }
}
function* doDeleteMenu(action) {
  yield put(setLoading(true));
  try {
    yield call(deleteMenu, action.payload);
    yield call(deleteSuccess);
  } catch (e) {
    yield call(deleteError, e.response.data.message);
  } finally {
    yield put(setLoading(false));
  }
}

export function* homeSaga() {
  yield takeLatest(GET_ALL_MENUS, doGetAllMenus);
  yield takeLatest(DELETE_MENU, doDeleteMenu);
}

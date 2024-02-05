import { call, put, takeLatest } from 'redux-saga/effects';
import { createMenu, editMenu, getCategory, getMenuID } from '@domain/api';
import { setLoading } from '@containers/App/actions';
import { GET_CATEGORY, SET_CREATE_MENU } from './constants';
import { error, setCategory } from './actions';
import Swal from 'sweetalert2';

function* doGetCategory() {
  yield put(setLoading(true));
  try {
    const category = yield call(getCategory);
    yield put(setCategory(category));
  } catch (e) {
    yield put(error(e.response.data.message));
  } finally {
    yield put(setLoading(false));
  }
}

function* doCreateMenu({ payload }) {
  function* createSuccess() {
    try {
      Swal.fire({
        title: 'Create Successful',
        icon: 'success',
        showConfirmButton: false,
      });
      setTimeout(() => {
        Swal.close();
        window.location.href = '/';
      }, 2000);
    } catch (error) {
      yield put(error(error.message));
    }
  }
  yield put(setLoading(true));
  try {
    const { formDataObj } = payload;
    const response = yield call(createMenu, formDataObj);
    yield call(createSuccess);
  } catch (e) {
    yield put(error(e.response.data.message));
  } finally {
    yield put(setLoading(false));
  }
}
export function* createMenuSaga() {
  yield takeLatest(GET_CATEGORY, doGetCategory);
  yield takeLatest(SET_CREATE_MENU, doCreateMenu);
}

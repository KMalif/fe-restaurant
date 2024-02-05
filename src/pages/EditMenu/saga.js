import { call, put, takeLatest } from 'redux-saga/effects';
import { editMenu, getCategory, getMenuID } from '@domain/api';
import { setLoading } from '@containers/App/actions';
import { GET_MENU_ID, SET_EDIT_MENU } from './constants';
import { error, setCategory, setMenuID } from './actions';
import Swal from 'sweetalert2';

function* doGetMenuID(action) {
  yield put(setLoading(true));
  try {
    const response = yield call(getMenuID, action.payload);

    const category = yield call(getCategory);
    yield put(setCategory(category));
    yield put(setMenuID(response));
  } catch (e) {
    yield put(error(e.response.data.message));
  } finally {
    yield put(setLoading(false));
  }
}

function* doEditMenu({ payload }) {
  function* editSuccess() {
    try {
      Swal.fire({
        title: 'Edit Successful',
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
    const { id, formDataObj } = payload;
    console.log(formDataObj, '<<<<ACTION');
    // const response = yield call(editMenu, id, action.payload.id.formDataObj);
    const response = yield call(editMenu, id, formDataObj);
    yield call(editSuccess);
  } catch (e) {
    yield put(error(e.response.data.message));
  } finally {
    yield put(setLoading(false));
  }
}
export function* editMenuSaga() {
  yield takeLatest(GET_MENU_ID, doGetMenuID);
  yield takeLatest(SET_EDIT_MENU, doEditMenu);
}

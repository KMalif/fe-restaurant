import { basketSaga } from '@pages/Basket/saga';
import { createMenuSaga } from '@pages/CreateMenu/saga';
import { editMenuSaga } from '@pages/EditMenu/saga';
import { forgotSaga } from '@pages/ForgotPassword/saga';
import { homeSaga } from '@pages/Home/saga';
import { loginSaga } from '@pages/Login/saga';
import { manageOrderSaga } from '@pages/ManageOrder/saga';
import { orderSaga } from '@pages/Order/saga';
import { registerSaga } from '@pages/Register/saga';
import { resetSaga } from '@pages/ResetPassword/saga';
import { all } from 'redux-saga/effects';

export default function* rootSaga() {
  yield all([
    loginSaga(),
    registerSaga(),
    forgotSaga(),
    resetSaga(),
    homeSaga(),
    basketSaga(),
    orderSaga(),
    manageOrderSaga(),
    editMenuSaga(),
    createMenuSaga(),
  ]);
}

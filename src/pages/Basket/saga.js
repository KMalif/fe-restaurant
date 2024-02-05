import { call, put, takeLatest } from 'redux-saga/effects';
import { notificationMidtrans, payment } from '@domain/api';
import Swal from 'sweetalert2';
import { error, setBasket } from './actions';
import { setLoading } from '@containers/App/actions';
import { PAYMENT_SUCCESS, SET_PAYMENT_REQUEST } from './constants';
import PendingIcon from '@static/images/pendingIcon.png';

function* doPayment(action) {
  function* paymentPending() {
    Swal.fire({
      title: 'Your payment is being processed',
      text: 'Please complete your payment',
      imageUrl: PendingIcon,
      imageWidth: 100,
      imageHeight: 100,
      showConfirmButton: false,
      imageAlt: 'Pending image',
    });

    yield new Promise((resolve) => {
      setTimeout(() => {
        Swal.close();
        resolve();
      }, 10000);
    });
  }

  function* callSuccessNotification(token) {
    try {
      const success = yield call(notificationMidtrans, token);
      console.log(success);
      yield put(setBasket([]));

      Swal.fire({
        title: 'Payment Successful',
        text: 'Your payment has been successfully processed.',
        icon: 'success',
      }).then((result) => {
        if (result.isConfirmed) {
          window.location.href = '/order';
        }
      });
    } catch (error) {
      yield put(error(error.message));
    }
  }

  yield put(setLoading(true));
  try {
    const response = yield call(payment, action.payload);
    const { paymentUrl, token } = response;

    if (paymentUrl) {
      window.open(paymentUrl, '_blank');
    }

    yield call(paymentPending);
    yield call(callSuccessNotification, token);
  } catch (e) {
    yield put(error(e.response.data.message));
  } finally {
    yield put(setLoading(false));
  }
}

export function* basketSaga() {
  yield takeLatest(SET_PAYMENT_REQUEST, doPayment);
}

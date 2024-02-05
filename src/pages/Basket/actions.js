import { ERROR, PAYMENT_SUCCESS, SET_BASKET, SET_PAYMENT_REQUEST } from './constants';

export const setBasket = (data) => ({
  type: SET_BASKET,
  payload: data,
});

export const setPaymentRequest = (data) => ({
  type: SET_PAYMENT_REQUEST,
  payload: data,
});

export const paymentSuccess = (token) => ({
  type: PAYMENT_SUCCESS,
  token,
});

export const error = (message) => ({
  type: ERROR,
  message,
});

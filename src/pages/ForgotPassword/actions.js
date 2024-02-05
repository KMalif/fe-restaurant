import { FORGOT_REQUEST, FORGOT_FAILURE } from './constants';

export const forgotRequest = (data) => ({
  type: FORGOT_REQUEST,
  payload: data,
});

export const forgotFailure = (message) => ({
  type: FORGOT_FAILURE,
  message,
});

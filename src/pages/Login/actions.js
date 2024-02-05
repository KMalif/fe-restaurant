import { LOGIN_FAILURE, LOGIN_REQUEST } from './constants';

export const loginRequest = (data) => ({
  type: LOGIN_REQUEST,
  payload: data,
});

export const loginFailure = (message) => ({
  type: LOGIN_FAILURE,
  message,
});

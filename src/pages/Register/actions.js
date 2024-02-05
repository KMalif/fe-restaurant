import { REGISTER_REQUEST, REGISTER_FAILURE } from './constants';

export const registerRequest = (data) => ({
  type: REGISTER_REQUEST,
  payload: data,
});

export const registerFailure = (message) => ({
  type: REGISTER_FAILURE,
  message,
});

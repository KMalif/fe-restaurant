import { RESET_FAILURE, RESET_REQUEST } from './constants';

export const resetRequest = (token, data) => ({
  type: RESET_REQUEST,
  payload: { token, data },
});

export const resetFailure = (message) => ({
  type: RESET_FAILURE,
  message,
});

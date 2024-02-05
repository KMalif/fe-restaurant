import { ERROR, GET_ORDER, SET_ORDER } from './constants';

export const getOrder = () => ({
  type: GET_ORDER,
});
export const setOrder = (data) => ({
  type: SET_ORDER,
  payload: data,
});
export const error = (data) => ({
  type: ERROR,
  payload: data,
});

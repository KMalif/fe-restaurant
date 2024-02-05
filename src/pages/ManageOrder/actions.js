import { ERROR, GET_MANAGE_ORDER, SET_MANAGE_ORDER, SET_SERVE_MENU } from './constants';

export const getManageOrder = () => ({
  type: GET_MANAGE_ORDER,
});
export const setManageOrder = (data) => ({
  type: SET_MANAGE_ORDER,
  payload: data,
});
export const setServeMenu = (data) => ({
  type: SET_SERVE_MENU,
  payload: data,
});
export const error = (data) => ({
  type: ERROR,
  payload: data,
});

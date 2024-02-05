import { ERROR, GET_CATEGORY, SET_CATEGORY, SET_CREATE_MENU } from './constants';

export const getCategory = () => ({
  type: GET_CATEGORY,
});
export const setCategory = (data) => ({
  type: SET_CATEGORY,
  payload: data,
});
export const setCreateMenu = (data) => ({
  type: SET_CREATE_MENU,
  payload: data,
});
export const error = (data) => ({
  type: ERROR,
  payload: data,
});

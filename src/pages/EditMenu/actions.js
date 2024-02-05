import { ERROR, GET_CATEGORY, GET_MENU_ID, SET_CATEGORY, SET_EDIT_MENU, SET_MENU_ID } from './constants';

export const getMenuID = (data) => ({
  type: GET_MENU_ID,
  payload: data,
});
export const setMenuID = (data) => ({
  type: SET_MENU_ID,
  payload: data,
});
export const getCategory = () => ({
  type: GET_CATEGORY,
});
export const setCategory = (data) => ({
  type: SET_CATEGORY,
  payload: data,
});
export const setEditMenu = (data) => ({
  type: SET_EDIT_MENU,
  payload: data,
});
export const error = (data) => ({
  type: ERROR,
  payload: data,
});

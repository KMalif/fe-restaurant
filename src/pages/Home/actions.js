import { DELETE_MENU, GET_ALL_MENUS, SET_ALL_MENUS } from './constants';

export const getAllMenus = () => ({
  type: GET_ALL_MENUS,
});

export const deleteMenu = (data) => ({
  type: DELETE_MENU,
  payload: data,
});

export const setAllMenus = (menus) => ({
  type: SET_ALL_MENUS,
  payload: menus,
});

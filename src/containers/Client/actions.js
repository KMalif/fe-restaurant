import { LOGOUT_USER, SET_LOGIN, SET_TOKEN } from '@containers/Client/constants';

export const setLogin = (login) => ({
  type: SET_LOGIN,
  login,
});

export const setToken = (token) => ({
  type: SET_TOKEN,
  token,
});

export const logoutUser = () => {
  return {
    type: LOGOUT_USER,
  };
};

import { createSelector } from 'reselect';
import { initialState } from './reducer';

const selectLoginState = (state) => state.login || initialState;

export const selectLoginError = createSelector(selectLoginState, (state) => state.loginError);

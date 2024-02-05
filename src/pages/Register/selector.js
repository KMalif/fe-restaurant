import { createSelector } from 'reselect';
import { initialState } from './reducer';

const selectRegisterState = (state) => state.register || initialState;

export const selectRegisterError = createSelector(selectRegisterState, (state) => state.registerError);

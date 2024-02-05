import { createSelector } from 'reselect';
import { initialState } from './reducer';

const selectForgotState = (state) => state.forgotPassword || initialState;

export const selectForgotError = createSelector(selectForgotState, (state) => state.forgotError);

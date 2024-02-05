import { createSelector } from 'reselect';
import { initialState } from './reducer';

const selectResetState = (state) => state.resetPassword || initialState;

export const selectResetError = createSelector(selectResetState, (state) => state.resetError);

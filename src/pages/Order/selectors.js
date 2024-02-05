import { createSelector } from 'reselect';
import { initialState } from './reducer';

const selectOrderState = (state) => state.order || initialState;

export const selectOrder = createSelector(selectOrderState, (State) => State.order.data);
export const selectError = createSelector(selectOrderState, (State) => State.error);

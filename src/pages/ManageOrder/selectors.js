import { createSelector } from 'reselect';
import { initialState } from './reducer';

const selectManageOrderState = (state) => state.manageOrder || initialState;

export const selectManageOrder = createSelector(selectManageOrderState, (State) => State.manageOrder.data);
export const selectError = createSelector(selectManageOrderState, (State) => State.error);

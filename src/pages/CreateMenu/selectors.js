import { createSelector } from 'reselect';
import { initialState } from './reducer';

const selectCreateMenuState = (state) => state.createMenu || initialState;

export const selectCategory = createSelector(selectCreateMenuState, (State) => State.category);

export const selectError = createSelector(selectCreateMenuState, (State) => State.error);

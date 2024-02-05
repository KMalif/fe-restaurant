import { createSelector } from 'reselect';
import { initialState } from './reducer';

const selectEditMenuState = (state) => state.editMenu || initialState;

export const selectMenuID = createSelector(selectEditMenuState, (State) => State.editMenu);
export const selectCategory = createSelector(selectEditMenuState, (State) => State.category);

export const selectError = createSelector(selectEditMenuState, (State) => State.error);

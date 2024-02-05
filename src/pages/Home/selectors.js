import { createSelector } from 'reselect';
import { initialState } from './reducer';

const selectHomeState = (state) => state.home || initialState;

export const selectMenus = createSelector(selectHomeState, (homeState) => homeState.menus.data);

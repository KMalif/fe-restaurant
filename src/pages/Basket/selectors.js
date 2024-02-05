import { createSelector } from 'reselect';
import { initialState } from './reducer';

const selectBasketState = (state) => state.basket || initialState;

export const selectBaskets = createSelector(selectBasketState, (State) => State.baskets);
export const selectError = createSelector(selectBasketState, (State) => State.error);

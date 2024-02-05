import { produce } from 'immer';
import { ERROR, PAYMENT_SUCCESS, SET_BASKET, SET_PAYMENT_REQUEST } from './constants';

export const initialState = {
  baskets: [],
  error: '',
};

export const storedKey = ['baskets', 'token'];

const basketReducer = (state = initialState, action) =>
  produce(state, (draft) => {
    switch (action.type) {
      case SET_BASKET:
        draft.baskets = action.payload;
        break;
      case PAYMENT_SUCCESS:
        draft.token = action.token;
        break;
      case ERROR:
        draft.error = action.message;
        break;
    }
  });

export default basketReducer;

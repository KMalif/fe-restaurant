import { produce } from 'immer';
import { ERROR, SET_ORDER } from './constants';

export const initialState = {
  order: [],
  error: '',
};

const orderReducer = (state = initialState, action) =>
  produce(state, (draft) => {
    switch (action.type) {
      case SET_ORDER:
        draft.order = action.payload;
        break;
      case ERROR:
        draft.error = action.payload;
        break;
    }
  });

export default orderReducer;

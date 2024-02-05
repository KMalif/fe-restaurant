import { produce } from 'immer';
import { ERROR, SET_MANAGE_ORDER } from './constants';

export const initialState = {
  manageOrder: [],
  error: '',
};

const manageOrderReducer = (state = initialState, action) =>
  produce(state, (draft) => {
    switch (action.type) {
      case SET_MANAGE_ORDER:
        draft.manageOrder = action.payload;
        break;
      case ERROR:
        draft.error = action.payload;
        break;
    }
  });

export default manageOrderReducer;

import { produce } from 'immer';
import { ERROR, SET_CATEGORY } from './constants';

export const initialState = {
  category: [],
  error: '',
};

const createMenuReducer = (state = initialState, action) =>
  produce(state, (draft) => {
    switch (action.type) {
      case SET_CATEGORY:
        draft.category = action.payload.data;
        break;
      case ERROR:
        draft.error = action.payload;
        break;
    }
  });

export default createMenuReducer;

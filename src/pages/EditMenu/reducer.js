import { produce } from 'immer';
import { ERROR, SET_CATEGORY, SET_MENU_ID } from './constants';

export const initialState = {
  editMenu: {},
  category: [],
  error: '',
};

const editMenuReducer = (state = initialState, action) =>
  produce(state, (draft) => {
    switch (action.type) {
      case SET_MENU_ID:
        draft.editMenu = action.payload.data;
        break;
      case SET_CATEGORY:
        draft.category = action.payload.data;
        break;
      case ERROR:
        draft.error = action.message;
        break;
    }
  });

export default editMenuReducer;

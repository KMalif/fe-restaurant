import { produce } from 'immer';
import { SET_ALL_MENUS } from './constants';

export const initialState = {
  menus: [],
  baskets: [],
};

const homeReducer = (state = initialState, action) =>
  produce(state, (draft) => {
    switch (action.type) {
      case SET_ALL_MENUS:
        draft.menus = action.payload;
        break;
    }
  });

export default homeReducer;

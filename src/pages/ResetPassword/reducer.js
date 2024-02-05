import { produce } from 'immer';

import { RESET_FAILURE } from './constants';

export const initialState = {
  resetError: '',
};

const resetReducer = (state = initialState, action) =>
  produce(state, (draft) => {
    switch (action.type) {
      case RESET_FAILURE:
        draft.resetError = action.message;
        break;
    }
  });

export default resetReducer;

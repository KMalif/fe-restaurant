import { produce } from 'immer';

import { REGISTER_FAILURE } from './constants';

export const initialState = {
  registerError: '',
};

const registerReducer = (state = initialState, action) =>
  produce(state, (draft) => {
    switch (action.type) {
      case REGISTER_FAILURE:
        draft.registerError = action.message;
        break;
    }
  });

export default registerReducer;

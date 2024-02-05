import { produce } from 'immer';

import { FORGOT_FAILURE } from './constants';

export const initialState = {
  forgotError: '',
};

const forgotReducer = (state = initialState, action) =>
  produce(state, (draft) => {
    switch (action.type) {
      case FORGOT_FAILURE:
        draft.forgotError = action.message;
        break;
    }
  });

export default forgotReducer;

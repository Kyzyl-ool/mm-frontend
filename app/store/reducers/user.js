import { USER_AUTHORIZE_FAIL, USER_AUTHORIZE_SUCCESS } from '../actions/types';

const initialState = {
  me: {},
  authorized: null,
};

const user = (state = initialState, action) => {
  switch (action.type) {
    case USER_AUTHORIZE_SUCCESS: {
      return {
        ...state,
        me: action.payload,
        authorized: true,
      };
    }
    case USER_AUTHORIZE_FAIL: {
      return {
        ...state,
        authorized: false,
      };
    }
    default: {
      return state;
    }
  }
};

export default user;

import {
  USER_AUTHORIZE_FAIL,
  USER_AUTHORIZE_SUCCESS,
} from '../actions/types';

const initialState = {
  me: {},
  authorized: null,
};

const user = (state = initialState, action) => {
  switch (action.type) {
    case USER_AUTHORIZE_SUCCESS: {
      localStorage.setItem('token', action.payload.token);
      localStorage.setItem('centrifugoToken', action.payload.centrifugoToken);
      localStorage.setItem('name', action.payload.email);
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

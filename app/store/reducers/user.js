const initialState = {
  me: {},
};

const user = (state = initialState, action) => {
  switch (action.type) {
    case 'USER_AUTHORIZE_SUCCESS': {
      return {
        ...state,
        me: action.payload,
      };
    }
    default: {
      return state;
    }
  }
};

export default user;

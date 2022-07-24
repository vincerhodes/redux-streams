import { STREAM } from "../actions/types";

const INITIAL_STATE = {
  isSignedIn: null,
  userId: null,
};

const authReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case STREAM.SIGN_IN:
      return { ...state, isSignedIn: true, userId: action.payload };
    case STREAM.SIGN_OUT:
      return { ...state, isSignedIn: false, userId: null };
    default:
      return state;
  }
};

export default authReducer;

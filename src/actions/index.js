import { SIGN_IN, SIGN_OUT, CREATE_STREAM } from "./types";

export const signIn = (userId) => {
  return {
    type: SIGN_IN,
    payload: userId,
  };
};

export const signOut = () => {
  return {
    type: SIGN_OUT,
  };
};

export const createStream = (formValues) => {
  return {
    type: CREATE_STREAM,
    payload: formValues,
  };
};
import streams from "../apis/streams";
import { STREAM } from "./types.js";
import history from "../history";

export const signIn = (userId) => {
  return {
    type: STREAM.SIGN_IN,
    payload: userId,
  };
};

export const signOut = () => {
  return {
    type: STREAM.SIGN_OUT,
  };
};

export const createStream = (formValues) => async (dispatch, getState) => {
  const { userId } = getState().auth;
  const response = await streams.post("/streams", { ...formValues, userId });

  dispatch({ type: STREAM.CREATE, payload: response.data });

  // programmatically navigation user back to the root route
  history.push("/");
};

export const fetchStreams = () => async (dispatch) => {
  const response = await streams.get("/streams");

  dispatch({ type: STREAM.FETCHALL, payload: response.data });
};

export const fetchStream = (id) => async (dispatch) => {
  const response = await streams.get(`streams/${id}`);

  dispatch({ type: STREAM.FETCH, payload: response.data });
};

export const editStream = (id, formValues) => async (dispatch) => {
  const response = await streams.patch(`streams/${id}`, formValues);

  dispatch({ type: STREAM.EDIT, payload: response.data });

  history.push("/");
};

export const deleteStream = (id) => async (dispatch) => {
  await streams.delete(`streams/${id}`);

  dispatch({ type: STREAM.DELETE, payload: id });
};

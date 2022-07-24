import _, { mapKeys } from "lodash";
import { STREAM } from "../actions/types";

const streamReducer = (state = {}, action) => {
  switch (action.type) {
    case STREAM.FETCHALL:
      return { ...state, ..._.mapKeys(action.payload, "id") };
    case STREAM.FETCH:
      return { ...state, [action.payload.id]: action.payload };
    case STREAM.CREATE:
      return { ...state, [action.payload.id]: action.payload };
    case STREAM.EDIT:
      return { ...state, [action.payload.id]: action.payload };
    case STREAM.DELETE:
      return _.omit(state, [action.payload]);
    default:
      return state;
  }
};

export default streamReducer;

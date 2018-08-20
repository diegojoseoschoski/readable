import _ from "lodash";
import {
  GET_ALL_POSTS,
  GET_POST,
  GET_CATEGORY_POSTS,
  EDIT_POST,
  DELETE_POST,
  VOTE_POST
} from "../actions/actionTypes";

const INITIAL_STATE = {};

export default function(state = INITIAL_STATE, action) {
  switch (action.type) {
    case GET_ALL_POSTS:
      return _.mapKeys(action.payload, "id");
    case GET_POST:
      return {
        ...state,
        [action.payload.id]: action.payload
      };
    case EDIT_POST:
      return {
        ...state,
        [action.payload.id]: action.payload
      };
    case DELETE_POST:
      return _.omit(state, action.payload);
    case VOTE_POST:
      return {
        ...state,
        [action.payload.id]: action.payload
      };
    case GET_CATEGORY_POSTS:
      return _.mapKeys(action.payload, "id");
    default:
      return state;
  }
}

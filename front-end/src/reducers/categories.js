import { GET_CATEGORIES } from "../actions/actionTypes";

const INITIAL_STATE = {};

export default function(state = INITIAL_STATE, action) {
  switch (action.type) {
    case GET_CATEGORIES:
      return action.payload.categories;
    default:
      return state;
  }
}

import _ from "lodash";
import {
  GET_POST_COMMENTS,
  GET_COMMENT_POST,
  GET_POST_COMMENTS_COUNT,
  EDIT_COMMENT_POST,
  DELETE_COMMENT_POST,
  VOTE_COMMENT
} from "../actions/actionTypes";

const INITIAL_STATE = {
  comments: {},
  commentCount: {}
};

export default function(state = INITIAL_STATE, action) {
  switch (action.type) {
    case GET_POST_COMMENTS:
    return {
      ...state,
      comments: _.mapKeys(action.payload, "id")
    };
    case GET_COMMENT_POST:
      return {
        ...state,
        [action.payload.id]: action.payload
      };
    case GET_POST_COMMENTS_COUNT:
      const { postId, count } = action.payload;
      return {
        ...state,
        commentCount: {
          ...state["commentCount"],
          [postId]: count
        }
      };
    case EDIT_COMMENT_POST:
      return {
        ...state,
        [action.payload.id]: action.payload
      };
    case DELETE_COMMENT_POST:
      return _.omit(state, action.payload);
    case VOTE_COMMENT:
      return {
        ...state,
        [action.payload.id]: action.payload
      };
    default:
      return state;
  }
}

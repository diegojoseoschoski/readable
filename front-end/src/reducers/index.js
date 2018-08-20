import { combineReducers } from "redux";
import { reducer as formReducer } from "redux-form";
import PostsReducer from "./posts";
import CategoriesReducer from "./categories";
import CommentsReducer from "./comments";
import PostsSortReducer from "./posts_sort";

const compositeReducer = combineReducers({
  categories: CategoriesReducer,
  posts: PostsReducer,
  postsOrder: PostsSortReducer,
  comments: CommentsReducer,
  form: formReducer
});

export default compositeReducer;

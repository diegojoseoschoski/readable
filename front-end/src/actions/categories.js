import axios from "axios";
import { GET_CATEGORIES, GET_CATEGORY_POSTS } from "./actionTypes";
import { ROOT_URL, AUTH_HEADERS } from "../constants";

axios.defaults.headers.common["Authorization"] = AUTH_HEADERS;

export function getCategories() {
  return dispatch => {
    axios
      .get(`${ROOT_URL}/categories`)
      .then(res => dispatch(getCategoriesSuccess(res.data)));
  };
}

function getCategoriesSuccess(data) {
  return {
    type: GET_CATEGORIES,
    payload: data
  };
}

export function getCategoryPosts(category) {
  return dispatch => {
    axios
      .get(`${ROOT_URL}/${category}/posts`)
      .then(res => dispatch({ type: GET_CATEGORY_POSTS, payload: res.data }))
      .catch(err => console.log(err));
  };
}

import { ActionType } from "./actionType";
import * as api from "../../api/index.js";
export const getPosts = () => async (dispatch) => {
  try {
    const data = await api.fetchPosts();
    const action = { type: ActionType.fetchall, payload: data };
    return dispatch(action);
  } catch (error) {
    console.error(error.message);
  }
};

export const getPostsBySearch = (searchQuery) => async (dispatch) => {
  try {
  const {
    data: { data },
  } = await api.fetchPostsBySearch(searchQuery);
    console.log(data)
     dispatch({ type: ActionType.FETCH_BY_SEARCH, payload: { data } });
  } catch (error) {
    console.log(error);
  }
};
export const createPosts = (post) => async (dispatch) => {
  try {
    const { data } = await api.createPost(post);
    const action = { type: ActionType.create, payload: data };
    return dispatch(action);
  } catch (error) {
    console.error(error.message);
  }
};

export const getId = (id) => {
   const action ={ type:ActionType.getId, payload:id};
   return action;
};

export const updatePost = (id,post) => async (dispatch) => {
  try {
    const { data } = await api.updatePost(id,post);
    const action = { type: ActionType.update, payload: data };
    return dispatch(action);
  } catch (error) {
    console.error(error);
  }
};
export const deletePost = (id) => async (dispatch) => {
    try {
      await api.deletePost(id);
      dispatch({ type: ActionType.delete, payload: id });
    } catch (error) {
      console.log(error.message);
    }
}

export const likePost = (id) => async (dispatch) => {
  try {
    const { data } = await api.likePost(id);

    dispatch({ type: ActionType.like, payload: data });
  } catch (error) {
    console.log(error.message);
  }
};




import { ActionType } from "./actionType";
import * as api from "../../api/index.js";
export const authdataPost = (data) => {
  const action = { type: ActionType.getId, payload: data };
  return action;
};
export const signin = (formData, router) => async (dispatch) => {
  try {
    const { data } = await api.signIn(formData);

    dispatch({ type: ActionType.auth, data });

    router.push("/");
  } catch (error) {
    console.log(error);
  }
};

export const signup = (formData, router) => async (dispatch) => {
  try {
    const { data } = await api.signUp(formData);

    dispatch({ type: ActionType.auth, data });

    router.push("/");
  } catch (error) {
    console.log(error);
  }
};

import { ActionType } from "../actions/actionType";
export const authReducer = (state = { authData: null }, action) => {
  switch (action.type) {
    case ActionType.auth:
      localStorage.setItem("profile", JSON.stringify({ ...action?.data }));
      return { ...state, authData: action.data, loading: false, errors: null };
    case ActionType.logout:
      localStorage.clear();
      return { ...state, authData: null, loading: false, errors: null };
    default:
      return state;
  }
};



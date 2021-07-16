import {combineReducers} from "redux";

import { reducer } from "./postreducer";
import { getIdReducer } from "./getIdReducer";
import { authReducer } from "./authreducer";
export default combineReducers({
  posts: reducer,
  getId: getIdReducer,
  auth: authReducer,
});
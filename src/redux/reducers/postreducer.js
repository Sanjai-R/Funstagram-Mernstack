import { ActionType } from "../actions/actionType";

export const reducer = (posts=[], action) =>{
    switch (action.type) {
      case ActionType.fetchall:
        return action.payload;
      case ActionType.FETCH_BY_SEARCH:
        return  action.payload.data ;
      case ActionType.create:
        return [...posts, action.payload];
      case ActionType.update:
        return posts.map((post) =>
          post._id === action.payload._id ? action.payload : post
        );
      case ActionType.delete:
        return posts.filter((post) => post._id !== action.payload);

      case ActionType.like:
        return posts.map((post) =>
          post._id === action.payload._id ? action.payload : post
        );
      default:
        return posts;
    }
}
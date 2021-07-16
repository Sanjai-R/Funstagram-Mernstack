import { ActionType } from "../actions/actionType";

export const getIdReducer = (id = '', action) => {
  switch (action.type) {
    case ActionType.getId:
      return (id = action.payload);
    default:
      return id;
  }
};

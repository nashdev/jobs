import { combineReducers } from "redux";

const byId = (state = {}, action) => {
  if (action.payload && action.payload.entities) {
    return {
      ...state,
      ...action.payload.entities.users
    };
  }
  return state;
};

const ids = (state = [], action) => {
  switch (action.type) {
    case "nashjobs/users/LOAD":
      return action.payload.result;
    case "nashjobs/users/READ":
    case "nashjobs/users/CREATE":
      return [...state, action.payload.result];
    case "nashjobs/users/DELETE":
      return state.filter(c => c != action.payload.user.id);
    default:
      return state;
  }
};

export const getUser = (state, id) => state[id];

export default combineReducers({
  byId,
  ids
});

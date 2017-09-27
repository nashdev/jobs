import { combineReducers } from "redux";
import { LOAD, CREATE, READ, UPDATE, DELETE } from "client/companies/types";

const byId = (state = {}, action) => {
  if (action.payload && action.payload.entities) {
    return {
      ...state,
      ...action.payload.entities.companies
    };
  }
  return state;
};

const ids = (state = [], action) => {
  switch (action.type) {
    case LOAD:
      if (action.append) {
        return [...state, ...action.payload.result];
      }
      return action.payload.result;
    case READ:
    case CREATE:
      return [...state, action.payload.result];
    case DELETE:
      return state.filter(c => c != action.payload.company.id);
    default:
      return state;
  }
};

export const getCompany = (state, id) => state[id];

export default combineReducers({
  byId,
  ids
});

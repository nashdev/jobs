import { combineReducers } from "redux";
import { LOAD, CREATE, READ, DELETE } from "client/jobs/types";

const byId = (state = {}, action) => {
  if (action.payload && action.payload.entities) {
    return {
      ...state,
      ...action.payload.entities.jobs
    };
  }
  return state;
};

const ids = (state = [], action) => {
  switch (action.type) {
    case LOAD:
      return action.payload.result;
    case READ:
    case CREATE:
      return [...state, action.payload.result];
    case DELETE:
      return state.filter(c => c != action.payload.job.id);
    default:
      return state;
  }
};

const pagination = (state = {}, action) => {
  switch (action.type) {
    case LOAD:
      return action.pagination;
    default:
      return state;
  }
};

// export const getJob = (state, id) => state[id];

export default combineReducers({
  byId,
  ids,
  pagination
});

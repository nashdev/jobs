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
      return action.payload.result.jobs;
    case READ:
    case CREATE:
      return [...state, ...action.payload.result.jobs];
    case DELETE:
      return state.filter(c => c != action.payload.result.jobs[0]);
    default:
      return state;
  }
};

// export const getJob = (state, id) => state[id];

export default combineReducers({
  byId,
  ids
});

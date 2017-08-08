import { combineReducers } from "redux";

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
    case "nashjobs/jobs/LOAD":
      return action.payload.result;
    case "nashjobs/jobs/READ":
    case "nashjobs/jobs/CREATE":
      return [...state, action.payload.result];
    case "nashjobs/jobs/DELETE":
      return state.filter(c => c != action.payload.job.id);
    default:
      return state;
  }
};

const pagination = (state = {}, action) => {
  switch (action.type) {
    case "nashjobs/jobs/LOAD":
      return action.pagination;
    default:
      return state;
  }
};

export const getJob = (state, id) => state[id];

export default combineReducers({
  byId,
  ids,
  pagination
});

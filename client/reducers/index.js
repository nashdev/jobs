import { combineReducers } from "redux";
import { reducer as form } from "redux-form";
import messages from "./messages";
import auth from "./auth";
import companies from "./companies";
import jobs from "./jobs";
import users from "./users";

export default combineReducers({
  form,
  messages,
  auth,
  companies,
  jobs,
  users
});

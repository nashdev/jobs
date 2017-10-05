import { combineReducers } from "redux";
import { reducer as form } from "redux-form";

import messages from "client/messages/reducers";
import auth from "client/account/reducers";
import users from "client/people/reducers";
import companies from "client/companies/reducers";
import jobs from "client/jobs/reducers";

export default combineReducers({
  form,
  messages,
  auth,
  companies,
  jobs,
  users
});

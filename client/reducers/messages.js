export default function messages(state = {}, action) {
  switch (action.type) {
    case "LOGIN_FAILURE":
    case "SIGNUP_FAILURE":
    case "UPDATE_PROFILE_FAILURE":
    case "CHANGE_PASSWORD_FAILURE":
    case "FORGOT_PASSWORD_FAILURE":
    case "RESET_PASSWORD_FAILURE":
    case "CONTACT_FORM_FAILURE":
    case "OAUTH_FAILURE":
    case "UNLINK_FAILURE":
    case "LINK_FAILURE":
    case "COMPANIES_CREATE_ERROR":
    case "COMPANIES_UPDATE_ERROR":
    case "COMPANIES_DELETE_ERROR":
    case "JOBS_CREATE_ERROR":
    case "JOBS_UPDATE_ERROR":
      return {
        error: action.messages
      };
    case "UPDATE_PROFILE_SUCCESS":
    case "CHANGE_PASSWORD_SUCCESS":
    case "RESET_PASSWORD_SUCCESS":
    case "FORGOT_PASSWORD_SUCCESS":
    case "DELETE_ACCOUNT_SUCCESS":
    case "UNLINK_SUCCESS":
    case "nashjobs/companies/CREATE":
    case "nashjobs/companies/UPDATE":
    case "nashjobs/companies/DELETE":
    case "nashjobs/jobs/CREATE":
    case "nashjobs/jobs/UPDATE":
      return {
        success: action.messages
      };
    case "CLEAR_MESSAGES":
      return {};
    default:
      return state;
  }
}

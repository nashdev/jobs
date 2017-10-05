import {
  LOGIN_SUCCESS,
  SIGNUP_SUCCESS,
  OAUTH_SUCCESS,
  HYDRATE_USER_SUCCESS,
  LOGOUT_SUCCESS
} from "client/account/types";

const initialState = {
  token: null,
  user: {}
};

export default function auth(state = initialState, action) {
  if (!state.hydrated) {
    state = Object.assign({}, initialState, state, { hydrated: true });
  }
  switch (action.type) {
    case LOGIN_SUCCESS:
    case SIGNUP_SUCCESS:
    case OAUTH_SUCCESS:
      return Object.assign({}, state, {
        token: action.token,
        user: action.user
      });
    case HYDRATE_USER_SUCCESS:
      return Object.assign({}, state, {
        user: action.payload,
        token: action.token
      });
    case LOGOUT_SUCCESS:
      return initialState;
    default:
      return state;
  }
}

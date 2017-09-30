import url from "url";
import qs from "querystring";
import moment from "moment";
import Cookies from "universal-cookie";
import history from "client/common/history";

import { CLEAR_MESSAGES } from "client/messages/types";
import {
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  SIGNUP_SUCCESS,
  SIGNUP_FAILURE,
  LOGOUT_SUCCESS,
  FORGOT_PASSWORD_SUCCESS,
  FORGOT_PASSWORD_FAILURE,
  RESET_PASSWORD_SUCCESS,
  RESET_PASSWORD_FAILURE,
  UPDATE_PROFILE_SUCCESS,
  UPDATE_PROFILE_FAILURE,
  CHANGE_PASSWORD_SUCCESS,
  CHANGE_PASSWORD_FAILURE,
  DELETE_ACCOUNT_SUCCESS,
  HYDRATE_USER_SUCCESS,
  LINK_FAILURE,
  UNLINK_SUCCESS,
  UNLINK_FAILURE,
  OAUTH_SUCCESS,
  OAUTH_FAILURE
} from "client/account/types";

const cookies = new Cookies();

export function login(email, password, redirect) {
  return dispatch => {
    dispatch({
      type: CLEAR_MESSAGES
    });
    return fetch("/api/users/login", {
      method: "post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: email,
        password: password
      })
    }).then(response => {
      if (response.ok) {
        return response.json().then(json => {
          dispatch({
            type: LOGIN_SUCCESS,
            token: json.token,
            user: json.user
          });
          cookies.set("token", json.token, {
            path: "/",
            expires: moment()
              .add(1, "hour")
              .toDate()
          });
          if (redirect) {
            history.push(redirect);
          } else {
            history.push("/account");
          }
        });
      } else {
        return response.json().then(json => {
          dispatch({
            type: LOGIN_FAILURE,
            messages: {
              error: Array.isArray(json) ? json : [json]
            }
          });
        });
      }
    });
  };
}

export function signup(name, email, password) {
  return dispatch => {
    dispatch({
      type: CLEAR_MESSAGES
    });
    return fetch("/api/users/signup", {
      method: "post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name: name, email: email, password: password })
    }).then(response => {
      return response.json().then(json => {
        if (response.ok) {
          dispatch({
            type: SIGNUP_SUCCESS,
            token: json.token,
            user: json.user
          });
          history.push("/");
          cookies.set("token", json.token, {
            path: "/",
            expires: moment()
              .add(1, "hour")
              .toDate()
          });
        } else {
          dispatch({
            type: SIGNUP_FAILURE,
            messages: {
              error: Array.isArray(json) ? json : [json]
            }
          });
        }
      });
    });
  };
}

export function logout() {
  cookies.remove("token");
  history.push("/");
  return {
    type: LOGOUT_SUCCESS
  };
}

export function forgotPassword(email) {
  return dispatch => {
    dispatch({
      type: CLEAR_MESSAGES
    });
    return fetch("/api/users/forgot", {
      method: "post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: email })
    }).then(response => {
      if (response.ok) {
        return response.json().then(json => {
          dispatch({
            type: FORGOT_PASSWORD_SUCCESS,
            messages: {
              success: [json]
            }
          });
        });
      } else {
        return response.json().then(json => {
          dispatch({
            type: FORGOT_PASSWORD_FAILURE,
            messages: {
              error: Array.isArray(json) ? json : [json]
            }
          });
        });
      }
    });
  };
}

export function resetPassword(password, confirm, pathToken) {
  return dispatch => {
    dispatch({
      type: CLEAR_MESSAGES
    });
    return fetch(`/api/users/reset/${pathToken}`, {
      method: "post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        password: password,
        confirm: confirm
      })
    }).then(response => {
      if (response.ok) {
        return response.json().then(json => {
          history.push("/account/login");
          dispatch({
            type: RESET_PASSWORD_SUCCESS,
            messages: {
              success: [json]
            }
          });
        });
      } else {
        return response.json().then(json => {
          dispatch({
            type: RESET_PASSWORD_FAILURE,
            messages: {
              error: Array.isArray(json) ? json : [json]
            }
          });
        });
      }
    });
  };
}

export function updateProfile(state, token) {
  return dispatch => {
    dispatch({
      type: CLEAR_MESSAGES
    });
    return fetch("/api/users/account", {
      method: "put",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify({
        email: state.email,
        name: state.name,
        location: state.location,
        website: state.website
      })
    }).then(response => {
      if (response.ok) {
        return response.json().then(json => {
          dispatch({
            type: UPDATE_PROFILE_SUCCESS,
            messages: {
              success: [json]
            }
          });
        });
      } else {
        return response.json().then(json => {
          dispatch({
            type: UPDATE_PROFILE_FAILURE,
            messages: {
              error: Array.isArray(json) ? json : [json]
            }
          });
        });
      }
    });
  };
}

export function changePassword(password, confirm, token) {
  return dispatch => {
    dispatch({
      type: CLEAR_MESSAGES
    });
    return fetch("/api/users/account", {
      method: "put",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify({
        password: password,
        confirm: confirm
      })
    }).then(response => {
      if (response.ok) {
        return response.json().then(json => {
          dispatch({
            type: CHANGE_PASSWORD_SUCCESS,
            messages: {
              success: [json]
            }
          });
        });
      } else {
        return response.json().then(json => {
          dispatch({
            type: CHANGE_PASSWORD_FAILURE,
            messages: {
              error: Array.isArray(json) ? json : [json]
            }
          });
        });
      }
    });
  };
}

export function deleteAccount(token) {
  return dispatch => {
    dispatch({
      type: CLEAR_MESSAGES
    });
    return fetch("/api/users/account", {
      method: "delete",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      }
    }).then(response => {
      if (response.ok) {
        return response.json().then(json => {
          dispatch(logout());
          dispatch({
            type: DELETE_ACCOUNT_SUCCESS,
            messages: {
              success: [json]
            }
          });
        });
      }
    });
  };
}

export function hydrateUserFromToken() {
  return dispatch => {
    return fetch("/api/users/me", {
      method: "get",
      headers: {
        "Content-Type": "application/json"
      },
      credentials: "include"
    }).then(response => {
      if (response.ok) {
        return response.json().then(json => {
          dispatch({
            type: HYDRATE_USER_SUCCESS,
            payload: json.data,
            token: json.token
          });
        });
      }
    });
  };
}

// Sign in with Github
export function githubLogin() {
  const github = {
    url: `${process.env.API_URL}/api/auth/github`,
    clientId: process.env.GITHUB_CLIENT,
    redirectUri: `${process.env.API_URL}/api/auth/github/callback`,
    authorizationUrl: "https://github.com/login/oauth/authorize",
    scope: "user:email profile",
    width: 452,
    height: 633
  };

  return dispatch => {
    oauth2(github, dispatch)
      .then(openPopup)
      .then(pollPopup)
      .then(exchangeCodeForToken)
      .then(signIn)
      .then(closePopup);
  };
}

// Link account
export function link(provider) {
  switch (provider) {
    case "github":
      return githubLogin();
    default:
      return {
        type: LINK_FAILURE,
        messages: {
          error: [{ msg: "Invalid OAuth Provider" }]
        }
      };
  }
}

// Unlink account
export function unlink(provider) {
  return dispatch => {
    return fetch("/unlink/" + provider).then(response => {
      if (response.ok) {
        return response.json().then(json => {
          dispatch({
            type: UNLINK_SUCCESS,
            messages: {
              success: [json]
            }
          });
        });
      } else {
        return response.json().then(json => {
          dispatch({
            type: UNLINK_FAILURE,
            messages: {
              error: [json]
            }
          });
        });
      }
    });
  };
}

function oauth2(config, dispatch) {
  return new Promise(resolve => {
    const params = {
      client_id: config.clientId,
      redirect_uri: config.redirectUri,
      scope: config.scope,
      display: "popup",
      response_type: "code"
    };
    const url = config.authorizationUrl + "?" + qs.stringify(params);
    resolve({ url: url, config: config, dispatch: dispatch });
  });
}

function openPopup({ url, config, dispatch }) {
  return new Promise(resolve => {
    const width = config.width || 500;
    const height = config.height || 500;
    const options = {
      width: width,
      height: height,
      top: window.screenY + (window.outerHeight - height) / 2.5,
      left: window.screenX + (window.outerWidth - width) / 2
    };
    const popup = window.open(url, "_blank", qs.stringify(options, ","));

    if (url === "about:blank") {
      popup.document.body.innerHTML = "Loading...";
    }

    resolve({ window: popup, config: config, dispatch: dispatch });
  });
}

function pollPopup({ window, config, requestToken, dispatch }) {
  return new Promise(resolve => {
    const redirectUri = url.parse(config.redirectUri);
    const redirectUriPath = redirectUri.host + redirectUri.pathname;

    if (requestToken) {
      window.location =
        config.authorizationUrl + "?" + qs.stringify(requestToken);
    }

    const polling = setInterval(() => {
      if (!window || window.closed) {
        clearInterval(polling);
      }
      try {
        const popupUrlPath = window.location.host + window.location.pathname;
        if (popupUrlPath === redirectUriPath) {
          if (window.location.search || window.location.hash) {
            const query = qs.parse(
              window.location.search.substring(1).replace(/\/$/, "")
            );
            const hash = qs.parse(
              window.location.hash.substring(1).replace(/[/$]/, "")
            );
            const params = Object.assign({}, query, hash);

            if (params.error) {
              dispatch({
                type: OAUTH_FAILURE,
                messages: {
                  error: [{ msg: params.error }]
                }
              });
            } else {
              resolve({
                oauthData: params,
                config: config,
                window: window,
                interval: polling,
                dispatch: dispatch
              });
            }
          } else {
            dispatch({
              type: OAUTH_FAILURE,
              messages: {
                error: [
                  {
                    msg:
                      "OAuth redirect has occurred but no query or hash parameters were found."
                  }
                ]
              }
            });
          }
        }
      } catch (error) {
        // Ignore DOMException: Blocked a frame with origin from accessing a cross-origin frame.
        // A hack to get around same-origin security policy errors in Internet Explorer.
      }
    }, 500);
  });
}

function exchangeCodeForToken({
  oauthData,
  config,
  window,
  interval,
  dispatch
}) {
  return new Promise(resolve => {
    const data = Object.assign({}, oauthData, config);

    return fetch(config.url, {
      method: "post",
      headers: { "Content-Type": "application/json" },
      credentials: "same-origin", // By default, fetch won't send any cookies to the server
      body: JSON.stringify(data)
    }).then(response => {
      if (response.ok) {
        return response.json().then(json => {
          resolve({
            token: json.token,
            user: json.user,
            window: window,
            interval: interval,
            dispatch: dispatch
          });
        });
      } else {
        return response.json().then(json => {
          dispatch({
            type: OAUTH_FAILURE,
            messages: {
              error: Array.isArray(json) ? json : [json]
            }
          });
          closePopup({ window: window, interval: interval });
        });
      }
    });
  });
}

function signIn({ token, user, window, interval, dispatch }) {
  return new Promise(resolve => {
    dispatch({
      type: OAUTH_SUCCESS,
      token: token,
      user: user
    });
    cookies.set("token", token, {
      path: "/",
      expires: moment()
        .add(1, "hour")
        .toDate()
    });
    history.push("/");
    resolve({ window: window, interval: interval });
  });
}

function closePopup({ window, interval }) {
  return new Promise(resolve => {
    clearInterval(interval);
    window.close();
    resolve();
  });
}

import { CLEAR_MESSAGES } from "client/messages/types";

const messages = (state = {}, action) => {
  if (action.type === CLEAR_MESSAGES) {
    return {};
  }

  if (action.messages) {
    return {
      ...state,
      ...action.messages
    };
  }

  return state;
};

export default messages;

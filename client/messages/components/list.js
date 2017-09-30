import React from "react";
import { store } from "client/store";
import isEmpty from "lodash/isEmpty";
import { CLEAR_MESSAGES } from "client/messages/types";

class Messages extends React.Component {
  render() {
    if (isEmpty(this.props.messages)) {
      return null;
    }

    // Clear messages after 3 seconds
    setTimeout(function() {
      store.dispatch({
        type: CLEAR_MESSAGES
      });
    }, 4000);

    const { success, error, info } = this.props.messages;

    return (
      <div className="messages-container">
        {success && (
          <div role="alert" className="notification is-success">
            <button className="delete" />
            {this.props.messages.success.map((message, index) => (
              <div key={index}>{message.msg}</div>
            ))}
          </div>
        )}
        {error && (
          <div role="alert" className="notification is-danger">
            {this.props.messages.error.map((message, index) => (
              <div key={index}>{message.msg}</div>
            ))}
          </div>
        )}
        {info && (
          <div role="alert" className="notification is-info">
            {this.props.messages.info.map((message, index) => (
              <div key={index}>{message.msg}</div>
            ))}
          </div>
        )}
      </div>
    );
  }
}

export default Messages;

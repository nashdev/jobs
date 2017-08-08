import React from "react";

class Messages extends React.Component {
  render() {
    if (!this.props.messages) {
      return null;
    }

    const { success, error, info } = this.props.messages;

    return (
      <div>
        {success &&
          <div role="alert" className="text-success">
            {this.props.messages.success.map((message, index) =>
              (<div key={index}>
                {message.msg}
              </div>)
            )}
          </div>}
        {error &&
          <div role="alert" className="text-danger">
            {this.props.messages.error.map((message, index) =>
              (<div key={index}>
                {message.msg}
              </div>)
            )}
          </div>}
        {info &&
          <div role="alert" className="text-info">
            {this.props.messages.info.map((message, index) =>
              (<div key={index}>
                {message.msg}
              </div>)
            )}
          </div>}
      </div>
    );
  }
}

export default Messages;

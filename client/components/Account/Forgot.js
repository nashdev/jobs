import React from "react";
import { connect } from "react-redux";
import { forgotPassword } from "../../actions/auth";
import Messages from "../Messages";

class Forgot extends React.Component {
  constructor(props) {
    super(props);
    this.state = { email: "" };
  }

  handleChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  handleForgot(event) {
    event.preventDefault();
    this.props.dispatch(forgotPassword(this.state.email));
  }

  render() {
    return (
      <div>
        <section className="hero is-primary is-medium is-bold">
          <div className="hero-body">
            <div className="container is-fluid">
              <h1 className="title">Forgot Password</h1>
              <h2 className="subtitle">
                Enter your email address below and we'll send you password reset
                instructions.
              </h2>
            </div>
          </div>
        </section>
        {this.props.messages && <Messages messages={this.props.messages} />}
        <section className="section">
          <div className="container is-fluid">
            <form onSubmit={this.handleForgot.bind(this)}>
              <div className="field">
                <label htmlFor="email" className="label">
                  Email
                </label>
                <input
                  className="input"
                  type="email"
                  name="email"
                  id="email"
                  placeholder="Email"
                  value={this.state.email}
                  onChange={this.handleChange.bind(this)}
                  autoFocus
                />
              </div>
              <div className="field is-grouped">
                <div className="control">
                  <button className="button is-primary" type="submit">
                    Reset Password
                  </button>
                </div>
              </div>
            </form>
          </div>
        </section>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    messages: state.messages
  };
};

export default connect(mapStateToProps)(Forgot);

import React from "react";
import { connect } from "react-redux";
import { resetPassword } from "client/account/actions";
import Messages from "client/messages/components/list";

class Reset extends React.Component {
  constructor(props) {
    super(props);
    this.state = { password: "", confirm: "" };
  }

  handleChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  handleReset(event) {
    event.preventDefault();
    this.props.dispatch(
      resetPassword(
        this.state.password,
        this.state.confirm,
        this.props.params.token
      )
    );
  }

  render() {
    return (
      <div>
        <section className="hero is-medium is-primary is-bold">
          <div className="hero-body">
            <div className="container is-fluid">
              <h1 className="title">Reset Password</h1>
            </div>
          </div>
        </section>
        {this.props.messages && <Messages messages={this.props.messages} />}
        <section className="section">
          <div className="container is-fluid">
            <div className="columns">
              <div className="column is-narrow">
                <form onSubmit={this.handleReset.bind(this)}>
                  <div className="field">
                    <label htmlFor="password" className="label">
                      New Password
                    </label>
                    <div className="control">
                      <input
                        type="password"
                        name="password"
                        id="password"
                        className="input"
                        placeholder="New password"
                        value={this.state.password}
                        onChange={this.handleChange.bind(this)}
                        autoFocus
                      />
                    </div>
                  </div>
                  <div className="field">
                    <label htmlFor="confirm" className="label">
                      Confirm Password
                    </label>
                    <div className="control">
                      <input
                        type="password"
                        name="confirm"
                        id="confirm"
                        className="input"
                        placeholder="Confirm password"
                        value={this.state.confirm}
                        onChange={this.handleChange.bind(this)}
                      />
                    </div>
                  </div>

                  <div className="field is-grouped">
                    <div className="control">
                      <button className="button is-primary" type="submit">
                        Change Password
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </section>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return state;
};

export default connect(mapStateToProps)(Reset);

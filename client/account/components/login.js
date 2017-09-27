import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { login, githubLogin } from "client/account/actions";
import Messages from "client/messages/components/list";

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = { email: "", password: "" };
  }

  handleChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  handleLogin(event) {
    event.preventDefault();
    this.props.dispatch(login(this.state.email, this.state.password));
  }

  handleGithub() {
    this.props.dispatch(githubLogin());
  }

  render() {
    return (
      <div>
        <section className="hero is-primary is-bold">
          <div className="hero-body">
            <div className="container is-fluid">
              <h1 className="title">Login</h1>
            </div>
          </div>
        </section>
        {this.props.messages && <Messages messages={this.props.messages} />}
        <section className="section">
          <div className="container is-fluid">
            <div className="columns">
              <div className="column">
                <form onSubmit={this.handleLogin.bind(this)}>
                  <div className="field">
                    <label className="label">Email</label>
                    <div className="control">
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
                  </div>
                  <div className="field">
                    <label className="label">Password</label>
                    <div className="control">
                      <input
                        className="input"
                        type="password"
                        name="password"
                        id="password"
                        placeholder="Password"
                        value={this.state.password}
                        onChange={this.handleChange.bind(this)}
                      />
                    </div>
                  </div>
                  <div className="field is-grouped">
                    <div className="control">
                      <button className="button is-primary" type="submit">
                        Login
                      </button>
                    </div>
                  </div>
                </form>
              </div>
              <div className="column is-one-quarter">
                <button
                  onClick={this.handleGithub.bind(this)}
                  className="button"
                >
                  <span className="icon is-small">
                    <i className="fa fa-github" />
                  </span>
                  <span>Sign in with Github</span>
                </button>
                <hr className="divider" />
                <p className="control">
                  Need an account?{" "}
                  <Link to="/account/signup">
                    <span>Sign up.</span>
                  </Link>
                </p>
                <p className="control">
                  <Link to="/account/forgot">
                    <span>Forgot your password?</span>
                  </Link>
                </p>
              </div>
            </div>
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

export default connect(mapStateToProps)(Login);

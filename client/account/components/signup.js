import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { signup, githubLogin } from "client/account/actions";
import Messages from "client/messages/components/list";

class Signup extends React.Component {
  constructor(props) {
    super(props);
    this.state = { name: "", email: "", password: "" };
  }

  handleChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  handleSignup(event) {
    event.preventDefault();
    this.props.dispatch(
      signup(this.state.name, this.state.email, this.state.password)
    );
  }

  handleGithub() {
    this.props.dispatch(githubLogin());
  }

  render() {
    return (
      <div>
        <section className="hero is-medium is-primary is-bold">
          <div className="hero-body">
            <div className="container is-fluid">
              <h1 className="title">Create an account.</h1>
            </div>
          </div>
        </section>
        {this.props.messages && <Messages messages={this.props.messages} />}
        <section className="section">
          <div className="container is-fluid">
            <div className="columns">
              <div className="column">
                <form onSubmit={this.handleSignup.bind(this)}>
                  <div className="field">
                    <label htmlFor="name" className="label">
                      Name
                    </label>
                    <div className="control">
                      <input
                        className="input"
                        type="text"
                        name="name"
                        id="name"
                        value={this.state.name}
                        onChange={this.handleChange.bind(this)}
                      />
                    </div>
                  </div>
                  <div className="field">
                    <label htmlFor="email" className="label">
                      E-mail
                    </label>
                    <div className="control">
                      <input
                        className="input"
                        type="email"
                        name="email"
                        id="email"
                        value={this.state.email}
                        onChange={this.handleChange.bind(this)}
                      />
                    </div>
                  </div>
                  <div className="field">
                    <label htmlFor="password" className="label">
                      Password
                    </label>
                    <div className="control">
                      <input
                        className="input"
                        type="password"
                        name="password"
                        id="password"
                        value={this.state.password}
                        onChange={this.handleChange.bind(this)}
                      />
                    </div>
                  </div>

                  <div className="field">
                    <label htmlFor="password" className="label">
                      By signing up, you agree to the{" "}
                      <Link to="/tos">Terms of Service</Link>.
                    </label>
                  </div>

                  <div className="field is-grouped">
                    <div className="control">
                      <button className="button is-primary" type="submit">
                        Create an account
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
                <p>
                  Already have an account?{" "}
                  <Link to="/account/login" className="is-link">
                    Log in.
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

export default connect(mapStateToProps)(Signup);

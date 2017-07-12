import React from "react";
import { IndexLink, Link } from "react-router";
import { connect } from "react-redux";
import { logout } from "../actions/auth";

class AppHeader extends React.Component {
  state = {
    current: "home"
  };
  handleLogout(event) {
    event.preventDefault();
    this.props.dispatch(logout());
  }

  render() {
    return (
      <header className="main">
        <IndexLink to="/" className="logo">
          NashDev Jobs
        </IndexLink>
        <nav>
          <a href="#">Add Job</a>

          {this.props.user &&
            <Link to="/account">
              <img
                className="avatar"
                src={this.props.user.picture || this.props.user.gravatar}
              />{" "}
              {this.props.user.name ||
                this.props.user.email ||
                this.props.user.id}{" "}
            </Link>}

          {!this.props.user && <Link to="/login">Log in</Link>}
          {!this.props.user && <Link to="/signup">Sign up</Link>}
          {this.props.user &&
            <a href="#" onClick={this.handleLogout.bind(this)}>
              Logout
            </a>}
        </nav>
      </header>
    );
  }
}

const mapStateToProps = state => {
  return {
    token: state.auth.token,
    user: state.auth.user
  };
};

export default connect(mapStateToProps)(AppHeader);

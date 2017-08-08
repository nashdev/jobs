import React from "react";
import { IndexLink, Link } from "react-router";
import { connect } from "react-redux";
import cookie from "react-cookie";

import { logout, hydrateUserFromToken } from "../actions/auth";

class AppHeader extends React.Component {
  componentDidMount() {
    const token = cookie.load("token");
    if (token) {
      this.props.dispatch(hydrateUserFromToken());
    }
  }

  handleLogout(event) {
    event.preventDefault();
    this.props.dispatch(logout());
  }

  render() {
    return (
      <header className="main">
        <IndexLink to="/" className="logo">
          NashDev<span>/</span>Jobs
        </IndexLink>
        <nav>
          <Link to="/jobs">Jobs</Link>
          <Link to="/companies">Companies</Link>
          <Link to="/people">People</Link>

          {this.props.token &&
            <Link to="/account">
              <img
                className="avatar"
                src={this.props.user.picture || this.props.user.gravatar}
              />{" "}
              {this.props.user.name ||
                this.props.user.email ||
                this.props.user.id}{" "}
            </Link>}

          {!this.props.token && <Link to="/login">Log in</Link>}
          {!this.props.token && <Link to="/signup">Sign up</Link>}
          {this.props.token &&
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

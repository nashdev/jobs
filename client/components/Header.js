import React from "react";
import { IndexLink, Link } from "react-router";
import { connect } from "react-redux";
import cookie from "react-cookie";
import classnames from "classnames";
import { logout, hydrateUserFromToken } from "../actions/auth";

class AppHeader extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      mobileMenuVisible: false
    };

    this.handleLogout = this.handleLogout.bind(this);
    this.toggleMobileMenu = this.toggleMobileMenu.bind(this);
  }
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
  toggleMobileMenu() {
    this.setState({
      mobileMenuVisible: !this.state.mobileMenuVisible
    });
  }
  render() {
    const mobileNavClasses = classnames({
      "navbar-menu": true,
      "is-active": this.state.mobileMenuVisible
    });

    const navbarBurgerClasses = classnames({
      "navbar-burger": true,
      burger: true,
      "is-active": this.state.mobileMenuVisible
    });

    return (
      <nav className="navbar">
        <div className="navbar-brand">
          <IndexLink className="navbar-item" to="/">
            NashDev/Jobs
          </IndexLink>

          <div className={navbarBurgerClasses} onClick={this.toggleMobileMenu}>
            <span />
            <span />
            <span />
          </div>
        </div>
        <div id="mobile-nav" className={mobileNavClasses}>
          <div className="navbar-start">
            <Link className="navbar-item" to="/jobs">
              <span>Jobs</span>
            </Link>
            <Link className="navbar-item" to="/companies">
              <span>Companies</span>
            </Link>
            <Link className="navbar-item" to="/people">
              <span>People</span>
            </Link>
            <div className="navbar-item has-dropdown is-hoverable">
              <div className="navbar-link">More</div>
              <div id="moreDropdown" className="navbar-dropdown ">
                <a
                  className="navbar-item"
                  href="http://nashdev.com"
                  target="_blank"
                >
                  <span className="icon is-small">
                    <i className="fa fa-slack" />
                  </span>{" "}
                  <span>NashDev Slack</span>
                </a>
              </div>
            </div>
          </div>

          <div className="navbar-end">
            <div className="navbar-item">
              <div className="field is-grouped">
                {this.props.token && (
                  <Link to="/account" className="avatar">
                    <div className="level">
                      <div className="level-left">
                        <div className="level-item">
                          <img
                            src={
                              this.props.user.picture ||
                              this.props.user.gravatar
                            }
                          />
                        </div>
                        <div className="level-right">
                          <span>
                            {this.props.user.name ||
                              this.props.user.email ||
                              this.props.user.id}{" "}
                          </span>
                        </div>
                      </div>
                    </div>
                  </Link>
                )}
                <p className="control">
                  {!this.props.token && (
                    <Link to="/login" className="navbar-item">
                      Log in
                    </Link>
                  )}
                </p>
                {!this.props.token && (
                  <p className="control">
                    <Link to="/signup" className="button is-outlined is-dark">
                      <span className="icon is-small">
                        <i className="fa fa-user-plus" />
                      </span>
                      <span>Sign up</span>
                    </Link>
                  </p>
                )}

                {this.props.token && (
                  <p className="control">
                    <a
                      href="#"
                      onClick={this.handleLogout}
                      className="button is-outlined is-dark"
                    >
                      Logout
                    </a>
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      </nav>
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

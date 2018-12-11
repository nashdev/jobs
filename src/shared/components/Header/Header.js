import React from "react";
import cn from "classnames";
import { graphql, compose } from "react-apollo";
import { withRouter, Link } from "react-router-dom";
import Cookies from "js-cookie";
import gql from "graphql-tag";
import Avatar from "react-avatar";

import s from "./Header.css";

const SLACK_CLIENT_ID = process.env.SLACK_CLIENT_ID;

class Header extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      mobileMenuVisible: false,
    };
  }

  handleLogout = () => {
    Cookies.remove("token");
    this.props.data.refetch();
    this.props.history.replace("/");
  };

  toggleMobileMenu = () => {
    this.setState({
      mobileMenuVisible: !this.state.mobileMenuVisible,
    });
  };

  render() {
    let me;

    if (this.props.data) {
      me = this.props.data.me;
    }

    const mobileNavClasses = cn({
      "navbar-menu": true,
      "is-active": this.state.mobileMenuVisible,
    });

    const navbarBurgerClasses = cn({
      "navbar-burger": true,
      burger: true,
      "is-active": this.state.mobileMenuVisible,
    });

    return (
      <nav className="navbar">
        <div className="container">
          <div className={cn("navbar-brand", s.brand)}>
            <Link to="/" className="navbar-item">
              NashDev/<span>Jobs</span>
            </Link>

            <div
              className={navbarBurgerClasses}
              onClick={this.toggleMobileMenu}
            >
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
            </div>

            <div className="navbar-end">
              <div
                className="navbar-item is-centered"
                data-v-6a08ff35=""
                data-v-d1da632e=""
              >
                <div
                  className={s.searchBox}
                  data-v-d1da632e=""
                  data-v-6a08ff35=""
                >
                  <div className="field">
                    <p className="control has-icons-left">
                      <input
                        className="input"
                        type="text"
                        placeholder="Search"
                        onKeyPress={(e) => {
                          if (e.key === "Enter") {
                            this.props.history.replace(
                              `/search/${e.target.value}`,
                              {
                                flash: {
                                  status: "success",
                                  title: "Search Complete",
                                  message: `Showing seach results for "${
                                    e.target.value
                                  }".`,
                                },
                              }
                            );
                          }
                        }}
                      />
                      <span className="icon is-small is-left">
                        <i className="fas fa-search" />
                      </span>
                    </p>
                  </div>
                </div>
              </div>

              <div className="navbar-item">
                <div className="field is-grouped">
                  {me && (
                    <Link to="/dashboard">
                      <div className="level">
                        <div className="level-left">
                          <div className="level-item">
                            <figure className="image is-rounded is-32x32">
                              <Avatar
                                name={me.name}
                                src={me.picture}
                                size={32}
                                round
                                className={s.avatar}
                              />
                            </figure>
                          </div>
                          <div className="level-right">
                            <span>{me.name}</span>
                          </div>
                        </div>
                      </div>
                    </Link>
                  )}
                  <p className="control">
                    {!me && (
                      <a
                        className={s.slackLogin}
                        href={`https://slack.com/oauth/authorize?scope=identity.basic,identity.email,identity.team,identity.avatar&client_id=${
                          process.env.SLACK_CLIENT_ID
                        }&redirect_uri=${encodeURI(
                          process.env.SLACK_REDIRECT_URI
                        )}`}
                      >
                        <img
                          alt="Sign in with Slack"
                          width="172"
                          height="40"
                          src="https://platform.slack-edge.com/img/sign_in_with_slack.png"
                          srcSet="https://platform.slack-edge.com/img/sign_in_with_slack.png 1x, https://platform.slack-edge.com/img/sign_in_with_slack@2x.png 2x"
                        />
                      </a>
                    )}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </nav>
    );
  }
}

const ME_QUERY = gql`
  query MeQuery {
    me {
      id
      name
      picture
      createdAt
    }
  }
`;

export default compose(
  graphql(ME_QUERY),
  withRouter
)(Header);

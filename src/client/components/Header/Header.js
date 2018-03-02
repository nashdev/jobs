import React from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import { graphql, compose } from 'react-apollo';
import { withRouter, Link } from 'react-router-dom';
import Cookies from 'js-cookie';
import gql from 'graphql-tag';
import s from './Header.css';

class Header extends React.Component {
  render() {
    let me;

    if (this.props.data) {
      me = this.props.data.me;
    }

    return (
      <React.Fragment>
        <header className={s.masthead}>
          <Link to="/" className={s.brand}>
            NashDev/<span>Jobs</span>
          </Link>
          <nav className={`${s.main} ${s.inline}`}>
            <Link to="/jobs" title="Jobs">
              Jobs
            </Link>
            <Link to="/companies" title="Companies">
              Companies
            </Link>
            <Link to="/people" title="Feed">
              People
            </Link>
          </nav>

          {me && (
            <nav className={s.user}>
              <Link to="/dashboard">
                <img
                  onClick={() => {
                    Cookies.remove('token');
                    this.props.history.push('/');
                  }}
                  src={me.picture}
                  className={`${s.avatar} ${s.xSmall}`}
                  alt="avatar"
                />
              </Link>
              <Link to="/dashboard">
                <span>{me.name}</span>
              </Link>
            </nav>
          )}

          {!me && (
            <nav className={`${s.user} ${s.inline}`}>
              <a
                href={`https://slack.com/oauth/authorize?scope=identity.basic,identity.email,identity.team,identity.avatar&client_id=${
                  process.env.SLACK_CLIENT_ID
                }`}
              >
                <span>
                  <i className="fab fa-slack" data-fa-transform="grow-15" />Sign
                  in with Slack
                </span>
              </a>
            </nav>
          )}
        </header>
      </React.Fragment>
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

export default compose(graphql(ME_QUERY), withRouter)(withStyles(s)(Header));

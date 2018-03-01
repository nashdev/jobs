import React from 'react';
import { graphql, compose } from 'react-apollo';
import { withRouter } from 'react-router-dom';
import gql from 'graphql-tag';

class SlackLoginPage extends React.Component {
  render() {
    const { location } = this.props;
    const search = location.search;
    const params =
      typeof URLSearchParams !== 'undefined'
        ? new URLSearchParams(search)
        : null;
    const error = params ? params.get('error') : null;

    if (error) {
      return (
        <div>
          Whoops! Looks like you canceled the login request. Try again?{' '}
          <div className="pa4 tc">
            <a href="https://slack.com/oauth/authorize?scope=identity.basic,identity.email,identity.team,identity.avatar&client_id=4856680877.249800206455">
              <img
                alt="Sign in with Slack"
                height="40"
                width="172"
                src="https://platform.slack-edge.com/img/sign_in_with_slack.png"
                srcSet="https://platform.slack-edge.com/img/sign_in_with_slack.png 1x, https://platform.slack-edge.com/img/sign_in_with_slack@2x.png 2x"
              />
            </a>
          </div>
        </div>
      );
    }

    return (
      <React.Fragment>
        <h1>Logging in.</h1>
        <p>Hang tight!</p>
      </React.Fragment>
    );
  }
}
const GET_TOKEN_QUERY = gql`
  query loginQuery($code: String) {
    getToken(code: $code) {
      token
      user {
        id
        name
      }
    }
  }
`;

export default compose(
  graphql(GET_TOKEN_QUERY, {
    skip: () => typeof URLSearchParams === 'undefined',
    options: props => {
      const search = props.location.search;
      const params = new URLSearchParams(search);
      const code = params.get('code');

      return {
        onError: () => {
          console.log('errored');
        },
        variables: {
          code,
        },
      };
    },

    props: ({ data: { loading, getToken } }) => {
      if (getToken && getToken.token) {
        localStorage.setItem('token', getToken.token);
        window.location.pathname = '/dashboard';
      }
      return {
        loading,
        getToken,
      };
    },
  }),
  withRouter,
)(SlackLoginPage);

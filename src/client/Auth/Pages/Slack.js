import React from 'react';
import { withRouter } from 'react-router-dom';

class SlackLoginPage extends React.Component {
  render() {
    const { location } = this.props;
    const search = location.search;
    const params =
      typeof URLSearchParams !== 'undefined'
        ? new URLSearchParams(search)
        : null;
    const error = params ? params.get('error') : null;

    return (
      <div>
        <h2>Whoops! Looks like we had trouble authenticating you. ({error})</h2>
        <p>
          This can happen if you canceled the login request or if you have
          multiple slack accounts (like one for NashDev, and one for work).
        </p>
        <p>
          Try logging out of your work account in this browser and try again.
        </p>
        <div className="pa4 tc">
          <a
            href={`https://slack.com/oauth/authorize?scope=identity.basic,identity.email,identity.team,identity.avatar&client_id=${
              process.env.SLACK_CLIENT_ID
            }`}
          >
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
}
export default withRouter(SlackLoginPage);

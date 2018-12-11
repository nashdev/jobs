import React from "react";
import { withRouter } from "react-router-dom";
import queryString from "query-string";

import HeroBanner from "../../Common/HeroBanner";

const SlackLoginPage = ({ location }) => {
  const { search } = location;
  const params = queryString.parse(search);
  const error = params ? params.error : null;

  return (
    <React.Fragment>
      <HeroBanner title="Sign in with Slack" location={location} />

      <section className="section">
        <div className="container">
          <div className="content">
            <p>
              Getting started is easy. Simply link your NashDev slack account to
              login.
            </p>

            <a
              href={`https://slack.com/oauth/authorize?scope=identity.basic,identity.email,identity.team,identity.avatar&client_id=${
                process.env.SLACK_CLIENT_ID
              }&redirect_uri=${encodeURI(process.env.SLACK_REDIRECT_URI)}`}
            >
              <img
                alt="Sign in with Slack"
                height="40"
                width="172"
                src="https://platform.slack-edge.com/img/sign_in_with_slack.png"
                srcSet="https://platform.slack-edge.com/img/sign_in_with_slack.png 1x, https://platform.slack-edge.com/img/sign_in_with_slack@2x.png 2x"
              />
            </a>

            {error && (
              <React.Fragment>
                <h2>
                  Whoops! Looks like we had trouble authenticating you.{" "}
                  <span className="tag is-warning">{error}</span>
                </h2>
                <p>
                  This can happen if you canceled the login request or if you
                  have multiple slack accounts (like one for NashDev, and one
                  for work).
                </p>
                <p>
                  Try logging out of your work account in this browser and try
                  again.
                </p>
              </React.Fragment>
            )}
          </div>
        </div>
      </section>
    </React.Fragment>
  );
};

export default withRouter(SlackLoginPage);

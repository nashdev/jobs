import React from "react";
import { Query } from "react-apollo";
import Helmet from "react-helmet";
import { withRouter } from "react-router-dom";
import gql from "graphql-tag";

import UserProfileCard from "../Components/UserProfileCard";
import Spinner from "../../Common/Spinner";
import MarkdownViewer from "../../Common/Markdown";
import HeroBanner from "../../Common/HeroBanner";
import ProfileLayout from "../../Common/ProfileLayout";

const PERSON_QUERY = gql`
  query UserQuery($id: ID!) {
    user(id: $id) {
      id
      name
      location
      resume
      slackHandle
      available
      picture
      twitter
      facebook
      linkedin
      github
      createdAt
    }
  }
`;

const PeopleDetailPage = ({ location, match }) => (
  <React.Fragment>
    <Query query={PERSON_QUERY} variables={{ id: match.params.id }}>
      {({ loading, error, data }) => {
        if (loading) return <Spinner />;
        if (error) return `Error!: ${error}`;

        const person = data.user;

        return (
          <React.Fragment>
            <Helmet>
              <title>{`${person.name}`}</title>
            </Helmet>

            <ProfileLayout
              name={person.name}
              createdAt={person.createdAt}
              createdAtLabel="Joined"
              shortDescription={person.short_description}
              description={person.description}
            >
              <ProfileLayout.Position position="hero">
                <HeroBanner
                  title="People"
                  subtitle={person.name}
                  location={location}
                />
              </ProfileLayout.Position>

              <ProfileLayout.Position position="sidebar">
                <UserProfileCard {...person} />
              </ProfileLayout.Position>

              <ProfileLayout.Position position="content">
                {!person.resume && (
                  <div>
                    <strong>Sorry!</strong> This user has not shared their
                    resume yet.
                  </div>
                )}
                {person.resume && <MarkdownViewer markdown={person.resume} />}
              </ProfileLayout.Position>
            </ProfileLayout>
          </React.Fragment>
        );
      }}
    </Query>
  </React.Fragment>
);

export default withRouter(PeopleDetailPage);

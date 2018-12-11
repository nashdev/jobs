import React from "react";
import { withRouter } from "react-router-dom";
import { Query, Mutation } from "react-apollo";
import gql from "graphql-tag";

import PersonForm from "../Components/Form";
import Spinner from "../../Common/Spinner";
import HeroBanner from "../../Common/HeroBanner";

const GET_ME = gql`
  query {
    me {
      id
      name
      available
      public
      location
      resume
      twitter
      linkedin
      github
      facebook
    }
  }
`;

const UPDATE_JOB = gql`
  mutation updatePerson(
    $name: String!
    $available: Boolean
    $public: Boolean
    $location: String
    $resume: String
    $twitter: String
    $linkedin: String
    $github: String
    $facebook: String
  ) {
    updateUser(
      user: {
        name: $name
        available: $available
        public: $public
        location: $location
        resume: $resume
        twitter: $twitter
        linkedin: $linkedin
        github: $github
        facebook: $facebook
      }
    ) {
      name
      available
      public
      location
      resume
      twitter
      linkedin
      github
      facebook
    }
  }
`;

class PeopleEditPage extends React.Component {
  render() {
    const { location } = this.props;
    return (
      <Mutation mutation={UPDATE_JOB}>
        {(updatePerson) => (
          <Query query={GET_ME}>
            {({ loading, error, data }) => {
              if (loading) return <Spinner />;
              if (error) return `Error!: ${error}`;

              const initialValues = {
                name: data.me.name,
                available: data.me.available || false,
                public: data.me.public || false,
                location: data.me.location || "",
                resume: data.me.resume || "",
                twitter: data.me.twitter || "",
                linkedin: data.me.linkedin || "",
                github: data.me.github || "",
                facebook: data.me.facebook || "",
              };
              return (
                <React.Fragment>
                  <HeroBanner
                    title="Update Profile Settings"
                    location={location}
                  />

                  <section className="section">
                    <div className="container">
                      <PersonForm
                        submitBtnText="Update Profile Settings"
                        initialValues={initialValues}
                        onSubmit={(values, { setSubmitting }) => {
                          updatePerson({
                            variables: { ...values, id: data.me.id },
                          }).then((res) => {
                            this.props.history.replace(`/dashboard`, {
                              flash: {
                                status: "success",
                                title: "Updated Profile",
                                message: `You successfully updated your profile.".`,
                                link: `/settings`,
                                linkText: "Edit Profile Again",
                              },
                            });
                          });
                        }}
                      />
                    </div>
                  </section>
                </React.Fragment>
              );
            }}
          </Query>
        )}
      </Mutation>
    );
  }
}

export default withRouter(PeopleEditPage);

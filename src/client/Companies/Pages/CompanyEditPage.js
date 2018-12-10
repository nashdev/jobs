import React from "react";
import { withRouter } from "react-router-dom";
import { Redirect } from "react-router";

import { Query, Mutation } from "react-apollo";
import gql from "graphql-tag";
import CompanyForm from "../Components/Form";

import Spinner from "../../Common/Spinner";
import HeroBanner from "../../Common/HeroBanner";

const GET_COMPANY = gql`
  query GetCompany($id: ID!) {
    company(id: $id) {
      id
      name
      location
      size
      description
      short_description
      picture
      banner
      twitter
      facebook
      linkedin
      github
      user {
        id
      }
    }

    me {
      id
    }
  }
`;

const UPDATE_COMPANY = gql`
  mutation UpdateCompany(
    $id: ID!
    $name: String!
    $description: String!
    $short_description: String!
    $location: String
    $size: Int
    $picture: String
    $banner: String
    $twitter: String
    $facebook: String
    $github: String
    $linkedin: String
  ) {
    updateCompany(
      company: {
        id: $id
        name: $name
        description: $description
        short_description: $short_description
        location: $location
        size: $size
        picture: $picture
        banner: $banner
        twitter: $twitter
        github: $github
        linkedin: $linkedin
        facebook: $facebook
      }
    ) {
      id
      name
      location
      size
      description
      short_description
      picture
      banner
      twitter
      facebook
      linkedin
      github
    }
  }
`;

class CompanyEditPage extends React.Component {
  render() {
    const companyId = this.props.match.params.id;
    const { location } = this.props;
    return (
      <Mutation mutation={UPDATE_COMPANY}>
        {(updateCompany) => (
          <Query query={GET_COMPANY} variables={{ id: companyId }}>
            {({ loading, error, data }) => {
              if (loading) return <Spinner />;
              if (error) return `Error!: ${error}`;
              if (data.company.user.id !== data.me.id) {
                return (
                  <Redirect
                    to={{
                      pathname: "/dashboard",
                      state: {
                        flash: {
                          status: "error",
                          title: "Permission Denied",
                          message: `Sorry! You do not have access to edit the company "${
                            data.company.name
                          }".`,
                        },
                      },
                    }}
                  />
                );
              }

              return (
                <React.Fragment>
                  <HeroBanner
                    title="Edit Company"
                    subtitle={`Editing ${data.company.name}`}
                    location={location}
                  />

                  <section className="section">
                    <div className="container">
                      <CompanyForm
                        submitBtnText="Update Company"
                        initialValues={data.company}
                        onSubmit={(values, { setSubmitting }) => {
                          updateCompany({ variables: values }).then((res) => {
                            const name = res.data.updateCompany.name;
                            this.props.history.replace(`/dashboard`, {
                              flash: {
                                status: "success",
                                title: "Updated Company",
                                message: `You successfully updated the company "${name}".`,
                                link: `/company/${companyId}/edit`,
                                linkText: "Edit Again",
                              },
                            });
                            setSubmitting(false);
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

export default withRouter(CompanyEditPage);

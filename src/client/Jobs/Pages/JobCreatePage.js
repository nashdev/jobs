import React from "react";
import { Redirect } from "react-router";
import { withRouter } from "react-router-dom";
import { Query, Mutation } from "react-apollo";
import gql from "graphql-tag";

import Spinner from "../../Common/Spinner";
import JobForm from "../Components/Form";
import HeroBanner from "../../Common/HeroBanner";

const GET_USER_COMPANIES = gql`
  query GetUserCompanies {
    me {
      id
      companies {
        id
        name
        createdAt
      }
    }
  }
`;

const CREATE_JOB = gql`
  mutation CreateJob(
    $companyId: ID!
    $title: String!
    $description: String!
    $short_description: String!
    $type: String!
    $recruiter: Boolean!
    $recruiterAgency: String
    $location: String!
    $website: String
    $experienceRange: String!
    $salaryRange: String!
    $remoteAvailable: Boolean!
  ) {
    createJob(
      job: {
        company_id: $companyId
        title: $title
        short_description: $short_description
        description: $description
        type: $type
        recruiter: $recruiter
        recruiter_agency: $recruiterAgency
        location: $location
        website: $website
        experience_range: $experienceRange
        salary_range: $salaryRange
        remote_available: $remoteAvailable
      }
    ) {
      id
      company {
        id
        name
      }
      title
      description
      short_description
      type
      recruiter
      recruiterAgency
      location
      website
      experienceRange
      salary
      remote
    }
  }
`;

const DESCRIPTION_TEMPLATE = `### Description

### Responsibilities

### Requirements

### Education + Experience

### Interview Process
`;

class CreateJobPage extends React.Component {
  render() {
    const { location, history } = this.props;
    return (
      <Mutation mutation={CREATE_JOB}>
        {(createJob) => (
          <Query query={GET_USER_COMPANIES}>
            {({ loading, error, data }) => {
              if (loading) return <Spinner />;
              if (error) return `Error!: ${error}`;

              if (!data.me.companies.length) {
                return (
                  <Redirect
                    to={{
                      pathname: "/companies/create",
                      state: {
                        flash: {
                          status: "warning",
                          title: "Companies Required",
                          message: `Sorry! You'll need to create a company before adding a job.`,
                        },
                      },
                    }}
                  />
                );
              }

              return (
                <React.Fragment>
                  <HeroBanner title="Post a new job" location={location} />

                  <section className="section">
                    <div className="container">
                      <JobForm
                        submitBtnText="Add Job"
                        companies={data.me.companies}
                        initialValues={{
                          companyId: 0,
                          title: "",
                          description: DESCRIPTION_TEMPLATE,
                          short_description: "A brief description of your job.",
                          type: "fulltime",
                          recruiter: false,
                          recruiterAgency: "",
                          location: "Nashville, TN",
                          website: "",
                          experienceRange: "senior",
                          salaryRange: "$100,000 - $120,000",
                          remoteAvailable: false,
                        }}
                        onSubmit={(values, { setSubmitting }) => {
                          createJob({ variables: values }).then((res) => {
                            const { createJob: job } = res.data;
                            const { id: jobId, title } = job;

                            history.replace(`/dashboard/jobs`, {
                              flash: {
                                status: "success",
                                title: "Created Job",
                                message: `You successfully created the job "${title}".`,
                                link: `/job/${jobId}/edit`,
                                linkText: "Edit Job",
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

export default withRouter(CreateJobPage);

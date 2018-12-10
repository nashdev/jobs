import React from "react";
import { withRouter } from "react-router-dom";
import { Redirect } from "react-router";

import { Query, Mutation } from "react-apollo";
import gql from "graphql-tag";

import JobForm from "../Components/Form";
import Spinner from "../../Common/Spinner";
import HeroBanner from "../../Common/HeroBanner";

const GET_JOB = gql`
  query GetJob($id: ID!) {
    job(id: $id) {
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

const UPDATE_JOB = gql`
  mutation UpdateJob(
    $id: ID!
    $companyId: ID!
    $title: String!
    $description: String!
    $short_description: String!
    $type: String!
    $status: String
    $recruiter: Boolean!
    $recruiterAgency: String
    $location: String!
    $website: String
    $experienceRange: String!
    $salaryRange: String!
    $remoteAvailable: Boolean
  ) {
    updateJob(
      job: {
        id: $id
        company_id: $companyId
        title: $title
        description: $description
        short_description: $short_description
        type: $type
        status: $status
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

class JobEditPage extends React.Component {
  render() {
    const jobId = this.props.match.params.id;
    const { location } = this.props;
    return (
      <Mutation mutation={UPDATE_JOB}>
        {(updateJob) => (
          <Query query={GET_JOB} variables={{ id: jobId }}>
            {({ loading, error, data }) => {
              if (loading) return <Spinner />;
              if (error) return `Error!: ${error}`;
              if (data.job.user_id !== data.me.id) {
                return (
                  <Redirect
                    to={{
                      pathname: "/dashboard",
                      state: {
                        flash: {
                          status: "error",
                          title: "Permission Denied",
                          message: `Sorry! You do not have access to edit the job "${
                            data.job.title
                          }".`,
                        },
                      },
                    }}
                  />
                );
              }

              const initialValues = {
                companyId: data.job.company.id,
                title: data.job.title,
                description: data.job.description,
                short_description: data.job.short_description,
                type: data.job.type,
                experienceRange: data.job.experienceRange,
                salaryRange: data.job.salary,
                website: data.job.website,
                location: data.job.location,
                remoteAvailable: data.job.remote,
                recruiter: data.job.recruiter,
                recruiterAgency: data.job.recruiterAgency,
              };
              return (
                <React.Fragment>
                  <HeroBanner
                    title="Update Job"
                    subtitle={`Editing ${data.job.title}`}
                    location={location}
                  />

                  <section className="section">
                    <div className="container">
                      <JobForm
                        submitBtnText="Update Job"
                        companies={data.me.companies}
                        initialValues={initialValues}
                        onSubmit={(values, { setSubmitting }) => {
                          updateJob({
                            variables: { ...values, id: jobId },
                          }).then((res) => {
                            const title = res.data.updateJob.title;
                            this.props.history.replace(`/dashboard/jobs`, {
                              flash: {
                                status: "success",
                                title: "Updated Job",
                                message: `You successfully updated the job "${title}".`,
                                link: `/job/${jobId}/edit`,
                                linkText: "Edit Job Again",
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

export default withRouter(JobEditPage);

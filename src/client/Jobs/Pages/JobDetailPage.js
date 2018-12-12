import React from "react";
import { graphql, compose } from "react-apollo";
import { withRouter } from "react-router-dom";
import gql from "graphql-tag";
import Helmet from "react-helmet";

import Spinner from "../../Common/Spinner";
import CompanyProfileCard from "../../Companies/Components/CompanyProfileCard";
import MarkdownViewer from "../../Common/Markdown";
import HeroBanner from "../../Common/HeroBanner";
import ActionList from "../../Common/ActionList";
import ProfileLayout from "../../Common/ProfileLayout";

class JobDetailPage extends React.Component {
  renderAction = (job, me) => {
    if (!job || !me) {
      return null;
    }

    const {
      id,
      user: { id: userId },
    } = job;
    const { id: currentUserId } = me;

    if (currentUserId === userId) {
      return (
        <ActionList
          actions={[
            {
              url: `/job/${id}/edit`,
              label: "Edit",
              icon: "fas fa-edit",
            },
            {
              url: "",
              onClick: (e) => {
                e.preventDefault();
                this.deleteJob(job);
              },
              label: "Delete",
              icon: "fas fa-trash",
            },
          ]}
        />
      );
    }
  };

  deleteJob = async (job) => {
    if (confirm(`Are you sure you want to delete the job "${job.title}"?`)) {
      await this.props.deleteJob({
        variables: { id: job.id },
      });
      this.props.history.replace("/dashboard/jobs", {
        flash: {
          status: "success",
          title: "Deleted Job",
          message: `You have successfully deleted the job "${job.title}".`,
        },
      });
    }
  };

  render() {
    const { location, jobQuery } = this.props;
    if (jobQuery.loading) {
      return (
        <div className="flex w-100 h-100 items-center justify-center pt7">
          <Spinner />
        </div>
      );
    }

    const { job, me } = jobQuery;
    const action = this.renderAction(job, me);

    return (
      <React.Fragment>
        <Helmet>
          <title>
            {`${job.title} at ${job.company.name} in ${job.location}`}
          </title>
        </Helmet>

        <ProfileLayout
          name={job.title}
          createdAt={job.createdAt}
          shortDescription={job.short_description}
          description={job.description}
        >
          <ProfileLayout.Position position="hero">
            <HeroBanner
              title="Job Details"
              subtitle={job.title}
              location={location}
            />
          </ProfileLayout.Position>

          <ProfileLayout.Position position="sidebar">
            <CompanyProfileCard {...job.company} />

            <section
              className="field is-grouped is-grouped-multiline"
              style={{
                margin: "40px 0",
                display: "flex",
                flexDirection: "row",
                flexWrap: "row wrap",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <div className="control">
                <div className="tags has-addons">
                  <span className="tag is-dark is-capitalized">
                    {job.type} @{" "}
                  </span>
                  <span className="tag is-success">{job.salary}</span>
                </div>
              </div>
              <div className="control">
                <div className="tags has-addons">
                  <span className="tag is-dark">XP:</span>
                  <span className="tag is-info is-capitalized">
                    {job.experienceRange}
                  </span>
                </div>
              </div>
              <div className="control">
                <div className="tags has-addons">
                  <span className="tag is-dark">Remote:</span>
                  <span className="tag is-light">
                    {job.remote && (
                      <span role="img" aria-label="Yes">
                        ✅
                      </span>
                    )}
                    {!job.remote && (
                      <span role="img" aria-label="No">
                        🚫
                      </span>
                    )}
                  </span>
                </div>
              </div>
              {job.recruiter && (
                <div className="control">
                  <div className="tags has-addons">
                    <span className="tag is-dark">Recruiter:</span>
                    <span className="tag is-warning is-capitalized">
                      {job.recruiterAgency}
                    </span>
                  </div>
                </div>
              )}
            </section>
          </ProfileLayout.Position>

          <ProfileLayout.Position position="actions">
            {action && <section>{action}</section>}
          </ProfileLayout.Position>

          <ProfileLayout.Position position="content">
            <MarkdownViewer markdown={job.description} />
          </ProfileLayout.Position>
        </ProfileLayout>
      </React.Fragment>
    );
  }
}

const USER_QUERY = gql`
  query JobQuery($id: ID!) {
    me {
      id
    }
    job(id: $id) {
      id
      title
      type
      status
      description
      short_description
      location
      salary
      experienceRange
      remote
      recruiter
      recruiterAgency
      user {
        id
        name
        slackId
      }
      company {
        id
        name
        location
        short_description
        twitter
        facebook
        github
        linkedin
      }
      createdAt
    }
  }
`;

const DELETE_MUTATION = gql`
  mutation deleteJob($id: ID!) {
    deleteJob(id: $id) {
      id
    }
  }
`;

export default compose(
  graphql(USER_QUERY, {
    name: "jobQuery",
    options: (props) => ({
      variables: {
        id: props.match.params.id,
      },
    }),
  }),

  graphql(DELETE_MUTATION, {
    name: "deleteJob",
  }),
  withRouter
)(JobDetailPage);

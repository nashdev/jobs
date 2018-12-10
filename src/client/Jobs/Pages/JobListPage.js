import React from "react";
import { Query } from "react-apollo";
import { withRouter } from "react-router-dom";
import cn from "classnames";
import gql from "graphql-tag";
import Waypoint from "react-waypoint";
import ReactPlaceholder from "react-placeholder";
import Helmet from "react-helmet";
import "react-placeholder/lib/reactPlaceholder.css";

import s from "./JobListPage.css";
import Spinner from "../../Common/Spinner";
import JobListitem from "../Components/JobListitem";
import ActionList from "../../Common/ActionList";
import FilterList from "../../Common/FilterList";
import HeroBanner from "../../Common/HeroBanner";

const JOBS_QUERY = gql`
  query JobQuery($cursor: String, $type: String) {
    jobs(cursor: $cursor, limit: 10, type: $type) {
      cursor
      entries {
        title
        id
        short_description
        location
        createdAt
        user {
          id
          name
        }
        company {
          id
          name
        }
      }
    }
  }
`;

const FILTER_MAP = {
  fulltime: "Full Time",
  parttime: "Part Time",
  freelance: "Freelance",
  contract: "Contract",
  temporary: "Temporary",
  internship: "Internship",
};

class JobsListPage extends React.Component {
  render() {
    const { match, location } = this.props;
    const { filter = "all" } = match.params;

    return (
      <React.Fragment>
        <Helmet>
          <title>Jobs</title>
        </Helmet>
        <Query query={JOBS_QUERY} variables={{ cursor: null, type: filter }}>
          {({ loading, error, data, fetchMore }) => {
            if (loading) return <Spinner />;
            if (error) return `Error!: ${error}`;

            return (
              <React.Fragment>
                <HeroBanner title="Jobs" location={location} />

                <section className="section">
                  <div className="container">
                    <div className="columns is-variable is-8">
                      <div className="column is-one-fifth">
                        <FilterList
                          filters={[
                            {
                              url: "/jobs",
                              label: "All",
                              key: "all",
                            },
                            {
                              url: "/jobs/filter/fulltime",
                              label: "Full Time",
                              key: "fulltime",
                            },
                            {
                              url: "/jobs/filter/parttime",
                              label: "Part Time",
                              key: "parttime",
                            },
                            {
                              url: "/jobs/filter/freelance",
                              label: "Freelance",
                              key: "freelance",
                            },
                            {
                              url: "/jobs/filter/contract",
                              label: "Contract",
                              key: "contract",
                            },
                            {
                              url: "/jobs/filter/temporary",
                              label: "Temporary",
                              key: "temporary",
                            },
                            {
                              url: "/jobs/filter/internship",
                              label: "Internship",
                              key: "internship",
                            },
                          ]}
                          activeFilter={filter}
                        />

                        <ActionList
                          actions={[
                            {
                              url: "/jobs/create",
                              icon: "fas fa-plus",
                              label: "Create Job",
                            },
                          ]}
                        />
                      </div>
                      <div className="column">
                        <h2 className={cn(s.filterTitle, "is-capitalized")}>
                          Viewing {filter ? FILTER_MAP[filter] : "All"} Jobs
                        </h2>
                        <div className="content">
                          {!data.jobs && (
                            <div>
                              <strong>Sorry!</strong> No jobs match this filter.
                            </div>
                          )}
                          {data.jobs &&
                            data.jobs.entries &&
                            data.jobs.entries.map((job) => (
                              <JobListitem key={job.id} job={job} />
                            ))}

                          {data.jobs && data.jobs.cursor && (
                            <Waypoint
                              key={data.jobs.cursor}
                              fireOnRapidScroll={false}
                              onEnter={() =>
                                fetchMore({
                                  query: JOBS_QUERY,
                                  variables: {
                                    cursor: data.jobs.cursor,
                                    type: filter,
                                  },
                                  updateQuery: (
                                    previousResult,
                                    { fetchMoreResult }
                                  ) => {
                                    const newJobs = fetchMoreResult.jobs
                                      ? fetchMoreResult.jobs.entries
                                      : [];
                                    const newCursor = fetchMoreResult.jobs
                                      ? fetchMoreResult.jobs.cursor
                                      : null;
                                    return {
                                      jobs: {
                                        __typename:
                                          previousResult.jobs.__typename,
                                        cursor: newCursor,
                                        entries: [
                                          ...previousResult.jobs.entries,
                                          ...newJobs,
                                        ],
                                      },
                                    };
                                  },
                                })
                              }
                            >
                              <div>
                                <ReactPlaceholder
                                  type="text"
                                  showLoadingAnimation
                                  ready={loading}
                                  rows={5}
                                >
                                  Loading...
                                </ReactPlaceholder>
                              </div>
                            </Waypoint>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </section>
              </React.Fragment>
            );
          }}
        </Query>
      </React.Fragment>
    );
  }
}

export default withRouter(JobsListPage);

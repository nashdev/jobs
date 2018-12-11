import React from "react";
import { withRouter } from "react-router-dom";
import { Query, Mutation, ApolloConsumer } from "react-apollo";
import { Link } from "react-router-dom";
import Cookies from "js-cookie";
import gql from "graphql-tag";
import cn from "classnames";
import Helmet from "react-helmet";

import s from "./Dashboard.css";
import Spinner from "../../Common/Spinner";
import CompanyListitem from "../../Companies/Components/CompanyListitem";
import JobListitem from "../../Jobs/Components/JobListitem";
import HeroBanner from "../../Common/HeroBanner";
import FilterList from "../../Common/FilterList";
import ActionList from "../../Common/ActionList";

const getCollection = (collection) => {
  if (["companies", "jobs"].includes(collection)) {
    return collection;
  }

  return "companies";
};

const CompaniesTab = ({ collection, companies }) => {
  if (collection !== "companies") {
    return null;
  }
  return (
    <React.Fragment>
      <h3 className={s.title}>Your Companies</h3>
      {!companies.length && (
        <p>
          <strong>Sorry!</strong> You have not added any companies yet.
        </p>
      )}
      {companies.map((company) => (
        <CompanyListitem key={company.id} company={company} actions />
      ))}
    </React.Fragment>
  );
};
const JobsTab = ({ collection, jobs }) => {
  if (collection !== "jobs") {
    return null;
  }
  return (
    <React.Fragment>
      <h3 className={s.title}>Your Jobs</h3>
      {!jobs.length && (
        <p>
          <strong>Sorry!</strong> You have not added any jobs yet.
        </p>
      )}
      {jobs.map((job) => (
        <JobListitem key={job.id} job={job} actions />
      ))}
    </React.Fragment>
  );
};

const DASHBOARD_QUERY = gql`
  query {
    me {
      id
      name

      companies {
        id
        name
        location
        short_description
      }

      jobs {
        id
        title
        location
        short_description
        company {
          id
          name
        }
      }
    }
  }
`;

const Dashboard = ({ location, match, history }) => (
  <ApolloConsumer>
    {(client) => (
      <Query query={DASHBOARD_QUERY}>
        {({ loading, error, data }) => {
          if (loading) return <Spinner />;
          if (error) return `Error!: ${error}`;

          const collection = getCollection(match.params.collection);

          if (!data.me) {
            return (
              <div>
                Whoops! Looks like we had a problem fetching your information.
              </div>
            );
          }
          return (
            <React.Fragment>
              <Helmet>
                <title>Dashboard</title>
              </Helmet>

              <HeroBanner
                title="Dashboard"
                subtitle={`Welcome back ${data.me.name}`}
                location={location}
              />

              <div className="section">
                <div className="container">
                  <div className="columns is-variable is-8">
                    <div className="column is-one-fifth">
                      <FilterList
                        title="General"
                        filters={[
                          {
                            url: "/dashboard/companies",
                            icon: "fas fa-building",
                            label: `Your Companies (${
                              data.me.companies.length
                            })`,
                            key: "companies",
                          },
                          {
                            url: "/dashboard/jobs",
                            icon: "fas fa-address-card",
                            label: `Your Jobs (${data.me.jobs.length})`,
                            key: "jobs",
                          },
                        ]}
                        activeFilter={collection}
                      />

                      <ActionList
                        actions={[
                          {
                            url: "/companies/create",
                            label: "Create Company",
                            icon: "fas fa-plus",
                          },
                          {
                            url: "/jobs/create",
                            label: "Create Job",
                            icon: "fas fa-plus",
                          },
                          {
                            url: "/settings",
                            label: "Profile Settings",
                            icon: "fas fa-sliders-h",
                          },
                          {
                            url: "/logout",
                            label: "Logout",
                            icon: "fas fa-unlock",
                            onClick: (e) => {
                              e.preventDefault();
                              Cookies.remove("token");
                              client.resetStore();
                              history.replace("/slack/login", {
                                flash: {
                                  status: "success",
                                  title: "Signed out",
                                  message: "You have successully signed out.",
                                },
                              });
                            },
                          },
                        ]}
                      />
                    </div>
                    <div className="column">
                      <div className="content">
                        <CompaniesTab
                          companies={data.me.companies}
                          collection={collection}
                        />
                        <JobsTab jobs={data.me.jobs} collection={collection} />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </React.Fragment>
          );
        }}
      </Query>
    )}
  </ApolloConsumer>
);

export default withRouter(Dashboard);

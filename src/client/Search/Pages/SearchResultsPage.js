import React from "react";
import { Query } from "react-apollo";
import { withRouter } from "react-router-dom";
import Helmet from "react-helmet";
import gql from "graphql-tag";

import Spinner from "../../Common/Spinner";
import HeroBanner from "../../Common/HeroBanner";
import JobListitem from "../../Jobs/Components/JobListitem";
import CompanyListItem from "../../Companies/Components/CompanyListitem";
import PeopleListitem from "../../People/Components/PeopleListitem";

const SEARCH_QUERY = gql`
  query SearchQuery($term: String!) {
    jobs(filter: $term) {
      entries {
        id
        title
        short_description
        location
        createdAt
        user {
          id
          name
          picture
          createdAt
        }
        company {
          id
          name
          short_description
          picture
          createdAt
        }
      }
    }
    companies(filter: $term) {
      entries {
        id
        name
        user {
          id
          name
        }
      }
    }
    users(filter: $term) {
      entries {
        id
        name
        picture
      }
    }
  }
`;

const SearchResultsPage = ({ match, location }) => {
  const { term } = match.params;

  return (
    <React.Fragment>
      <Query
        query={SEARCH_QUERY}
        variables={{
          term,
        }}
      >
        {({ loading, error, data }) => {
          if (loading) return <Spinner />;
          if (error) return `Error!: ${error}`;

          return (
            <React.Fragment>
              <React.Fragment>
                <Helmet>
                  <title>Search results for {term}</title>
                </Helmet>
              </React.Fragment>

              <HeroBanner
                title="Search Results"
                subtitle={`Showing results for "${term}"`}
                location={location}
              />

              <section className="section">
                <div className="container">
                  <div className="columns is-variable is-8">
                    <div className="column">
                      <div className="content">
                        <header className="flex items-center">
                          <h3>Jobs matching &quot;{term}&quot;</h3>
                        </header>
                        <div>
                          {!data.jobs && <div>No results found</div>}
                          {data.jobs &&
                            data.jobs.entries.map((job) => (
                              <JobListitem key={job.id} job={job} />
                            ))}
                        </div>
                      </div>

                      <div className="content">
                        <header className="flex items-center">
                          <h3>Companies matching &quot;{term}&quot;</h3>
                        </header>
                        <div>
                          {!data.companies && <div>No results found</div>}
                          {data.companies &&
                            data.companies.entries.map((company) => (
                              <CompanyListItem
                                key={company.id}
                                company={company}
                              />
                            ))}
                        </div>
                      </div>

                      <div className="content">
                        <header className="flex items-center">
                          <h3>People matching &quot;{term}&quot;</h3>
                        </header>
                        <div>
                          {!data.users && <div>No results found</div>}
                          {data.users &&
                            data.users.entries.map((person) => (
                              <PeopleListitem key={person.id} person={person} />
                            ))}
                        </div>
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
};

export default withRouter(SearchResultsPage);

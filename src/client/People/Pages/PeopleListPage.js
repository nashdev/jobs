import React from "react";
import { Query } from "react-apollo";
import gql from "graphql-tag";
import Helmet from "react-helmet";
import cn from "classnames";
import { Link, withRouter } from "react-router-dom";
import Waypoint from "react-waypoint";
import ReactPlaceholder from "react-placeholder";
import "react-placeholder/lib/reactPlaceholder.css";
import s from "./PeopleListPage.css";

import Flash from "../../Common/Flash";
import Spinner from "../../Common/Spinner";
import PeopleListitem from "../Components/PeopleListitem";
import FilterList from "../../Common/FilterList";
import HeroBanner from "../../Common/HeroBanner";

const PEOPLE_QUERY = gql`
  query PeopleQuery($cursor: String, $availableOnly: Boolean) {
    users(cursor: $cursor, limit: 10, availableOnly: $availableOnly) {
      cursor
      entries {
        id
        name
        picture
        createdAt
      }
    }
  }
`;

const FILTER_MAP = {
  available: "Available for hire",
};

class PeopleListPage extends React.Component {
  render() {
    const { match, location } = this.props;
    const { filter = "all" } = match.params;

    return (
      <React.Fragment>
        <Helmet>
          <title>People</title>
        </Helmet>
        <Query
          query={PEOPLE_QUERY}
          variables={{ cursor: null, availableOnly: filter === "available" }}
        >
          {({ loading, error, data, fetchMore }) => {
            if (loading) return <Spinner />;
            if (error) return `Error!: ${error}`;

            return (
              <React.Fragment>
                <HeroBanner title="People" location={location} />

                <section className="section">
                  <div className="container">
                    <div className="columns is-variable is-8">
                      <div className="column is-one-fifth">
                        <FilterList
                          filters={[
                            {
                              url: "/people",
                              label: "All",
                              key: "all",
                            },
                            {
                              url: "/people/filter/available",
                              label: "Available for hire",
                              key: "available",
                            },
                          ]}
                          activeFilter={filter}
                        />
                      </div>
                      <div className="column">
                        <h2 className={cn(s.filterTitle, "is-capitalized")}>
                          Viewing People {FILTER_MAP[filter]}
                        </h2>
                        <div className="content">
                          {data.users &&
                            data.users.entries &&
                            data.users.entries.map((person) => (
                              <PeopleListitem key={person.id} person={person} />
                            ))}

                          {!data.users && (
                            <div>
                              <strong>Sorry!</strong> No people match this
                              filter.
                            </div>
                          )}
                          {data.users && data.users.cursor && (
                            <Waypoint
                              key={data.users.cursor}
                              fireOnRapidScroll={false}
                              onEnter={() =>
                                fetchMore({
                                  query: PEOPLE_QUERY,
                                  variables: {
                                    cursor: data.users.cursor,
                                  },
                                  updateQuery: (
                                    previousResult,
                                    { fetchMoreResult }
                                  ) => {
                                    const newUsers =
                                      fetchMoreResult.users.entries;
                                    const newCursor =
                                      fetchMoreResult.users.cursor;
                                    return {
                                      users: {
                                        __typename:
                                          previousResult.users.__typename,
                                        cursor: newCursor,
                                        entries: [
                                          ...previousResult.users.entries,
                                          ...newUsers,
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
                                  <Spinner />
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

export default withRouter(PeopleListPage);

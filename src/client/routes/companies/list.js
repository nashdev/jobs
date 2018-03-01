import React from "react";
import { graphql } from "react-apollo";
import gql from "graphql-tag";
import Waypoint from "react-waypoint";
import ReactPlaceholder from "react-placeholder";
import "react-placeholder/lib/reactPlaceholder.css";

import CompanyListItem from "./list-item";

class CompaniesList extends React.Component {
  componentWillReceiveProps(nextProps) {
    if (this.props.location.key !== nextProps.location.key) {
      this.props.refetch();
    }
  }

  render() {
    if (this.props.loading) {
      return (
        <div className="flex w-100 h-100 items-center justify-center pt7">
          <div>Loading (from {process.env.REACT_APP_GRAPHQL_ENDPOINT})</div>
        </div>
      );
    }

    return (
      <React.Fragment>
        <h1>Companies</h1>
        {this.props.companies.entries &&
          this.props.companies.entries.map(company => (
            <CompanyListItem key={company.id} company={company} />
          ))}
        {this.props.children}

        <Waypoint
          key={this.props.cursor}
          fireOnRapidScroll={false}
          onEnter={() => this.props.loadMoreEntries()}
        >
          <div>
            <ReactPlaceholder
              type="text"
              showLoadingAnimation
              ready={this.props.loading}
              rows={5}
            >
              Loading...
            </ReactPlaceholder>
          </div>
        </Waypoint>
      </React.Fragment>
    );
  }
}
const COMPANIES_QUERY = gql`
  query CompanyQuery($cursor: String) {
    companies(cursor: $cursor, limit: 10) {
      cursor
      entries {
        name
        id
        createdAt
      }
    }
  }
`;

export default graphql(COMPANIES_QUERY, {
  // This function re-runs every time `data` changes, including after `updateQuery`,
  // meaning our loadMoreEntries function will always have the right cursor
  props({ data: { loading, cursor, companies, fetchMore, refetch } }) {
    return {
      loading,
      companies,
      cursor,
      refetch,
      loadMoreEntries: () => {
        return fetchMore({
          query: COMPANIES_QUERY,
          variables: {
            cursor: companies.cursor
          },
          updateQuery: (previousResult, { fetchMoreResult }) => {
            const newCompanies = fetchMoreResult.companies.entries;
            const newCursor = fetchMoreResult.companies.cursor;
            return {
              companies: {
                __typename: previousResult.companies.__typename,
                cursor: newCursor,
                entries: [...previousResult.companies.entries, ...newCompanies]
              }
            };
          }
        });
      }
    };
  }
})(CompaniesList);

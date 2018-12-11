import React from "react";
import { graphql } from "react-apollo";
import cn from "classnames";
import { Link } from "react-router-dom";
import gql from "graphql-tag";
import Waypoint from "react-waypoint";
import ReactPlaceholder from "react-placeholder";
import Helmet from "react-helmet";

import "react-placeholder/lib/reactPlaceholder.css";
import s from "./CompanyListPage.css";

import Spinner from "../../Common/Spinner";
import CompanyListItem from "../Components/CompanyListitem";
import HeroBanner from "../../Common/HeroBanner";
import ActionList from "../../Common/ActionList";

class CompanyListPage extends React.Component {
  componentWillReceiveProps(nextProps) {
    if (this.props.location.key !== nextProps.location.key) {
      this.props.refetch();
    }
  }

  render() {
    const { location } = this.props;
    if (this.props.loading) {
      return (
        <div className="flex w-100 h-100 items-center justify-center pt7">
          <Spinner />
        </div>
      );
    }

    return (
      <React.Fragment>
        <Helmet>
          <title>Companies</title>
        </Helmet>

        <HeroBanner title="Companies" location={location} />

        <section className="section">
          <div className="container">
            <div className="columns is-variable is-8">
              <div className="column is-one-fifth">
                <ActionList
                  actions={[
                    {
                      url: "/companies/create",
                      label: "Create Company",
                      icon: "fas fa-plus",
                    },
                  ]}
                />
              </div>
              <div className="column">
                <h2 className={cn(s.filterTitle, "is-capitalized")}>
                  Viewing All Companies
                </h2>
                {this.props.companies.entries &&
                  this.props.companies.entries.map((company) => (
                    <CompanyListItem key={company.id} company={company} />
                  ))}

                {this.props.companies.cursor && (
                  <Waypoint
                    key={this.props.companies.cursor}
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
                        <Spinner />
                      </ReactPlaceholder>
                    </div>
                  </Waypoint>
                )}
              </div>
            </div>
          </div>
        </section>
      </React.Fragment>
    );
  }
}
const COMPANIES_QUERY = gql`
  query CompanyQuery($cursor: String) {
    companies(cursor: $cursor, limit: 10) {
      cursor
      entries {
        id
        name
        location
        short_description
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
      loadMoreEntries: () =>
        fetchMore({
          query: COMPANIES_QUERY,
          variables: {
            cursor: companies.cursor,
          },
          updateQuery: (previousResult, { fetchMoreResult }) => {
            const newCompanies = fetchMoreResult.companies.entries;
            const newCursor = fetchMoreResult.companies.cursor;
            return {
              companies: {
                __typename: previousResult.companies.__typename,
                cursor: newCursor,
                entries: [...previousResult.companies.entries, ...newCompanies],
              },
            };
          },
        }),
    };
  },
})(CompanyListPage);

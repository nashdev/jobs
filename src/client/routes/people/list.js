import React from 'react';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import Waypoint from 'react-waypoint';
import ReactPlaceholder from 'react-placeholder';
import 'react-placeholder/lib/reactPlaceholder.css';

import User from './list-item';

class UsersPage extends React.Component {
  componentWillReceiveProps(nextProps) {
    if (this.props.location.key !== nextProps.location.key) {
      this.props.refetch();
    }
  }

  render() {
    if (this.props.error) {
      return <div>Error</div>;
    }
    if (this.props.loading) {
      return (
        <div className="flex w-100 h-100 items-center justify-center pt7">
          <div>Loading (from {process.env.REACT_APP_GRAPHQL_ENDPOINT})</div>
        </div>
      );
    }

    return (
      <React.Fragment>
        <h1>People</h1>
        {this.props.users.entries &&
          this.props.users.entries.map(user => (
            <User key={user.id} user={user} />
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
const USERS_QUERY = gql`
  query UserQuery($cursor: String) {
    users(cursor: $cursor, limit: 10) {
      cursor
      entries {
        id
        name
        email
        picture
        createdAt
      }
    }
  }
`;

export default graphql(USERS_QUERY, {
  // This function re-runs every time `data` changes, including after `updateQuery`,
  // meaning our loadMoreEntries function will always have the right cursor
  props({ data: { loading, error, cursor, users, fetchMore, refetch } }) {
    return {
      loading,
      users,
      cursor,
      refetch,
      error,
      loadMoreEntries: () =>
        fetchMore({
          query: USERS_QUERY,
          variables: {
            cursor: users.cursor,
          },
          updateQuery: (previousResult, { fetchMoreResult }) => {
            const newUsers = fetchMoreResult.users.entries;
            const newCursor = fetchMoreResult.users.cursor;
            return {
              users: {
                __typename: previousResult.users.__typename,
                cursor: newCursor,
                entries: [...previousResult.users.entries, ...newUsers],
              },
            };
          },
        }),
    };
  },
})(UsersPage);

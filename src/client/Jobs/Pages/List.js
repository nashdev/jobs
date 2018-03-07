import React from 'react';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import Waypoint from 'react-waypoint';
import ReactPlaceholder from 'react-placeholder';
import 'react-placeholder/lib/reactPlaceholder.css';

import Spinner from '../../Common/Spinner';
import Job from './List-item';

class JobsPage extends React.Component {
  componentWillReceiveProps(nextProps) {
    if (this.props.location.key !== nextProps.location.key) {
      this.props.refetch();
    }
  }

  render() {
    if (this.props.loading) {
      return (
        <div className="flex w-100 h-100 items-center justify-center pt7">
          <Spinner />
        </div>
      );
    }

    return (
      <React.Fragment>
        <h1>Jobs</h1>
        {this.props.jobs.entries &&
          this.props.jobs.entries.map(job => <Job key={job.id} job={job} />)}
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
const JOBS_QUERY = gql`
  query JobQuery($cursor: String) {
    jobs(cursor: $cursor, limit: 10) {
      cursor
      entries {
        title
        id
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

export default graphql(JOBS_QUERY, {
  // This function re-runs every time `data` changes, including after `updateQuery`,
  // meaning our loadMoreEntries function will always have the right cursor
  props({ data: { loading, cursor, jobs, fetchMore, refetch } }) {
    return {
      loading,
      jobs,
      cursor,
      refetch,
      loadMoreEntries: () =>
        fetchMore({
          query: JOBS_QUERY,
          variables: {
            cursor: jobs.cursor,
          },
          updateQuery: (previousResult, { fetchMoreResult }) => {
            const newJobs = fetchMoreResult.jobs.entries;
            const newCursor = fetchMoreResult.jobs.cursor;
            return {
              jobs: {
                __typename: previousResult.jobs.__typename,
                cursor: newCursor,
                entries: [...previousResult.jobs.entries, ...newJobs],
              },
            };
          },
        }),
    };
  },
})(JobsPage);

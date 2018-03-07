import React, { Component } from 'react';
import { graphql, compose } from 'react-apollo';
import { withRouter, Link } from 'react-router-dom';
import gql from 'graphql-tag';
import Spinner from '../../Common/Spinner';

class SearchResults extends Component {
  render() {
    if (this.props.data.loading) {
      return <Spinner />;
    }

    return (
      <div className="grid">
        <div className="section--jobs section section--featured">
          <div className="content">
            <header className="flex items-center">
              <h3>Jobs matching '{this.props.match.params.term}'</h3>
              <Link to="/jobs" className="link inline">
                View all Jobs
              </Link>
            </header>
            <div>
              {!this.props.data.jobs && <div>No results found</div>}
              {this.props.data.jobs &&
                this.props.data.jobs.entries.map(x => (
                  <div className="featured--item job--item" key={x.id}>
                    <h2 className="job--title text-pink">{x.title}</h2>
                    <span className="job--company ttu">{x.company.name}</span>
                    <span className="job--type ttu">{x.type}</span>
                    <span className="job--type ttu">{x.location}</span>
                    <span className="job--type ttu">{x.salary}</span>
                  </div>
                ))}
            </div>
          </div>

          <div className="content">
            <header className="flex items-center">
              <h3>Companies matching '{this.props.match.params.term}'</h3>
              <Link to="/companies" className="link inline">
                View all Companies
              </Link>
            </header>
            <div>
              {!this.props.data.companies && <div>No results found</div>}
              {this.props.data.companies &&
                this.props.data.companies.entries.map(x => (
                  <div className="company--item featured--item" key={x.id}>
                    <h2 className="company--name text-pink">{x.name}</h2>
                    <span className="job--type ttu">{x.location}</span>
                  </div>
                ))}
            </div>
          </div>

          <div className="content">
            <header className="flex items-center">
              <h3>People matching '{this.props.match.params.term}'</h3>
              <Link to="/people" className="link inline">
                View all People
              </Link>
            </header>
            <div>
              {!this.props.data.users && <div>No results found</div>}
              {this.props.data.users &&
                this.props.data.users.entries.map(x => (
                  <div className="user--item featured--item" key={x.id}>
                    <h2 className="user--name text-pink">{x.name}</h2>
                    <img
                      className="avatar x-small"
                      src={x.picture}
                      alt={`${x.name}'s avatar`}
                    />
                  </div>
                ))}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const SEARCH_QUERY = gql`
  query SearchQuery($term: String!) {
    jobs(filter: $term) {
      entries {
        id
        title
        type
        location
        salary
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

export default compose(
  graphql(SEARCH_QUERY, {
    options: props => ({
      variables: {
        term: props.match.params.term,
      },
    }),
  }),
  withRouter,
)(SearchResults);

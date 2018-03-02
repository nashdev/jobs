import React, { Component } from 'react';
import { graphql, compose } from 'react-apollo';
import Avatar from 'react-avatar';
import gql from 'graphql-tag';
import withStyles from 'isomorphic-style-loader/lib/withStyles';

import Spinner from '../../components/Spinner';
import HomeHero from '../../components/Hero/Home';
import s from './Home.css';

class HomePage extends Component {
  render() {
    if (this.props.data.loading) {
      return <Spinner />;
    }

    return (
      <div className="grid">
        <HomeHero history={this.props.history} />

        <div className="section--jobs section section--featured">
          <div className="content">
            <header className="flex items-center">
              <h3>Featured Jobs</h3>
              <a href="/jobs" className="link inline">
                View all Jobs
              </a>
            </header>
            <div>
              {this.props.data.jobs.entries.map(x => (
                <div className="featured--item job--item" key={x.id}>
                  <Avatar name={x.company.name} size={60} />
                  <div className="flex-auto">
                    <h2 className="job--title text-pink">{x.title}</h2>
                    <span className="job--company ttu">{x.company.name}</span>
                  </div>
                  <div>
                    <div className="job--type ttu">{x.type}</div>
                    <div className="job--type ttu">{x.location}</div>
                    <div className="job--type ttu">{x.salary}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="section--companies section section--featured">
          <div className="content">
            <header className="flex items-center">
              <h3>Featured Companies</h3>
              <a href="/companies" className="link inline">
                View all Companies
              </a>
            </header>
            <div>
              {this.props.data.companies.entries.map(x => (
                <div className="company--item featured--item" key={x.id}>
                  <Avatar name={x.name} size={60} />
                  <div className="flex-auto">
                    <h2 className="company--name text-pink">{x.name}</h2>
                    <span className="company--location text-pink">
                      {x.location}
                    </span>
                    <span className="job--type ttu">{x.location}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const HOME_QUERY = gql`
  query HomeQuery {
    jobs(limit: 5) {
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
    companies(limit: 5) {
      entries {
        id
        name
        location
        user {
          id
          name
        }
      }
    }
  }
`;

// compose(graphql(HOME_QUERY)
// export default HomePage;

export default compose(withStyles(s), graphql(HOME_QUERY))(HomePage);

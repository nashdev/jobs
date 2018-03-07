import React from 'react';
import { graphql, compose } from 'react-apollo';

import gql from 'graphql-tag';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './Dashboard.css';
import Spinner from '../../Common/Spinner';

const Dashboard = ({ data }) => {
  if (data.loading || !data.me) {
    return <Spinner />;
  }
  return (
    <div>
      <h2>Dashboard</h2>
      Welcome, {data.me.name}
      <h3>Your Companies</h3>
      {data.me.companies.map(x => (
        <div key={x.id}>
          <h4>{x.name}</h4>
        </div>
      ))}
    </div>
  );
};

const query = gql`
  query {
    me {
      id
      name

      companies {
        id
        name
      }
    }
  }
`;

export default compose(
  withStyles(s),
  graphql(query, {
    options: {
      ssr: true,
    },
  }),
)(Dashboard);

import gql from 'graphql-tag';
import React from 'react';
import Home from './Home';

// import newsQuery from './news.graphql';
import Layout from '../../client/components/Layout';

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
        user {
          id
          name
        }
      }
    }
  }
`;

async function action({ client }) {
  const data = await client.query({
    query: HOME_QUERY,
  });
  return {
    title: 'React Starter Kit',
    component: (
      <Layout>
        <p>Foo</p>
      </Layout>
    ),
  };
}

export default action;

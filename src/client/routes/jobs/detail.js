import React from "react";
import { graphql, compose } from "react-apollo";
import { withRouter, Link } from "react-router-dom";

import gql from "graphql-tag";

class DetailPage extends React.Component {
  render() {
    if (this.props.jobQuery.loading) {
      return (
        <div className="flex w-100 h-100 items-center justify-center pt7">
          <div>Loading (from {process.env.REACT_APP_GRAPHQL_ENDPOINT})</div>
        </div>
      );
    }

    const { job, me } = this.props.jobQuery;
    const action = this._renderAction({
      id: job.id,
      userId: job.user.id,
      currentUserId: me.id
    });

    return (
      <React.Fragment>
        <h1 className="f3 black-80 fw4 lh-solid">
          {job.title} /{" "}
          <Link to={`/company/${job.company.id}`}>{job.company.name}</Link>
        </h1>
        <p className="black-80 fw3">{job.description}</p>
        <p className="black-80 fw3">{job.createdAt}</p>
        {action}
      </React.Fragment>
    );
  }

  _renderAction = ({ id, currentUserId, userId }) => {
    if (currentUserId === userId) {
      return (
        <React.Fragment>
          <a
            className="f6 dim br1 ba ph3 pv2 mb2 dib black pointer"
            onClick={() => this.publishDraft(id)}
          >
            Publish
          </a>{" "}
          <a
            className="f6 dim br1 ba ph3 pv2 mb2 dib black pointer"
            onClick={() => this.deleteJob(id)}
          >
            Delete
          </a>{" "}
          <Link
            to={`/job/${id}/edit`}
            className="f6 dim br1 ba ph3 pv2 mb2 dib black pointer"
          >
            Edit
          </Link>
        </React.Fragment>
      );
    }
  };

  deleteJob = async id => {
    await this.props.deleteJob({
      variables: { id }
    });
    this.props.history.replace("/");
  };

  publishDraft = async id => {
    await this.props.publishDraft({
      variables: { id }
    });
    this.props.history.replace("/");
  };
}

const USER_QUERY = gql`
  query JobQuery($id: ID!) {
    me {
      id
    }
    job(id: $id) {
      id
      title
      description
      user {
        id
      }
      company {
        id
        name
      }
      createdAt
    }
  }
`;

const PUBLISH_MUTATION = gql`
  mutation publish($id: ID!) {
    publish(id: $id) {
      id
      isPublished
    }
  }
`;

const DELETE_MUTATION = gql`
  mutation deleteJob($id: ID!) {
    deleteJob(id: $id) {
      id
    }
  }
`;

export default compose(
  graphql(USER_QUERY, {
    name: "jobQuery",
    options: props => {
      return {
        variables: {
          id: props.match.params.id
        }
      };
    }
  }),
  graphql(PUBLISH_MUTATION, {
    name: "publishDraft"
  }),
  graphql(DELETE_MUTATION, {
    name: "deleteJob"
  }),
  withRouter
)(DetailPage);

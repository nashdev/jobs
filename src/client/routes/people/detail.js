import React from "react";
import { graphql, compose } from "react-apollo";
import { withRouter } from "react-router-dom";
import gql from "graphql-tag";

class DetailPage extends React.Component {
  render() {
    if (this.props.userQuery.loading) {
      return (
        <div className="flex w-100 h-100 items-center justify-center pt7">
          <div>Loading (from {process.env.REACT_APP_GRAPHQL_ENDPOINT})</div>
        </div>
      );
    }

    const { user } = this.props.userQuery;

    let action = this._renderAction(user);

    return (
      <React.Fragment>
        <h1 className="f3 black-80 fw4 lh-solid">{user.name}</h1>
        <p className="black-80 fw3">{user.createdAt}</p>
        {action}
      </React.Fragment>
    );
  }

  _renderAction = ({ id, isPublished }) => {
    if (!isPublished) {
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
            onClick={() => this.deleteUser(id)}
          >
            Delete
          </a>
        </React.Fragment>
      );
    }
    return (
      <a
        className="f6 dim br1 ba ph3 pv2 mb2 dib black pointer"
        onClick={() => this.deleteUser(id)}
      >
        Delete
      </a>
    );
  };

  deleteUser = async id => {
    await this.props.deleteUser({
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
  query UserQuery($id: ID!) {
    user(id: $id) {
      id
      name
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
  mutation deleteUser($id: ID!) {
    deleteUser(id: $id) {
      id
    }
  }
`;

export default compose(
  graphql(USER_QUERY, {
    name: "userQuery",
    options: props => ({
      variables: {
        id: props.match.params.id
      }
    })
  }),
  graphql(PUBLISH_MUTATION, {
    name: "publishDraft"
  }),
  graphql(DELETE_MUTATION, {
    name: "deleteUser"
  }),
  withRouter
)(DetailPage);

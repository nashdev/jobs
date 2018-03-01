import React from "react";
import { graphql, compose } from "react-apollo";
import { withRouter, Link } from "react-router-dom";
import gql from "graphql-tag";

class CompanyDetail extends React.Component {
  render() {
    if (this.props.companyQuery.loading) {
      return (
        <div className="flex w-100 h-100 items-center justify-center pt7">
          <div>Loading (from {process.env.REACT_APP_GRAPHQL_ENDPOINT})</div>
        </div>
      );
    }

    const { company, me } = this.props.companyQuery;
    const action = this._renderAction({
      id: company.id,
      userId: company.user.id,
      currentUserId: me.id
    });
    const routerState = this.props.location.state;
    const { flash } = routerState || {};

    return (
      <React.Fragment>
        {" "}
        {flash &&
          flash.success && (
            <div className="black bg-washed-green pa4 mt4 mb4 mw6 tc f2 f1-m fw4 garamond ttu tracked mt0">
              {flash.success}
            </div>
          )}
        <h1 className="f3 black-80 fw4 lh-solid">{company.name}</h1>
        <p className="black-80 fw3">{company.description}</p>
        <p className="black-80 fw3">{company.createdAt}</p>
        <h2>Jobs</h2>
        <ul>
          {company.jobs.map(job => (
            <li key={job.id}>
              <Link to={`/job/${job.id}`}>{job.title}</Link>
            </li>
          ))}
        </ul>
        <h3>Actions</h3>
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
            onClick={() => this.deleteCompany(id)}
          >
            Delete
          </a>{" "}
          <Link
            to={`/company/${id}/edit`}
            className="f6 dim br1 ba ph3 pv2 mb2 dib black pointer"
          >
            Edit
          </Link>
        </React.Fragment>
      );
    }
  };

  deleteCompany = async id => {
    await this.props.deleteCompany({
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

const COMPANY_QUERY = gql`
  query CompanyQuery($id: ID!) {
    me {
      id
    }
    company(id: $id) {
      id
      name
      description
      createdAt
      jobs {
        id
        title
      }
      user {
        id
      }
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
  mutation deleteCompany($id: ID!) {
    deleteCompany(id: $id) {
      id
    }
  }
`;

export default compose(
  graphql(COMPANY_QUERY, {
    name: "companyQuery",
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
    name: "deleteCompany"
  }),
  withRouter
)(CompanyDetail);

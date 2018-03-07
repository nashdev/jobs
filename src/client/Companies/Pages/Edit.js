import React from 'react';
import { withRouter } from 'react-router-dom';
import { graphql, compose } from 'react-apollo';
import gql from 'graphql-tag';
import Spinner from '../../Common/Spinner';

class CompanyEdit extends React.Component {
  state = {
    id: 0,
    name: '',
    location: '',
    phone: '',
    size: 0,
    description: '',
  };

  componentWillReceiveProps(nextProps) {
    this.setState({
      ...nextProps.getCompany.company,
    });
  }

  render() {
    const routerState = this.props.location.state;
    const { flash } = routerState || {};

    if (this.props.getCompany.loading) {
      return (
        <div className="flex w-100 h-100 items-center justify-center pt7">
          <Spinner />
        </div>
      );
    }

    return (
      <div>
        {flash &&
          flash.success && (
            <div className="flex items-center justify-center pa4 bg-lightest-blue navy">
              <svg
                className="w1"
                data-icon="info"
                viewBox="0 0 32 32"
                style={{ fill: 'currentcolor' }}
              >
                <title>info icon</title>
                <path d="M16 0 A16 16 0 0 1 16 32 A16 16 0 0 1 16 0 M19 15 L13 15 L13 26 L19 26 z M16 6 A3 3 0 0 0 16 12 A3 3 0 0 0 16 6" />
              </svg>
              <span className="lh-title ml3">{flash.success}</span>
            </div>
          )}
        <div className="pa4 flex justify-center bg-white">
          <form onSubmit={this.handlePost}>
            <h1>Update Company</h1>
            <h2>{this.state.name}</h2>
            <input
              autoFocus
              className="w-100 pa2 mv2 br2 b--black-20 bw1"
              onChange={e => this.setState({ name: e.target.value })}
              placeholder="Name"
              type="text"
              value={this.state.name}
            />
            <textarea
              className="db w-100 ba bw1 b--black-20 pa2 br2 mb2"
              cols={50}
              onChange={e => this.setState({ description: e.target.value })}
              placeholder="Description"
              rows={8}
              value={this.state.description}
            />
            <input
              autoFocus
              className="w-100 pa2 mv2 br2 b--black-20 bw1"
              onChange={e => this.setState({ location: e.target.value })}
              placeholder="Location"
              type="text"
              value={this.state.location}
            />
            <input
              autoFocus
              className="w-100 pa2 mv2 br2 b--black-20 bw1"
              onChange={e => this.setState({ phone: e.target.value })}
              placeholder="Phone"
              type="text"
              value={this.state.phone}
            />
            <input
              autoFocus
              className="w-100 pa2 mv2 br2 b--black-20 bw1"
              onChange={e => this.setState({ size: e.target.value })}
              placeholder="Size"
              type="text"
              value={this.state.size}
            />
            <input
              className={`pa3 bg-black-10 bn ${this.state.name &&
                this.state.description &&
                'dim pointer'}`}
              disabled={!this.state.name || !this.state.description}
              type="submit"
              value="Update"
            />{' '}
            <a className="f6 pointer" onClick={this.props.history.goBack}>
              or cancel
            </a>
          </form>
        </div>
      </div>
    );
  }

  handlePost = async e => {
    e.preventDefault();
    const { id, name, location, phone, size, description } = this.state;
    const { data } = await this.props.createDraftCompany({
      variables: { id, name, location, phone, size, description },
    });

    console.log('data', data);

    this.props.history.replace(`/company/${data.updateCompany.id}/edit`, {
      flash: {
        success: 'You updated the company!',
      },
    });
  };
}

const GET_COMPANY_QUERY = gql`
  query GetCompany($id: ID!) {
    company(id: $id) {
      id
      name
      location
      phone
      size
      description
    }
  }
`;

const CREATE_DRAFT_MUTATION = gql`
  mutation CreateDraftCompany(
    $id: ID!
    $name: String!
    $description: String!
    $location: String
    $phone: String
    $size: Int
  ) {
    updateCompany(
      company: {
        id: $id
        name: $name
        description: $description
        location: $location
        phone: $phone
        size: $size
      }
    ) {
      id
      name
      location
      phone
      size
      description
    }
  }
`;

export default compose(
  graphql(GET_COMPANY_QUERY, {
    name: 'getCompany',
    options: props => ({
      variables: {
        id: props.match.params.id,
      },
    }),
  }),
  graphql(CREATE_DRAFT_MUTATION, {
    name: 'createDraftCompany',
  }),
  withRouter,
)(CompanyEdit);

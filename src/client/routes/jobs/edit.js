import React from 'react';
import { withRouter } from 'react-router-dom';
import { graphql, compose } from 'react-apollo';
import gql from 'graphql-tag';

import Spinner from '../../components/Spinner';

class JobEdit extends React.Component {
  state = {
    company: {
      id: 0,
    },
    title: '',
    description: '',
    type: '',
    recruiter: false,
    recruiterAgency: '',
    location: '',
    contactSlack: '',
    contactEmail: '',
    contactWebsite: '',
    contactPerson: '',
    contactPhone: '',
    experienceRange: '',
    salaryRange: 100,
    remoteAvailable: false,
  };

  componentWillReceiveProps(nextProps) {
    this.setState({
      ...nextProps.getJob.job,
    });
  }

  render() {
    const routerState = this.props.location.state;
    const { flash } = routerState || {};

    if (this.props.getJob.loading || this.props.getUserCompanies.loading) {
      return (
        <div className="flex w-100 h-100 items-center justify-center pt7">
          <Spinner />
        </div>
      );
    }

    const companies = this.props.getUserCompanies.me.companies;

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
            <h1>Update Job</h1>
            <h2>{this.state.name}</h2>
            <select
              name="companyId"
              value={this.state.company.id}
              onChange={e => this.setState({ company: { id: e.target.value } })}
            >
              <option>Select Company</option>
              {companies.map(x => (
                <option key={x.id} value={x.id}>
                  {x.name}
                </option>
              ))}
            </select>
            <input
              autoFocus
              className="w-100 pa2 mv2 br2 b--black-20 bw1"
              onChange={e => this.setState({ title: e.target.value })}
              placeholder="Job Title"
              type="text"
              value={this.state.title}
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
              onChange={e => this.setState({ type: e.target.value })}
              placeholder="Type"
              type="text"
              value={this.state.type}
            />
            <input
              autoFocus
              className="w-100 pa2 mv2 br2 b--black-20 bw1"
              onChange={e => this.setState({ recruiter: e.target.value })}
              placeholder="Recruiter"
              type="text"
              value={this.state.recruiter}
            />
            <input
              autoFocus
              className="w-100 pa2 mv2 br2 b--black-20 bw1"
              onChange={e => this.setState({ recruiterAgency: e.target.value })}
              placeholder="Recruiter agency"
              type="text"
              value={this.state.recruiterAgency}
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
              onChange={e => this.setState({ contactSlack: e.target.value })}
              placeholder="Contact slack"
              type="text"
              value={this.state.contactSlack}
            />
            <input
              autoFocus
              className="w-100 pa2 mv2 br2 b--black-20 bw1"
              onChange={e => this.setState({ contactEmail: e.target.value })}
              placeholder="Contact email"
              type="text"
              value={this.state.contactEmail}
            />
            <input
              autoFocus
              className="w-100 pa2 mv2 br2 b--black-20 bw1"
              onChange={e => this.setState({ contactWebsite: e.target.value })}
              placeholder="Contact website"
              type="text"
              value={this.state.contactWebsite}
            />
            <input
              autoFocus
              className="w-100 pa2 mv2 br2 b--black-20 bw1"
              onChange={e => this.setState({ contactPerson: e.target.value })}
              placeholder="Contact person"
              type="text"
              value={this.state.contactPerson}
            />
            <input
              autoFocus
              className="w-100 pa2 mv2 br2 b--black-20 bw1"
              onChange={e => this.setState({ contactPhone: e.target.value })}
              placeholder="Contact phone"
              type="text"
              value={this.state.contactPhone}
            />
            <input
              autoFocus
              className="w-100 pa2 mv2 br2 b--black-20 bw1"
              onChange={e => this.setState({ experienceRange: e.target.value })}
              placeholder="Experience range"
              type="text"
              value={this.state.experienceRange}
            />
            <input
              autoFocus
              className="w-100 pa2 mv2 br2 b--black-20 bw1"
              onChange={e => this.setState({ salaryRange: e.target.value })}
              placeholder="Salary range"
              type="text"
              value={this.state.salaryRange}
            />
            <input
              autoFocus
              className="w-100 pa2 mv2 br2 b--black-20 bw1"
              onChange={e => this.setState({ remoteAvailable: e.target.value })}
              placeholder="Remote available"
              type="text"
              value={this.state.remoteAvailable}
            />
            <input
              className={`pa3 bg-black-10 bn ${this.state.title &&
                this.state.description &&
                'dim pointer'}`}
              disabled={!this.state.title || !this.state.description}
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
    const {
      id,
      company: { id: companyId },
      title,
      description,
      type,
      recruiter,
      recruiterAgency,
      location,
      contactSlack,
      contactEmail,
      contactWebsite,
      contactPerson,
      contactPhone,
      experienceRange,
      salaryRange,
      remoteAvailable,
    } = this.state;
    const { data } = await this.props.createDraftJob({
      variables: {
        id,
        companyId,
        title,
        description,
        type,
        recruiter,
        recruiterAgency,
        location,
        contactSlack,
        contactEmail,
        contactWebsite,
        contactPerson,
        contactPhone,
        experienceRange,
        salaryRange,
        remoteAvailable,
      },
    });

    this.props.history.replace(`/job/${data.updateJob.id}/edit`, {
      flash: {
        success: 'You updated the job!',
      },
    });
  };
}

const GET_JOB_QUERY = gql`
  query GetJob($id: ID!) {
    job(id: $id) {
      id
      company {
        id
        name
      }
      title
      description
      type
      recruiter
      recruiterAgency
      location
      contact {
        slack
        email
        website
        person
        phone
      }
      experienceRange
      salary
      remote
    }
  }
`;

const GET_COMPANIES_QUERY = gql`
  query GetUserCompanies {
    me {
      id
      companies {
        id
        name
      }
    }
  }
`;

const CREATE_DRAFT_MUTATION = gql`
  mutation CreateDraftJob(
    $id: ID!
    $companyId: ID!
    $title: String!
    $description: String!
    $type: String!
    $recruiter: Boolean!
    $recruiterAgency: String
    $location: String!
    $contactSlack: String
    $contactEmail: String!
    $contactWebsite: String
    $contactPerson: String!
    $contactPhone: String
    $experienceRange: Int!
    $salaryRange: Int!
    $remoteAvailable: Boolean!
  ) {
    updateJob(
      job: {
        id: $id
        company_id: $companyId
        title: $title
        description: $description
        type: $type
        recruiter: $recruiter
        recruiter_agency: $recruiterAgency
        location: $location
        contact_slack: $contactSlack
        contact_email: $contactEmail
        contact_website: $contactWebsite
        contact_person: $contactPerson
        contact_phone: $contactPhone
        experience_range: $experienceRange
        salary_range: $salaryRange
        remote_available: $remoteAvailable
      }
    ) {
      id
      company {
        id
        name
      }
      title
      description
      type
      recruiter
      recruiterAgency
      location
      contact {
        slack
        email
        website
        person
        phone
      }
      experienceRange
      salary
      remote
    }
  }
`;

export default compose(
  graphql(GET_JOB_QUERY, {
    name: 'getJob',
    options: props => ({
      variables: {
        id: props.match.params.id,
      },
    }),
  }),
  graphql(GET_COMPANIES_QUERY, {
    name: 'getUserCompanies',
  }),
  graphql(CREATE_DRAFT_MUTATION, {
    name: 'createDraftJob',
  }),
  withRouter,
)(JobEdit);

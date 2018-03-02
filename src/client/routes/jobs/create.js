import React from 'react';
import { withRouter } from 'react-router-dom';
import { graphql, compose } from 'react-apollo';
import gql from 'graphql-tag';

import Spinner from '../../components/Spinner';

class CreateJob extends React.Component {
  state = {
    companyId: 0,
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
    salaryRange: '',
    remoteAvailable: false,
  };

  render() {
    if (this.props.error) {
      return <div>Error</div>;
    }
    if (this.props.loading) {
      return (
        <div className="flex w-100 h-100 items-center justify-center pt7">
          <Spinner />
        </div>
      );
    }
    return (
      <div className="pa4 flex justify-center bg-white">
        <form onSubmit={this.handlePost}>
          <h1>Create Job</h1>
          <select
            name="companyId"
            value={this.state.companyId}
            onChange={e => this.setState({ companyId: e.target.value })}
          >
            <option>Select Company</option>
            {this.props.companies.map(x => (
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
            value="Create"
          />{' '}
          <a className="f6 pointer" onClick={this.props.history.goBack}>
            or cancel
          </a>
        </form>
      </div>
    );
  }

  handlePost = async e => {
    e.preventDefault();
    const {
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
    } = this.state;
    const { data } = await this.props.createDraftJob({
      variables: {
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

    this.props.history.replace(`/job/${data.createJob.id}`, {
      flash: {
        success: 'You created a job!',
      },
    });
  };
}

const GET_USER_COMPANIES = gql`
  query GetUserCompanies {
    me {
      id
      companies {
        id
        name
        createdAt
      }
    }
  }
`;

const CREATE_DRAFT_MUTATION = gql`
  mutation CreateDraftJob(
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
    createJob(
      job: {
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
  graphql(GET_USER_COMPANIES, {
    props({ data: { loading, error, me, fetchMore, refetch } }) {
      const companies = !loading ? me.companies : [];
      return {
        loading,
        companies,
        fetchMore,
        refetch,
        error,
      };
    },
  }),
  graphql(CREATE_DRAFT_MUTATION, {
    name: 'createDraftJob',
  }),
  withRouter,
)(CreateJob);

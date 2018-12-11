import React from "react";
import { graphql, compose } from "react-apollo";
import { withRouter } from "react-router-dom";
import gql from "graphql-tag";
import Helmet from "react-helmet";

import JobListitem from "../../Jobs/Components/JobListitem";
import CompanyProfileCard from "../Components/CompanyProfileCard";
import Spinner from "../../Common/Spinner";
import MarkdownViewer from "../../Common/Markdown";
import HeroBanner from "../../Common/HeroBanner";
import ActionList from "../../Common/ActionList";
import ProfileLayout from "../../Common/ProfileLayout";

class CompanyDetailPage extends React.Component {
  renderAction = (company, me) => {
    if (!company || !me) {
      return null;
    }

    const {
      id,
      user: { id: userId },
    } = company;
    const { id: currentUserId } = me;

    if (currentUserId === userId) {
      return (
        <ActionList
          actions={[
            {
              url: `/company/${id}/edit`,
              label: "Edit",
              icon: "fas fa-edit",
            },
            {
              url: "",
              onClick: (e) => {
                e.preventDefault();
                this.deleteCompany(company);
              },
              label: "Delete",
              icon: "fas fa-trash",
            },
          ]}
        />
      );
    }
  };

  deleteCompany = async (company) => {
    if (
      confirm(`Removing this company will also delete ${
        company.jobs.length
      } jobs associated with this company. Are you sure you want to delete the company "${
        company.name
      }" ?
    `)
    ) {
    }
    await this.props.deleteCompany({
      variables: { id: company.id },
    });
    this.props.history.replace("/dashboard/companies", {
      flash: {
        status: "success",
        title: "Deleted Company",
        message: `You have successfully deleted the company "${company.name}".`,
      },
    });
  };

  render() {
    const { location, companyQuery } = this.props;
    const { company, me } = companyQuery;
    const action = this.renderAction(company, me);

    if (companyQuery.loading) {
      return (
        <div className="flex w-100 h-100 items-center justify-center pt7">
          <Spinner />
        </div>
      );
    }

    return (
      <React.Fragment>
        <Helmet>
          <title>{`${company.name} in ${company.location}`}</title>
        </Helmet>

        <ProfileLayout
          name={company.name}
          createdAt={company.createdAt}
          shortDescription={company.short_description}
          description={company.description}
          createdAtLabel="Joined"
        >
          <ProfileLayout.Position position="hero">
            <HeroBanner
              title="Company Details"
              subtitle={company.name}
              location={location}
            />
          </ProfileLayout.Position>

          <ProfileLayout.Position position="sidebar">
            <CompanyProfileCard {...company} />
          </ProfileLayout.Position>

          <ProfileLayout.Position position="actions">
            {action && <section>{action}</section>}
          </ProfileLayout.Position>

          <ProfileLayout.Position position="content">
            <MarkdownViewer markdown={company.description} />
          </ProfileLayout.Position>

          <ProfileLayout.Position position="related">
            <React.Fragment>
              <h3>Jobs</h3>
              {!company.jobs.length && (
                <div>
                  <strong>Sorry!</strong> This company hasn't posted any jobs
                  yet.
                </div>
              )}
              {company.jobs.map((job) => (
                <JobListitem key={job.id} job={job} />
              ))}
            </React.Fragment>
          </ProfileLayout.Position>
        </ProfileLayout>
      </React.Fragment>
    );
  }
}

const COMPANY_QUERY = gql`
  query CompanyQuery($id: ID!) {
    me {
      id
    }
    company(id: $id) {
      id
      name
      short_description
      location
      description
      twitter
      facebook
      github
      linkedin
      createdAt
      jobs {
        id
        title
        short_description
        location
        company {
          id
          name
        }
      }
      user {
        id
      }
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
    options: (props) => ({
      variables: {
        id: props.match.params.id,
      },
    }),
  }),

  graphql(DELETE_MUTATION, {
    name: "deleteCompany",
  }),
  withRouter
)(CompanyDetailPage);

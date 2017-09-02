import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router";
import moment from "moment";

import Messages from "./Messages";
import { getAllCompanies } from "../actions/companies";
import { getAllJobs } from "../actions/jobs";

class Home extends React.Component {
  componentDidMount() {
    this.props.dispatch(getAllJobs());
    this.props.dispatch(getAllCompanies());
  }

  render() {
    const { jobs, jobById, companies, companyById } = this.props;
    const latest5Jobs = jobs.slice(0, 5);
    const latest5Companies = companies.slice(0, 5);
    return (
      <div>
        <section className="hero is-primary is-large is-bold">
          <div className="hero-body">
            <div className="container is-fluid">
              <h1 className="title">NashDev Jobs</h1>
            </div>
          </div>
        </section>
        <section className="section">
          <Messages messages={this.props.messages} />
          <div className="columns">
            <div className="column is-two-thirds">
              <section className="section">
                <h1 className="title is-1">Recent Jobs</h1>
                {latest5Jobs.map(id => {
                  const job = jobById[id];
                  const company = companyById[job.company_id];
                  return (
                    <div key={job.id}>
                      <h2>
                        <Link to={`/jobs/${id}`}>{job.title}</Link> at{" "}
                        <Link to={`/companies/${company.id}`}>
                          {company.name}
                        </Link>{" "}
                        in {job.location}
                      </h2>
                      <p title={`Updated ${moment(job.updated_at).fromNow()}`}>
                        Added {moment(job.created_at).fromNow()}
                      </p>
                    </div>
                  );
                })}
                <Link to="/jobs" className="button">
                  View All Jobs
                </Link>
              </section>
              <section className="section">
                <h1 className="title is-1">Recent Companies</h1>
                {latest5Companies.map(id => {
                  const company = companyById[id];
                  return (
                    <div key={company.id}>
                      <h2>
                        <Link to={`/companies/${company.id}`}>
                          {company.name}
                        </Link>
                      </h2>
                      <p
                        title={`Updated ${moment(
                          company.updated_at
                        ).fromNow()}`}
                      >
                        Added {moment(company.created_at).fromNow()}
                      </p>
                    </div>
                  );
                })}

                <Link to="/companies" className="button">
                  View All Companies
                </Link>
              </section>
            </div>
            <aside className="column">
              <h4 className="title is-4">Quick Links</h4>
              <Link to="/jobs/add" className="button">
                Add Job
              </Link>{" "}
              <Link to="/companies/add" className="button">
                Add Company
              </Link>
            </aside>
          </div>
        </section>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    messages: state.messages,
    jobs: state.jobs.ids,
    jobById: state.jobs.byId,
    companies: state.companies.ids,
    companyById: state.companies.byId
  };
};

export default connect(mapStateToProps)(Home);

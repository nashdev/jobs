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
      <div className="container-fluid">
        <Messages messages={this.props.messages} />
        <div className="row">
          <div className="col-lg-8 col-sm-12">
            <h1 className="masthead">Recent Jobs</h1>
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
            <Link to="/jobs" className="btn">
              View All Jobs
            </Link>
            <h1 className="masthead">Recent Companies</h1>
            {latest5Companies.map(id => {
              const company = companyById[id];
              return (
                <div key={company.id}>
                  <h2>
                    <Link to={`/companies/${company.id}`}>
                      {company.name}
                    </Link>
                  </h2>
                  <p title={`Updated ${moment(company.updated_at).fromNow()}`}>
                    Added {moment(company.created_at).fromNow()}
                  </p>
                </div>
              );
            })}

            <Link to="/companies" className="btn">
              View All Companies
            </Link>
          </div>
          <aside className="col-lg-4 col-sm-12">
            <h4>Quick Links</h4>
            <Link to="/jobs/add" className="btn">
              Add Job
            </Link>{" "}
            <Link to="/companies/add" className="btn">
              Add Company
            </Link>
            <h4>Important Info</h4>
            Make sure you read and understand the following before using the
            site:
            <ul>
              <li>
                <Link to="/tos">Terms of Service</Link>
              </li>
              <li>
                <Link to="/privacy">Privacy Policy</Link>
              </li>
              <li>
                <Link to="/conduct">Code of Conduct</Link>
              </li>
            </ul>
          </aside>
        </div>
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

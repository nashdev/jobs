import React, { Component } from "react";
import { connect } from "react-redux";
import { Link, browserHistory } from "react-router";
import Pagination from "rc-pagination";
import EN_US from "rc-pagination/lib/locale/en_US";
import moment from "moment";
import Messages from "../Messages";
import { getAllJobs } from "../../actions/jobs";

class JobList extends Component {
  constructor(props) {
    super(props);

    this.onPageChange = this.onPageChange.bind(this);
  }

  componentDidMount() {
    this.props.dispatch(getAllJobs(this.props.params.page));
  }

  onPageChange(page) {
    browserHistory.push(`/jobs/list/${page}`);
    this.props.dispatch(getAllJobs(page));
  }

  render() {
    const { jobById, companyById } = this.props;

    return (
      <div className="container-fluid">
        <Messages messages={this.props.messages} />
        <h1 className="masthead">Browse Jobs</h1>
        <Link to="/jobs/add" className="btn">
          Add Job
        </Link>

        {!this.props.jobs.length && <div className="loading" />}

        {this.props.jobs.map(id => {
          const job = jobById[id];
          const company = companyById[job.company_id];
          return (
            <div key={job.id}>
              <h2>
                <Link to={`/jobs/${id}`}>{job.title}</Link> at{" "}
                <Link to={`/companies/${company.id}`}>{company.name}</Link> in {" "}
                {job.location}
              </h2>
              <p title={`Updated ${moment(job.updated_at).fromNow()}`}>
                Added {moment(job.created_at).fromNow()}
              </p>
            </div>
          );
        })}
        <Pagination
          prefixCls="pagination"
          locale={EN_US}
          showTotal={(total, range) =>
            `${range[0]} - ${range[1]} of ${total} items`}
          total={this.props.pagination.rowCount}
          current={this.props.pagination.page}
          pageSize={this.props.pagination.pageSize}
          onChange={this.onPageChange}
        />
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    messages: state.messages,
    pagination: state.jobs.pagination,
    jobs: state.jobs.ids,
    jobById: state.jobs.byId,
    companies: state.companies.ids,
    companyById: state.companies.byId,
    auth: state.auth
  };
};

export default connect(mapStateToProps)(JobList);

import React, { Component } from "react";
import { connect } from "react-redux";
import { Link, browserHistory } from "react-router";
import Pagination from "rc-pagination";
import EN_US from "rc-pagination/lib/locale/en_US";
import moment from "moment";
import truncate from "lodash/truncate";
import Messages from "../Messages";
import { getAllJobs } from "../../actions/jobs";
import TagList from "./Tags";
import MarkdownViewer from "../Markdown/Viewer";

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
      <div>
        <section className="hero is-medium is-primary is-bold">
          <div className="hero-body">
            <div className="container is-fluid">
              <h1 className="title">Browse Jobs</h1>
              <Link to="/jobs/add" className="button is-outlined">
                <span className="icon is-small">
                  <i className="fa fa-plus-circle" />
                </span>
                <span>Post your job</span>
              </Link>
            </div>
          </div>
        </section>
        {this.props.messages && <Messages messages={this.props.messages} />}
        <section className="section jobs-list">
          <div className="container is-fluid">
            <div className="columns is-multiline">
              {!this.props.jobs.length && <div className="is-loading" />}

              {this.props.jobs.map(id => {
                const job = jobById[id];
                const company = companyById[job.company_id];
                return (
                  <div className="column is-one-third">
                    <div className="card" key={job.id}>
                      <header className="card-header">
                        <p className="card-header-title is-capitalized">
                          <Link to={`/jobs/${id}`}>{job.title}</Link>
                        </p>

                        <Link
                          to={`/companies/${company.id}`}
                          className="card-header-icon"
                        >
                          {company.name}
                        </Link>
                      </header>
                      <div className="card-content">
                        <div className="content">
                          <div className="scroll-content">
                            <MarkdownViewer
                              markdown={truncate(job.description, {
                                length: 900
                              })}
                            />
                          </div>
                          <small
                            title={`Added ${moment(
                              job.created_at
                            ).calendar()}. Updated ${moment(
                              job.updated_at
                            ).fromNow()}.`}
                          >
                            Added {moment(job.created_at).fromNow()}.
                          </small>
                          <hr className="divider" />
                          <TagList job={job} />
                        </div>
                      </div>
                      <div className="card-footer-offset"></div>
                      <footer className="card-footer">
                        <Link to={`/jobs/${id}`} className="card-footer-item">
                          Details
                        </Link>
                        <Link
                          to={`/companies/${company.id}`}
                          className="card-footer-item is-hidden-mobile"
                        >
                          More by {company.name}
                        </Link>
                      </footer>
                    </div>
                  </div>
                );
              })}
            </div>
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
        </section>
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

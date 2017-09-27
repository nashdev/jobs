import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import MarkdownViewer from "client/markdown/components/viewer";
import TagList from "client/jobs/components/tags";
import { getJob } from "client/jobs/actions";

class JobView extends Component {
  componentDidMount() {
    const { match } = this.props;
    this.props.getJob(match.params.id);
  }
  render() {
    const { job, user, companies } = this.props;

    if (!job) {
      return <div className="is-loading" />;
    }

    const company = companies[job.company_id];

    return (
      <div>
        <section className="hero is-medium is-primary is-bold">
          <div className="hero-body">
            <div className="container is-fluid">
              <div className="columns">
                <div className="column is-two-thirds">
                  <h1 className="title">{job.title}</h1>
                  <h2 className="subtitle">
                    at{" "}
                    <Link to={`/companies/${company.id}`}>
                      {company.name}
                    </Link>{" "}
                    in {job.location}.
                  </h2>
                </div>

                <div className="column">
                  <TagList job={job} />
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className="section">
          <div className="container is-fluid">
            <div className="columns">
              <div className="column is-three-quarters">
                <section className="section">
                  <h2 className="subtitle is-2">Job Details</h2>
                  <div className="content job-description">
                    <MarkdownViewer markdown={job.description} />
                  </div>
                </section>
                <section className="section">
                  <h3 className="subtitle is-3">Company Overview</h3>

                  <div className="content company-description">
                    <MarkdownViewer markdown={company.description} />
                  </div>
                </section>
                <section className="section">
                  <header>
                    <h3 className="subtitle is-3">Related Jobs</h3>
                  </header>
                  <p>
                    This feature has not been added yet. Would you like to{" "}
                    <a
                      href="https://github.com/egdelwonk/nashdev-jobs/issues/13"
                      target="_blank"
                    >
                      implement
                    </a>{" "}
                    it?
                  </p>
                </section>
              </div>
              <aside className="column">
                <section className="section">
                  <h4 className="subtitle is-4">Contact Details</h4>
                  <dl className="is-capitalized">
                    <dt>
                      <strong>Company:</strong>
                    </dt>
                    <dd>{company.name}</dd>
                  </dl>
                  {job.phone && (
                    <dl className="is-capitalized">
                      <dt>
                        <strong>Phone:</strong>
                      </dt>
                      <dd>
                        <a href={`tel:${job.phone}`}>{job.phone}</a>
                      </dd>
                    </dl>
                  )}
                  <dl className="is-capitalized">
                    <dt>
                      <strong>Hiring Manager:</strong>
                    </dt>
                    <dd>{job.contact_person}</dd>
                  </dl>
                  {job.contact_slack && (
                    <dl className="is-capitalized">
                      <dt>
                        <strong>NashDev Slack:</strong>
                      </dt>
                      <dd>
                        <a href="http://nashdev.com">@{job.contact_slack}</a>
                      </dd>
                    </dl>
                  )}
                  <dl className="is-capitalized">
                    <dt>
                      <strong>E-mail:</strong>
                    </dt>
                    <dd>
                      <a
                        href={`mailto:${job.contact_email}`}
                        target="_blank"
                        className="btn"
                      >
                        {job.contact_person}
                      </a>
                    </dd>
                  </dl>
                  <hr className="divider" />
                  {job.contact_website && (
                    <div className="is-capitalized">
                      <a
                        href={job.contact_website}
                        target="_blank"
                        className="button is-outlined"
                      >
                        <span className="icon is-small">
                          <i className="fa fa-external-link" />
                        </span>
                        <span>View Website</span>
                      </a>
                    </div>
                  )}
                </section>
                {user &&
                user.id == job.user_id && (
                  <section className="section">
                    <h4 className="subtitle is-4">Manage Listing</h4>
                    <Link
                      to={`/jobs/${job.id}/edit`}
                      className="button is-small"
                    >
                      <span className="icon is-small">
                        <i className="fa fa-pencil" />
                      </span>
                      <span>Edit</span>
                    </Link>{" "}
                    {" "}
                    <Link
                      to={`/jobs/${job.id}/delete`}
                      className="button is-small is-danger"
                    >
                      <span className="icon is-small">
                        <i className="fa fa-remove" />
                      </span>
                      <span>Delete</span>
                    </Link>
                  </section>
                )}
              </aside>
            </div>
          </div>
        </section>
      </div>
    );
  }
}
const mapStateToProps = (state, ownProps) => {
  return {
    messages: state.messages,
    job: state.jobs.byId[ownProps.match.params.id],
    user: state.auth.user,
    users: state.users.byId,
    companies: state.companies.byId
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getJob: id => {
      dispatch(getJob(id));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(JobView);

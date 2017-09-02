import React, { Component } from "react";
import { Link } from "react-router";
import { connect } from "react-redux";
import moment from "moment";
import MarkdownViewer from "../Markdown/Viewer";
import { getCompany } from "../../actions/companies";
import Messages from "../Messages";
class CompanyView extends Component {
  componentDidMount() {
    const { params } = this.props;
    this.props.getCompany(params.id);
  }
  render() {
    const { company, jobById, user } = this.props;

    if (!company) {
      return <div className="is-loading" />;
    }

    const jobs = company.jobs ? company.jobs : [];

    return (
      <div>
        <section className="hero is-medium is-primary is-bold">
          <div className="hero-body">
            <div className="container is-fluid">
              <h1 className="title">{company.name}</h1>
            </div>
          </div>
        </section>
        <section className="section">
          <div className="container is-fluid">
            <div className="columns">
              <div className="column is-three-quarters">
                <section className="section">
                  <h2 className="subtitle is-2">Company Details</h2>
                  <div className="content company-description">
                    <MarkdownViewer markdown={company.description} />
                  </div>
                </section>

                <section className="section">
                  <h3 className="subtitle is-3">Jobs</h3>

                  {!jobs.length && (
                    <p className="text-info">
                      Sorry, this company has not posted any jobs yet.
                    </p>
                  )}

                  {jobs.map(id => {
                    const job = jobById[id];

                    return (
                      <div key={job.id}>
                        <h5>
                          <Link to={`/jobs/${job.id}`}>{job.title}</Link>
                        </h5>
                        <p
                          title={`Updated ${moment(job.updated_at).fromNow()}`}
                        >
                          Added {moment(job.created_at).fromNow()}
                        </p>
                      </div>
                    );
                  })}
                </section>
              </div>
              <aside className="column">
                <section className="section">
                  <h4 className="subtitle is-4">Contact Details</h4>

                  {company.phone && (
                    <dl className="is-capitalized">
                      <dt>
                        <strong>Phone:</strong>
                      </dt>
                      <dd>
                        <a href={`tel:${company.phone}`}>{company.phone}</a>
                      </dd>
                    </dl>
                  )}
                  <dl className="is-capitalized">
                    <dt>
                      <strong>Location:</strong>
                    </dt>
                    <dd>{company.location}</dd>
                  </dl>
                  {company.size && (
                    <dl className="is-capitalized">
                      <dt>
                        <strong>Company Size:</strong>
                      </dt>
                      <dd>{company.size}</dd>
                    </dl>
                  )}
                </section>
                {user &&
                user.id == company.user_id && (
                  <section className="section">
                    <h4 className="subtitle is-4">Manage Company</h4>
                    <Link
                      to={`/companies/${company.id}/edit`}
                      className="button is-small"
                    >
                      <span className="icon is-small">
                        <i className="fa fa-pencil" />
                      </span>
                      <span>Edit</span>
                    </Link>{" "}
                    {" "}
                    <Link
                      to={`/companies/${company.id}/delete`}
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
    company: state.companies.byId[ownProps.params.id],
    jobById: state.jobs.byId,
    user: state.auth.user
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getCompany: id => {
      dispatch(getCompany(id));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CompanyView);

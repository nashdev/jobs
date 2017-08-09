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
    const { company, jobById } = this.props;

    if (!company) {
      return <div className="loading" />;
    }

    const jobs = company.jobs ? company.jobs : [];

    return (
      <div className="container-fluid">
        <Messages messages={this.props.messages} />
        <h1 className="masthead">
          {company.name}
        </h1>
        <div className="row">
          <div className="col-lg-8 col-sm-12">
            <section className="company-description">
              <MarkdownViewer markdown={company.description} />
            </section>
            <section>
              <header>
                <h2>
                  Jobs ({jobs.length})
                </h2>
              </header>
              {!jobs.length &&
                <p className="text-info">
                  Sorry, this company has not posted any jobs yet.
                </p>}

              {jobs.map(id => {
                const job = jobById[id];

                return (
                  <div key={job.id}>
                    <h5>
                      <Link to={`/jobs/${job.id}`}>
                        {job.title}
                      </Link>
                    </h5>
                    <p title={`Updated ${moment(job.updated_at).fromNow()}`}>
                      Added {moment(job.created_at).fromNow()}
                    </p>
                  </div>
                );
              })}
            </section>
            <section>
              <header>
                <h2>People</h2>
                <p>
                  This feature has not been added yet. Would you like to{" "}
                  <a
                    href="https://github.com/egdelwonk/nashdev-jobs/issues/8"
                    target="_blank"
                  >
                    implement
                  </a>{" "}
                  it?{" "}
                </p>
              </header>
            </section>
          </div>

          <aside className="col-lg-4 col-sm-12">
            <section>
              <header>
                <h4>
                  Contact {company.name}
                </h4>
              </header>
              <div>
                Phone: <a href={`tel:${company.phone}`}>{company.phone}</a>
              </div>
              <div>
                Location: {company.location}
              </div>
              <div>
                Company Size: {company.size}
              </div>
            </section>

            {this.props.user &&
              this.props.user.id == company.user_id &&
              <section>
                <header>
                  <h4>Manage</h4>
                </header>
                <Link to={`/companies/${company.id}/edit`} className="btn">
                  Edit
                </Link>{" "}
                {" "}
                <Link to={`/companies/${company.id}/delete`} className="btn">
                  Delete
                </Link>
              </section>}
          </aside>
        </div>
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

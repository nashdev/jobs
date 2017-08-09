import React, { Component } from "react";
import { Link } from "react-router";
import { connect } from "react-redux";
import capitalize from "lodash/capitalize";
import MarkdownViewer from "../Markdown/Viewer";
import { getExperience, getType } from "./Form";

import { getJob } from "../../actions/jobs";
import Messages from "../Messages";

class JobView extends Component {
  componentDidMount() {
    const { params } = this.props;
    this.props.getJob(params.id);
  }
  render() {
    const { job, user, companies } = this.props;

    if (!job) {
      return <div className="loading" />;
    }

    const company = companies[job.company_id];

    return (
      <div className="container-fluid">
        <Messages messages={this.props.messages} />
        <h1 className="masthead">
          {job.title} at{" "}
          <Link to={`/companies/${company.id}`}>{company.name}</Link> in{" "}
          {job.location}
        </h1>
        <section>
          <div
            className="job-tag job-type"
            title={`${capitalize(job.type)} employment.`}
          >
            {getType(job.type)} @ ${job.salary_range
              .toString()
              .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}/yr
          </div>
          <div
            className="job-tag job-experience"
            title={`${capitalize(getExperience(job.experience))}`}
          >
            XP: {getExperience(job.experience_range)}
          </div>
          {job.remote_available &&
            <div
              className="job-tag job-remote"
              title="This job is remote friendly!"
            >
              Remote Position
            </div>}
          {job.recruiter &&
            <div
              className="job-tag job-recruiter"
              title={`Posted by ${job.recruiter_agency}`}
            >
              Recruiter Listing
            </div>}
        </section>
        <div className="row">
          <div className="col-lg-8 col-sm-12">
            <section>
              <header>
                <h2>Job Details</h2>
              </header>
              <div className="job-description">
                <MarkdownViewer markdown={job.description} />
              </div>
            </section>
            <section>
              <header>
                <h3>Company Overview</h3>
              </header>
              <div className="company-description">
                <MarkdownViewer markdown={company.description} />
              </div>
            </section>
            <section>
              <header>
                <h3>Related Jobs</h3>
              </header>
              <p>
                This feature has not been added yet. Would you like to{" "}
                <a
                  href="https://github.com/egdelwonk/nashdev-jobs/issues/13"
                  target="_blank"
                >
                  implement
                </a>{" "}
                it?{" "}
              </p>
            </section>
          </div>
          <aside className="col-lg-4 col-sm-12 ">
            <section>
              <header>
                <h4>
                  Contact {company.name}
                </h4>
              </header>
              {job.phone &&
                <div>
                  Phone: <a href={`tel:${job.phone}`}>{job.phone}</a>
                </div>}
              <div>
                Hiring Manager: {job.contact_person}
              </div>
              <div>
                NashDev Slack:{" "}
                <a href="http://nashdev.com">@{job.contact_slack}</a>
              </div>
              {job.contact_website &&
                <div>
                  <br />
                  <a href={job.contact_website} target="_blank" className="btn">
                    View Website
                  </a>
                </div>}
              {!job.contact_website &&
                <div>
                  <br />
                  <a href={`mailto:${job.contact_email}`} target="_blank" className="btn">
                    E-mail {job.contact_person}
                  </a>
                </div>}
            </section>

            {user &&
              user.id == job.user_id &&
              <section>
                <header>
                  <h4>Manage Listing</h4>
                </header>
                <Link to={`/jobs/${job.id}/edit`} className="btn">
                  Edit
                </Link>{" "}
                {" "}
                <Link to={`/jobs/${job.id}/delete`} className="btn">
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
    job: state.jobs.byId[ownProps.params.id],
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

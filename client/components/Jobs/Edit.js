import React, { Component } from "react";
import { Link } from "react-router";
import { connect } from "react-redux";
import { reduxForm } from "redux-form";
import pick from "lodash/pick";
import { editJob, getJob } from "../../actions/jobs";
import { getOwnedCompanies } from "../../actions/companies";
import { JobForm } from "./Form";
import Messages from "../Messages";

class EditJobForm extends Component {
  componentDidMount() {
    const { params } = this.props;
    this.props.getJob(params.id);
    this.props.getOwnedCompanies();
  }

  render() {
    const {
      error,
      handleSubmit,
      submitting,
      editJob,
      initialValues,
      messages,
      companies
    } = this.props;

    if (!initialValues) {
      return <div className="loading" />;
    }

    return (
      <div className="container-fluid">
        <Messages messages={messages} />
        <h1 className="masthead">
          Edit Job <span className="slash">/</span> {initialValues.title}
        </h1>
        <form onSubmit={handleSubmit(editJob)}>
          <div className="row">
            <div className="col-lg-8 col-sm-12">
              <JobForm companies={companies} />
              {error &&
                <strong>
                  {error}
                </strong>}
            </div>
            <aside className="col-lg-4 col-sm-12 ">
              <Link to={`/jobs/${initialValues.id}`}>
                &larr; Back to job listing
              </Link>
              <div>
                <button type="submit" disabled={submitting} className="btn">
                  Save changes
                </button>
              </div>
            </aside>
          </div>
        </form>
      </div>
    );
  }
}
const mapStateToProps = (state, ownProps) => {
  let job = state.jobs.byId[ownProps.params.id];
  if (job) {
    job = pick(job, [
      "id",
      "company_id",
      "title",
      "description",
      "type",
      "recruiter",
      "recruiter_agency",
      "location",
      "contact_slack",
      "contact_email",
      "contact_website",
      "contact_person",
      "experience_range",
      "lower_salary",
      "upper_salary",
      "remote_available"
    ]);
  }

  const companies = state.companies.ids
    .filter(c => state.companies.byId[c].user_id == state.auth.user.id)
    .map(c => ({
      value: c,
      label: state.companies.byId[c].name
    }));

  return {
    companies: companies,
    initialValues: job,
    messages: state.messages
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getOwnedCompanies: () => dispatch(getOwnedCompanies()),
    getJob: id => dispatch(getJob(id)),
    editJob: (id, data) => dispatch(editJob(id, data))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(
  reduxForm({
    form: "nashjobs/jobs/edit"
  })(EditJobForm)
);

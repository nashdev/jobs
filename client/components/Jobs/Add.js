import React, { Component } from "react";
import { connect } from "react-redux";
import { reduxForm } from "redux-form";
import { addJob } from "../../actions/jobs";
import { getOwnedCompanies } from "../../actions/companies";
import { JobForm } from "./Form";

const DESCRIPTION_TEMPLATE = `
### Description

### Responsibilities

### Requirements

### Education + Experience

### Interview Process
`;

class AddJobForm extends Component {
  componentDidMount() {
    this.props.dispatch(getOwnedCompanies());
  }

  render() {
    const {
      error,
      handleSubmit,
      pristine,
      reset,
      submitting,
      addJob,
      companies
    } = this.props;
    return (
      <div className="container-fluid">
        <h1 className="masthead">Create a new job listing.</h1>
        <form onSubmit={handleSubmit(addJob)}>
          <JobForm companies={companies} />

          {error &&
            <strong>
              {error}
            </strong>}
          <div>
            <button type="submit" disabled={submitting} className="btn">
              Add Job
            </button>
            <button
              className="btn"
              type="button"
              disabled={pristine || submitting}
              onClick={reset}
            >
              Clear Values
            </button>
          </div>
        </form>
      </div>
    );
  }
}
const mapStateToProps = state => {
  //filter user owned companies here.
  const companies = state.companies.ids
    .filter(c => state.companies.byId[c].user_id == state.auth.user.id)
    .map(c => ({
      value: c,
      label: state.companies.byId[c].name
    }));
  return {
    companies: [{ label: "", value: "" }, ...companies]
  };
};
const mapDispatchToProps = dispatch => {
  return {
    addJob: values => dispatch(addJob(values))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(
  reduxForm({
    form: "nashjobs/jobs/add",
    initialValues: {
      type: "fulltime",
      experience_range: 100,
      salary_range: 30,
      remote_available: false,
      recruiter: false,
      description: DESCRIPTION_TEMPLATE
    }
  })(AddJobForm)
);

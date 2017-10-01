import React, { Component } from "react";
import { connect } from "react-redux";
import { reduxForm } from "redux-form";
import { addJob } from "../../actions/jobs";
import { getOwnedCompanies } from "../../actions/companies";
import { JobForm } from "./Form";
import Messages from "../Messages";

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
      addJob,
      companies
    } = this.props;
    return (
      <div>
        <section className="hero is-primary is-bold is-medium">
          <div className="hero-body">
            <div className="container is-fluid">
              <h1 className="title">Create a new job listing.</h1>
            </div>
          </div>
        </section>
        <Messages messages={this.props.messages} />
        <section className="section">
          <div className="container is-fluid">
            <form onSubmit={handleSubmit(addJob)}>
              <JobForm {...this.props} label="Add Job" companies={companies} />

              {error && <p className="is-danger">{error}</p>}
            </form>
          </div>
        </section>
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

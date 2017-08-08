import React, { Component } from "react";
import { connect } from "react-redux";
import { reduxForm } from "redux-form";
import { addCompany } from "../../actions/companies";
import { CompanyForm } from "./Form";

class AddCompanyForm extends Component {
  render() {
    const {
      error,
      handleSubmit,
      pristine,
      reset,
      submitting,
      addCompany
    } = this.props;
    return (
      <div className="container-fluid">
        <h1 className="masthead">Create a new company profile.</h1>
        <form onSubmit={handleSubmit(addCompany)}>
          <CompanyForm />
          {error &&
            <strong>
              {error}
            </strong>}
          <div>
            <button type="submit" disabled={submitting} className="btn">
              Add Company
            </button>
            <button
              type="button"
              disabled={pristine || submitting}
              onClick={reset}
              className="btn"
            >
              Clear Values
            </button>
          </div>
        </form>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    addCompany: values => dispatch(addCompany(values))
  };
};

export default connect(null, mapDispatchToProps)(
  reduxForm({
    form: "nashjobs/companies/add"
  })(AddCompanyForm)
);

import React, { Component } from "react";
import { connect } from "react-redux";
import { reduxForm } from "redux-form";
import { addCompany } from "../../actions/companies";
import { CompanyForm } from "./Form";
import Messages from "../Messages";

class AddCompanyForm extends Component {
  render() {
    const {
      error,
      handleSubmit,
      addCompany
    } = this.props;
    return (
      <div>
        <section className="hero is-primary is-bold is-medium">
          <div className="hero-body">
            <div className="container is-fluid">
              <h1 className="title">Create a new company profile.</h1>
            </div>
          </div>
        </section>
        <Messages messages={this.props.messages} />
        <section className="section">
          <div className="container is-fluid">
            <form onSubmit={handleSubmit(addCompany)}>
              <CompanyForm {...this.props} label="Add Company" />
              {error && <p className="is-danger">{error}</p>}
            </form>
          </div>
        </section>
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

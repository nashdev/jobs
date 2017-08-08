import React, { Component } from "react";
import { Link } from "react-router";
import { connect } from "react-redux";
import { reduxForm } from "redux-form";
import pick from "lodash/pick";
import { editCompany, getCompany } from "../../actions/companies";
import Messages from "../Messages";
import { CompanyForm } from "./Form";

class EditCompanyForm extends Component {
  componentDidMount() {
    const { params } = this.props;
    this.props.getCompany(params.id);
  }

  render() {
    const {
      error,
      handleSubmit,
      submitting,
      editCompany,
      initialValues,
      messages
    } = this.props;

    if (!initialValues) {
      return <div className="loading" />;
    }

    return (
      <div className="container-fluid">
        <h1 className="masthead">
          Edit Company <span className="slash">/</span> {initialValues.name}
        </h1>

        <Messages messages={messages} />
        <form onSubmit={handleSubmit(editCompany)}>
          <div className="row">
            <div className="col-lg-8 col-sm-12">
              <CompanyForm />
              {error &&
                <strong>
                  {error}
                </strong>}
            </div>
            <aside className="col-lg-4 col-sm-12  ">
              <Link to={`/companies/${initialValues.id}`}>
                &larr; Back to Company Profile
              </Link>
              <div>
                <button type="submit" disabled={submitting} className="btn">
                  Edit Company
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
  let company = state.companies.byId[ownProps.params.id];
  if (company) {
    company = pick(company, [
      "id",
      "name",
      "phone",
      "location",
      "size",
      "description"
    ]);
  }

  return {
    initialValues: company,
    messages: state.messages
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getCompany: id => dispatch(getCompany(id)),
    editCompany: (id, data) => dispatch(editCompany(id, data))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(
  reduxForm({
    form: "nashjobs/companies/edit"
  })(EditCompanyForm)
);

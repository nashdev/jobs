import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { reduxForm } from "redux-form";
import pick from "lodash/pick";
import { editCompany, getCompany } from "client/companies/actions";
import Messages from "client/messages/components/list";
import { CompanyForm } from "client/companies/components/form";

class EditCompanyForm extends Component {
  componentDidMount() {
    const { match } = this.props;
    this.props.getCompany(match.params.id);
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
      return <div className="is-loading" />;
    }

    return (
      <div>
        <section className="hero is-primary is-bold is-medium">
          <div className="hero-body">
            <div className="container is-fluid">
              <h1 className="title">Edit Company</h1>
              <h2 className="subtitle"> {initialValues.name}</h2>
            </div>
          </div>
        </section>
        <Messages messages={messages} />
        <section className="section">
          <div className="container is-fluid">
            <form onSubmit={handleSubmit(editCompany)}>
              <div className="columns">
                <div className="column is-two-thirds">
                  <CompanyForm {...this.props} label="Save Changes" />
                  {error && <strong>{error}</strong>}
                </div>
                <aside className="column">
                  <Link to={`/companies/${initialValues.id}`}>
                    &larr; Back to Company Profile
                  </Link>
                  <div className="field is-grouped">
                    <div className="control">
                      <button
                        type="submit"
                        disabled={submitting}
                        className="button is-primary"
                      >
                        Save Changes
                      </button>
                    </div>
                  </div>
                </aside>
              </div>
            </form>
          </div>
        </section>
      </div>
    );
  }
}
const mapStateToProps = (state, ownProps) => {
  let company = state.companies.byId[ownProps.match.params.id];
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
    editCompany: (id, data) => {
      window.scrollTo(0, 0);
      dispatch(editCompany(id, data));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(
  reduxForm({
    form: "nashjobs/companies/edit"
  })(EditCompanyForm)
);

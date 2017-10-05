import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

import { removeCompany, getCompany } from "client/companies/actions";
import Messages from "client/messages/components/list";

class DeleteCompanyConfirm extends Component {
  constructor(props) {
    super(props);

    this.onDelete = this.onDelete.bind(this);
  }

  componentDidMount() {
    const { match } = this.props;
    this.props.getCompany(match.params.id);
  }

  onDelete(e) {
    e.preventDefault();
    const { match } = this.props;
    this.props.removeCompany(match.params.id);
  }

  render() {
    const { company } = this.props;

    if (!company) {
      return <div className="is-loading" />;
    }

    return (
      <div className="container-fluid">
        <Messages messages={this.props.messages} />
        <h1 className="masthead">Delete Company / {company.name}</h1>
        <Link to="/companies">&larr; Back to Companies</Link>
        <div>
          <p>
            Are you sure you want to delete <strong>{company.name}</strong>?
          </p>
          <p className="text-danger">
            Warning: This action will delete all of your job listings as well.
          </p>
          <button onClick={this.onDelete} className="btn">
            Yes, I'm sure.
          </button>
          <Link to="/companies">Cancel</Link>
        </div>
      </div>
    );
  }
}
const mapStateToProps = (state, ownProps) => {
  return {
    messages: state.messages,
    company: state.companies.byId[ownProps.match.params.id]
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getCompany: id => dispatch(getCompany(id)),
    removeCompany: (id, data) => dispatch(removeCompany(id, data))
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(
  DeleteCompanyConfirm
);

import React, { Component } from "react";
import { Link } from "react-router";
import { connect } from "react-redux";

import { removeJob, getJob } from "../../actions/jobs";
import Messages from "../Messages";

class DeleteJobConfirm extends Component {
  constructor(props) {
    super(props);

    this.onDelete = this.onDelete.bind(this);
  }

  componentDidMount() {
    const { params } = this.props;
    this.props.getJob(params.id);
  }

  onDelete(e) {
    e.preventDefault();
    const { params } = this.props;
    this.props.deleteJob(params.id);
  }

  render() {
    const job = this.props.job;

    if (!job) {
      return <div className="loading" />;
    }

    return (
      <div className="container-fluid">
        <h1 className="masthead">
          Delete <span className="slash">/</span> {job.title}
        </h1>
        <Messages messages={this.props.messages} />
        <Link to="/jobs">&larr; Back to Jobs</Link>
        <div>
          <p>
            Are you sure you want to delete <strong>{job.title}</strong>?
          </p>
          <button onClick={this.onDelete} className="btn">
            Yes, I'm sure.
          </button>{" "}
          <Link to="/jobs">Cancel</Link>
        </div>
      </div>
    );
  }
}
const mapStateToProps = (state, ownProps) => {
  return {
    messages: state.messages,
    job: state.jobs.byId[ownProps.params.id]
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getJob: id => dispatch(getJob(id)),
    deleteJob: (id, data) => dispatch(removeJob(id, data))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(DeleteJobConfirm);

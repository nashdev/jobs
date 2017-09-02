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
      return <div className="is-loading" />;
    }

    return (
      <div>
        <section className="hero is-medium is-primary is-bold">
          <div className="hero-body">
            <div className="container is-fluid">
              <h1 className="title">Delete Job.</h1>
              <h2 className="subtitle">{job.title}</h2>
            </div>
          </div>
        </section>
        {this.props.messages && <Messages messages={this.props.messages} />}
        <section className="section">
          <div className="container is-fluid">
            <Link to="/jobs">&larr; Back to Jobs</Link>
            <div className="content">
              <p>
                Are you sure you want to delete <strong>{job.title}</strong>?
              </p>
              <button onClick={this.onDelete} className="button is-danger">
                Yes, I'm sure.
              </button>{" "}
              <Link to="/jobs" className="button is-link">
                Cancel
              </Link>
            </div>
          </div>
        </section>
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

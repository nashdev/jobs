import React from "react";
import { Link } from "react-router-dom";

export default class Job extends React.Component {
  render() {
    let title = this.props.job.title;
    if (this.props.isDraft) {
      title = `${title} (Draft)`;
    }

    return (
      <div>
        <h2 className="f3 black-80 fw4 lh-solid">
          <Link className="no-underline ma1" to={`/job/${this.props.job.id}`}>
            {title} / {this.props.job.company.name}
          </Link>
        </h2>
        <p className="black-80 fw3">
          Posted by{" "}
          <Link to={`/user/${this.props.job.user.id}`}>
            {this.props.job.user.name}
          </Link>{" "}
          on {this.props.job.createdAt}
        </p>
      </div>
    );
  }
}

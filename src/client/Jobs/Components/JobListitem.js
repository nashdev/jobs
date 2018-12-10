import React from "react";
import { Link } from "react-router-dom";
import Avatar from "react-avatar";

import s from "./JobListitem.css";

export default class JobListitem extends React.Component {
  render() {
    const {
      id,
      title,
      short_description,
      location,
      createdAt,
      company,
    } = this.props.job;

    const actions = this.props.actions;

    return (
      <article className="media">
        <figure className="media-left">
          <Avatar
            name={company.name}
            size={64}
            className="image is-64x64"
            round={true}
          />
        </figure>
        <div className="media-content">
          <div className="content">
            <p>
              <strong>
                <Link to={`/job/${id}`}>{title}</Link>
              </strong>{" "}
              <small>{company.name}</small> <br />
              <small>{location}</small> <br />
              {short_description}
            </p>
          </div>
        </div>
        {actions && (
          <div className="media-right">
            <Link to={`/job/${id}/edit`} className="button">
              <span className="icon is-small">
                <i className="fas fa-edit" />
              </span>
            </Link>
          </div>
        )}
      </article>
    );
  }
}

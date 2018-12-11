import React from "react";
import { Link } from "react-router-dom";
import Avatar from "react-avatar";

const JobListitem = ({ job, actions }) => {
  const {
    id,
    title,
    short_description: shortDescription,
    location,

    company,
  } = job;

  return (
    <article className="media">
      <figure className="media-left">
        <Avatar
          name={company.name}
          size={64}
          className="image is-64x64"
          round
        />
      </figure>
      <div className="media-content">
        <div className="content">
          <p className="is-capitalized">
            <strong>
              <Link to={`/job/${id}`}>{title}</Link>
            </strong>{" "}
            <small>{company.name}</small> <br />
            <small>{location}</small> <br />
            {shortDescription}
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
};

export default JobListitem;

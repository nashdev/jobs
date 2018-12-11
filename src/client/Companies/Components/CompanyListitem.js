import React from "react";
import { Link } from "react-router-dom";
import Avatar from "react-avatar";

const CompanyListitem = ({ company, actions }) => {
  const { id, name, short_description: shortDescription, location } = company;

  return (
    <article className="media">
      <figure className="media-left">
        <Avatar name={name} size={64} className="image is-64x64" round />
      </figure>
      <div className="media-content">
        <div className="content">
          <p className="is-capitalized">
            <strong>
              <Link to={`/company/${id}`}>{name}</Link>
            </strong>{" "}
            <small>{location}</small> <br />
            {shortDescription}
          </p>
        </div>
      </div>
      {actions && (
        <div className="media-right">
          <Link to={`/company/${id}/edit`} className="button">
            <span className="icon is-small">
              <i className="fas fa-edit" />
            </span>
          </Link>
        </div>
      )}
    </article>
  );
};

export default CompanyListitem;

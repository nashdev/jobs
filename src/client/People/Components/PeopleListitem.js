import React from "react";
import { Link } from "react-router-dom";
import Avatar from "react-avatar";
import moment from "moment";

import s from "./PeopleListitem.css";

const PeopleListitem = ({ person }) => {
  const { id, name, picture, createdAt } = person;

  return (
    <article className="media">
      <figure className="media-left">
        <Avatar
          name={name}
          src={picture}
          size={64}
          className="image is-64x64"
          round
        />
      </figure>
      <div className="media-content">
        <div className="content">
          <p>
            <strong>
              <Link to={`/person/${id}`}>{name}</Link>
            </strong>{" "}
            <br />
            <small>Joined {moment(createdAt).fromNow()}</small>
          </p>
        </div>
      </div>
    </article>
  );
};

export default PeopleListitem;

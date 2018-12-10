import React from "react";
import { Link } from "react-router-dom";
import Avatar from "react-avatar";
import cn from "classnames";

import s from "./UserProfileCard.css";

const UserProfileCard = ({
  id,
  name,
  location,
  picture,
  available,
  github,
  twitter,
  facebook,
  linkedin,
}) => (
  <div className={s.container}>
    <Avatar name={name} src={picture} size={128} round className={s.avatar} />

    <Link to={`/company/${id}`} className={s.name}>
      {name}
    </Link>
    <span className={s.location}>{location}</span>
    <p className={s.description}>
      {available
        ? "✅ Available for hire or looking for new opportunities."
        : "🚫 Not looking for new opportunities."}
    </p>

    <p className={s.message}>
      <a
        className="button"
        href="/"
        onClick={(e) => {
          e.preventDefault();
          alert("This will be implemented soon. Check back again later.");
        }}
      >
        <span className={cn("icon", s.icon)}>
          <i className="fab fa-slack" />
        </span>

        <span>Message on Slack</span>
      </a>
    </p>

    <div className={s.social}>
      {[
        {
          name: "facebook",
          handle: facebook,
          link: `https://facebook.com/${facebook}`,
        },
        {
          name: "twitter",
          handle: twitter,
          link: `https://twitter.com/${twitter}`,
        },
        {
          name: "github",
          handle: github,
          link: `https://github.com/${github}`,
        },
        {
          name: "linkedin",
          handle: linkedin,
          link: `https://linkedin.com/${linkedin}`,
        },
      ].map(({ name, handle, link }) => {
        if (!handle) {
          return null;
        }
        return (
          <p className={s.network} key={name}>
            <span className={cn("icon", s.icon)}>
              <i className={cn("fab", [`fa-${name}`])} />
            </span>
            <a className={s.handle} href={link} rel="noopener noreferrer">
              <span>@{handle}</span>
            </a>
          </p>
        );
      })}
    </div>
  </div>
);

export default UserProfileCard;

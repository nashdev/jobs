import React from "react";
import { Link } from "react-router-dom";
import Avatar from "react-avatar";
import cn from "classnames";

import s from "./CompanyProfileCard.css";

const CompanyProfileCard = ({
  id,
  name,
  location,
  short_description,
  twitter,
  linkedin,
  github,
  facebook,
  applyLink = null,
  allowSlackMessage = false,
}) => (
  <div className={s.container}>
    <Avatar name={name} src={null} size={128} round className={s.avatar} />

    <Link to={`/company/${id}`} className={s.name}>
      {name}
    </Link>
    <span className={s.location}>{location}</span>
    <p className={s.description}>{short_description}</p>

    {allowSlackMessage && (
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
    )}

    {applyLink && (
      <p className={s.message}>
        <a
          className="button"
          href={applyLink}
          target="_blank"
          rel="noopener noreferrer"
        >
          <span className={cn("icon", s.icon)}>
            <i className="fas fa-file-contract" />
          </span>

          <span>Apply</span>
        </a>
      </p>
    )}

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
          link: `https://linkedin.com/company/${linkedin}`,
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
            <a
              className={s.handle}
              href={link}
              rel="noopener noreferrer"
              onClick={(e) => {
                e.preventDefault();
                alert("This will be implemented soon. Check back again later.");
              }}
            >
              <span>@{handle}</span>
            </a>
          </p>
        );
      })}
    </div>
  </div>
);

export default CompanyProfileCard;

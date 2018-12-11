import React from "react";
import cn from "classnames";
import { Link } from "react-router-dom";
import s from "./Flash.css";

const STATUS_MAP = {
  success: "is-success",
  warning: "is-warning",
  info: "is-info",
  danger: "is-danger",
  error: "is-danger",
};

const Flash = ({ location }) => {
  const routerState = location.state;
  const { flash } = routerState || {};

  if (!flash) {
    return null;
  }
  /* <div className={cn(s[flash.status], s.container)}>
      <span className={s.title}>{flash.title}</span>
      <span className={s.subtitle}>— {flash.message}</span>
      {flash.link && (
        <Link to={flash.link} className={s.action}>
          {flash.linkText}
        </Link>
      )}
      </div> */

  return (
    <div
      className={cn({
        notification: true,
        [STATUS_MAP[flash.status]]: true, // todo: map this to flash.status
      })}
    >
      <div className="container">
        <span className={s.title}>{flash.title}</span>
        <span className={s.dash}>—</span>
        <span className={s.subtitle}>{flash.message}</span>
        {flash.link && (
          <Link to={flash.link} className={s.action}>
            {flash.linkText}
          </Link>
        )}
      </div>
    </div>
  );
};

export default Flash;

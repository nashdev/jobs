import React from "react";
import { Link } from "react-router-dom";

const ActionList = ({ actions, title = "Actions" }) => (
  <aside className="menu">
    <p className="menu-label">{title}</p>
    <ul className="menu-list">
      {actions.map((action) => (
        <li key={action.url}>
          <Link to={action.url} onClick={action.onClick}>
            {action.icon && (
              <span className="icon">
                <i className={action.icon} />
              </span>
            )}
            <span>{action.label}</span>
          </Link>
        </li>
      ))}
    </ul>
  </aside>
);

export default ActionList;

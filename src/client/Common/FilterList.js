import React from "react";
import { Link } from "react-router-dom";

import cn from "classnames";

const FilterList = ({ filters, title = "Filter", activeFilter }) => (
  <aside className="menu">
    <p className="menu-label">{title}</p>
    <ul className="menu-list">
      {filters.map((filter) => (
        <li key={filter.key}>
          <Link
            to={filter.url}
            className={cn({
              "is-active": filter.key === activeFilter,
            })}
          >
            {filter.icon && (
              <span className="icon">
                <i className={filter.icon} aria-hidden="true" />
              </span>
            )}
            <span>{filter.label}</span>
          </Link>
        </li>
      ))}
    </ul>
  </aside>
);

export default FilterList;

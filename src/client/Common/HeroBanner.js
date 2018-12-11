import React from "react";

import Flash from "./Flash";

const HeroBanner = ({ location, title, subtitle }) => (
  <section className="hero is-small is-info is-bold">
    <div className="hero-body">
      <div className="container">
        <h2 className="title">{title}</h2>
        {subtitle && <h2 className="subtitle">{subtitle}</h2>}
      </div>
    </div>
    <Flash location={location} />
  </section>
);

export default HeroBanner;

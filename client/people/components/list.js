import React from "react";

const PeopleList = () => {
  return (
    <div>
      <section className="hero is-medium is-primary is-bold">
        <div className="hero-body">
          <div className="container is-fluid">
            <h1 className="title">People.</h1>
          </div>
        </div>
      </section>
      <section className="section">
        <div className="container is-fluid">
          <p>
            Enhancement: Want to feature developer profiles?
            <a
              href="https://github.com/egdelwonk/nashdev-jobs/issues/18"
              target="_blank"
            >
              {" "}
              Implement it.
            </a>
          </p>
        </div>
      </section>
    </div>
  );
};

export default PeopleList;

import React from "react";
// import { Link } from "react-router";

class AppFooter extends React.Component {
  render() {
    return (
      <footer className="footer">
        <div className="container is-fluid">
          <div className="content has-text-centered">
            &copy; 2017 NashDev Jobs. All Rights Reserved.
            <p>
              Made with ❤️ by the{" "}
              <a href="http://nashdev.com" target="_blank">
                Nashville Developer Community
              </a>
            </p>
            <nav>
              Want to help?{" "}
              <a
                href="https://github.com/egdelwonk/nashdev-jobs"
                target="_blank"
              >
                Please Contribute.
              </a>{" "}
              See a problem?{" "}
              <a
                href="https://github.com/egdelwonk/nashdev-jobs/issues/"
                target="_blank"
              >
                Let us know.
              </a>
            </nav>
          </div>
        </div>
      </footer>
    );
  }
}

export default AppFooter;

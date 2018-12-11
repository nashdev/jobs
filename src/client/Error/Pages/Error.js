import React from "react";
import Helmet from "react-helmet";
import s from "./Error.css";

class ErrorPage extends React.Component {
  static defaultProps = {
    error: null,
  };

  render() {
    if (this.props.error) {
      return (
        <React.Fragment>
          <Helmet>
            <title>Error</title>
          </Helmet>

          <nav className="navbar">
            <div className="container">
              <div className="navbar-brand">
                <a href="/" className="navbar-item">
                  NashDev/<span>Jobs</span>
                </a>
              </div>
            </div>
          </nav>
          <section className="hero is-small is-info is-bold">
            <div className="hero-body">
              <div className="container">
                <h2 className="title">{this.props.error.name}</h2>
                <h2 className="subtitle">
                  Whoops. We've encountered an error.
                </h2>
              </div>
            </div>
          </section>
          <div className="container">
            <section className="section">
              <div className="content">
                <h1>{this.props.error.name}</h1>
                <pre>{this.props.error.stack}</pre>
              </div>
            </section>
          </div>
        </React.Fragment>
      );
    }

    return (
      <div>
        <h1>Error</h1>
        <p>Sorry, a critical error occurred on this page.</p>
      </div>
    );
  }
}

export default ErrorPage;

import React from "react";

export default class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  componentDidCatch(error, info) {
    this.setState({ hasError: true, error, info });
  }

  render() {
    const { hasError, error, info } = this.state;
    if (hasError) {
      return (
        <div>
          <section className="hero is-primary is-small is-bold">
            <div className="hero-body">
              <div className="container is-fluid">
                <h1 className="title">Something went wrong.</h1>
              </div>
            </div>
          </section>
          <section className="section">
            <h2>Error:</h2>
            <p>{JSON.stringify(error)}</p>
            <h2>Info:</h2>
            <p>{JSON.stringify(info)}</p>
          </section>
        </div>
      );
    }
    return this.props.children;
  }
}

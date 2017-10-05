import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import groupBy from "lodash/groupBy";
import sortBy from "lodash/sortBy";
import fromPairs from "lodash/fromPairs";
import map from "lodash/map";
import truncate from "lodash/truncate";

import { getAllCompanies } from "client/companies/actions";

import Messages from "client/messages/components/list";
import MarkdownViewer from "client/markdown/components/viewer";

const sortByKeys = object => {
  const keys = Object.keys(object);
  const sortedKeys = sortBy(keys);

  return fromPairs(map(sortedKeys, key => [key, object[key]]));
};

const getCharacterFilterList = () => {
  const numbers = Array(11)
    .fill()
    .map((_, number) => {
      return (
        <a href={`#${number}`} key={number} className="pagination-link">
          {number}
        </a>
      );
    });
  const letters = Array(26)
    .fill()
    .map((_, i) => {
      const letter = String.fromCharCode("A".charCodeAt(0) + i);
      return (
        <a href={`#${letter}`} key={letter} className="pagination-link">
          {letter}
        </a>
      );
    });
  const allCharacters = (
    <div>
      {letters} <br /> {numbers}
    </div>
  );
  return allCharacters;
};

class CompanyList extends Component {
  componentDidMount() {
    this.props.dispatch(getAllCompanies());
  }

  render() {
    const companyById = this.props.companyById;

    const companies = sortByKeys(
      groupBy(this.props.companies.map(c => companyById[c]), c =>
        c.name.charAt(0).toUpperCase()
      )
    );

    return (
      <div>
        <section className="hero is-medium is-primary is-bold">
          <div className="hero-body">
            <div className="container is-fluid">
              <h1 className="title">Companies</h1>
              <Link to="/companies/add" className="button is-outlined">
                <span className="icon is-small">
                  <i className="fa fa-plus-circle" />
                </span>
                <span>Add your company</span>
              </Link>
            </div>
          </div>
        </section>
        {this.props.messages && <Messages messages={this.props.messages} />}
        <section className="section">
          <h4 className="title is-4">Filter</h4>
          <div className="company-filter-container">
            {getCharacterFilterList()}
          </div>
        </section>
        <div className="container is-fluid">
          {!this.props.companies.length && <div className="is-loading" />}

          {Object.entries(companies).map(([alphaKey, alphaGroup]) => {
            return (
              <section className="section" key={`alpha_${alphaKey}`}>
                <h5 className="title is-5">
                  {alphaKey} <a name={alphaKey} />
                </h5>
                <div className="columns is-multiline">
                  {sortBy(alphaGroup, "name").map(company => (
                    <div
                      key={`company_${company.id}`}
                      className="column is-one-third is-flex"
                    >
                      <div className="card">
                        <header className="card-header">
                          <p className="card-header-title">
                            <Link to={`/companies/${company.id}`}>
                              {company.name}
                            </Link>
                          </p>
                          <a className="card-header-icon">
                            <span className="icon">
                              <i className="fa fa-angle-down" />
                            </span>
                          </a>
                        </header>
                        <div className="card-content">
                          <div className="content">
                            <div className="scroll-content">
                              <MarkdownViewer
                                markdown={truncate(company.description, {
                                  length: 900
                                })}
                              />
                            </div>
                          </div>
                        </div>
                        <div className="card-footer-offset" />
                        <footer className="card-footer">
                          <Link
                            to={`/companies/${company.id}`}
                            className="card-footer-item"
                          >
                            View Profile
                          </Link>
                        </footer>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            );
          })}
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    messages: state.messages,
    companies: state.companies.ids,
    companyById: state.companies.byId,
    auth: state.auth
  };
};

export default connect(mapStateToProps)(CompanyList);

import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router";
import groupBy from "lodash/groupBy";
import sortBy from "lodash/sortBy";
import fromPairs from "lodash/fromPairs";
import map from "lodash/map";
import { getAllCompanies } from "../../actions/companies";
import Messages from "../Messages";

const sortByKeys = object => {
  const keys = Object.keys(object);
  const sortedKeys = sortBy(keys);

  return fromPairs(map(sortedKeys, key => [key, object[key]]));
};

const getAlphaList = () => {
  return Array(26).fill().map((_, i) => {
    const letter = String.fromCharCode("A".charCodeAt(0) + i);
    return (
      <a href={`#${letter}`} key={letter} className="alphalist-item">
        {letter}
      </a>
    );
  });
};

class CompanyList extends Component {
  componentDidMount() {
    this.props.dispatch(getAllCompanies());
  }

  render() {
    const companyById = this.props.companyById;

    const companies = sortByKeys(
      groupBy(this.props.companies.map(id => companyById[id]), c =>
        c.name.charAt(0).toUpperCase()
      )
    );

    return (
      <div className="container-fluid">
        <Messages messages={this.props.messages} />
        <h1 className="masthead">Companies</h1>
        <div className="row">
          <div className="col-lg-8 col-sm-12">
            {!this.props.companies.length && <div className="loading" />}
            {Object.entries(companies).map(([alphaKey, alphaGroup]) => {
              return (
                <div key={alphaKey}>
                  <h5>
                    {alphaKey} <a name={alphaKey} />
                  </h5>
                  {sortBy(alphaGroup, "name").map(company =>
                    (<div key={company.id}>
                      <h3>
                        <Link to={`/companies/${company.id}`}>
                          {company.name}
                        </Link>
                      </h3>
                    </div>)
                  )}
                </div>
              );
            })}
          </div>
          <aside className="col-lg-4 col-sm-12 ">
            <Link to="/companies/add" className="btn">
              Add Company
            </Link>
            <h4>Filter</h4>
            <div className="alphalist-container">
              {getAlphaList()}
            </div>
          </aside>
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

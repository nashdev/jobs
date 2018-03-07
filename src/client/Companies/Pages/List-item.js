import React from 'react';
import { Link } from 'react-router-dom';
import Avatar from 'react-avatar';

export default class CompanyListItem extends React.Component {
  render() {
    let name = this.props.company.name;
    if (this.props.isDraft) {
      name = `${name} (Draft)`;
    }

    return (
      <Link
        className="no-underline ma1"
        to={`/company/${this.props.company.id}`}
      >
        <Avatar name={name} />
        <h2 className="f3 black-80 fw4 lh-solid">{name}</h2>
        <p className="black-80 fw3">{this.props.company.createdAt}</p>
      </Link>
    );
  }
}

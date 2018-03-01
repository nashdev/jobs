import React from 'react';
import { Link } from 'react-router-dom';
import Avatar from 'react-avatar';

export default class User extends React.Component {
  render() {
    let name = this.props.user.name;
    if (this.props.isDraft) {
      name = `${name} (Draft)`;
    }

    return (
      <Link className="no-underline ma1" to={`/person/${this.props.user.id}`}>
        <Avatar name={this.props.user.name} src={this.props.user.picture} />
        <h2 className="f3 black-80 fw4 lh-solid">{name}</h2>
        <p className="black-80 fw3">{this.props.user.createdAt}</p>
      </Link>
    );
  }
}

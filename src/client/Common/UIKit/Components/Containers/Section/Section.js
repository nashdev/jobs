import React, { Component } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import cn from 'classnames';
import Card from '../Card/Card';
import s from './Section.css';

class Section extends Component {
  render() {
    const { children, size, title } = this.props;
    return (
      <div className={cn({ [s.root]: true, [s.small]: size === 'small' })}>
        <Card>
          <Card.Position position="header">
            <Section.Header title={title}>Header Children here</Section.Header>
          </Card.Position>
          <Card.Position position="content">{children}</Card.Position>
        </Card>
      </div>
    );
  }
}

Section.Header = ({ onClick, title, children }) => (
  <div className={s.header}>
    <div className={s.title}>
      <h5>{title}</h5>
    </div>
    <div className={s.actions}>{children}</div>
  </div>
);

export default withStyles(s)(Section);

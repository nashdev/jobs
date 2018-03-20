import React, { Component } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import cn from 'classnames';
import s from './Pill.css';

class Pill extends Component {
  render() {
    const { children, size } = this.props;
    return (
      <div className={cn({ [s.root]: true, [s.small]: size === 'small' })}>
        {children}
      </div>
    );
  }
}

Pill.Item = ({ onClick, active, children }) => (
  <div className={s.item}>
    <a onClick={onClick} className={cn({ [s.active]: active })}>
      {children}
    </a>
  </div>
);

export default withStyles(s)(Pill);

import React, { Component } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import cn from 'classnames';
import s from './Stat.css';

class Stat extends Component {
  render() {
    const { highlight, label, value, size } = this.props;
    return (
      <div
        className={cn({
          [s.root]: true,
          [s[size]]: true,
          [s.highlight]: highlight,
        })}
      >
        <div className={s.label}>{label}</div>
        <div className={s.value}>{value}</div>
      </div>
    );
  }
}

Stat.defaultProps = {
  size: 'normal',
};

export default withStyles(s)(Stat);

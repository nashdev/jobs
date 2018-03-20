import React, { Component } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import cn from 'classnames';
import s from './Headers.css';

class Centered extends Component {
  render() {
    const { children } = this.props;
    return (
      <div
        className={cn({
          [s.centered]: true,
        })}
      >
        {children}
      </div>
    );
  }
}

Centered.defaultProps = {
  size: 'normal',
};

export const CenteredHeader = withStyles(s)(Centered);

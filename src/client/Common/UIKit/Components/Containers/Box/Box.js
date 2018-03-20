import React from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import cn from 'classnames';
import s from './Box.css';

const Box = ({ children, size }) => (
  <div className={cn({ [s.box]: true, [s[size]]: true })}>{children}</div>
);

Box.defaultProps = {
  size: 'large',
};

export default withStyles(s)(Box);

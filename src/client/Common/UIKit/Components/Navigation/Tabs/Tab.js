import React from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import cn from 'classnames';
import s from './Tab.css';

const Tab = ({ children, size }) => (
  <div className={cn({ [s.root]: true, [s.small]: size === 'small' })}>
    {children}
  </div>
);

Tab.Item = ({ onClick, active, children }) => (
  <div className={s.item}>
    <a onClick={onClick} className={cn({ [s.active]: active })}>
      {children}
    </a>
  </div>
);

export default withStyles(s)(Tab);

import React from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './Spinner.css';

const LoadingIndicator = () => <div className={s.root} />;

export default withStyles(s)(LoadingIndicator);

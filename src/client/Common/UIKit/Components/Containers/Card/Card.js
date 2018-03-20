import React from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import Transclude from '../../Transclude/Transclude';
import Box from '../Box/Box';
import s from './Card.css';

const Card = ({ children }) => (
  <Box>
    <Transclude positions={children} defaultPositions={{}}>
      {({ positions }) => (
        <React.Fragment>
          {positions.header && (
            <div className={s.controls}>{positions.header}</div>
          )}
          <div className={s.content}>{positions.content}</div>
        </React.Fragment>
      )}
    </Transclude>
  </Box>
);

Card.Position = Transclude.Slot;

export default withStyles(s)(Card);

import React from 'react';

const Transclude = props => {
  if (props.positions) {
    let children = {};
    if (Array.isArray(props.positions)) {
      children = props.positions.reduce(
        (acc, child) => {
          const { position } = child.props;
          if (position) {
            acc[position] = child;
          }
          return acc;
        },
        { ...props.defaultPositions },
      );
    } else if (props.positions.props.position) {
      const child = props.positions;
      const { position } = child.props;
      children = {
        [position]: child,
      };
    }
    const positions = {
      ...props.defaultPositions,
      ...children,
    };
    return props.children({ positions });
  }
  return null;
};

Transclude.Slot = ({ children }) => <React.Fragment>{children}</React.Fragment>;

export default Transclude;

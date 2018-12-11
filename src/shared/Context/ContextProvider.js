import PropTypes from "prop-types";
import React, { Children } from "react";

const emptyFunction = () => {};

class ContextHolder extends React.Component {
  static childContextTypes = {
    insertCss: PropTypes.func,
  };

  getChildContext() {
    const { context } = this.props;
    return {
      insertCss: context.insertCss || emptyFunction,
    };
  }

  render() {
    const { children } = this.props;
    return Children.only(children);
  }
}

export default ContextHolder;

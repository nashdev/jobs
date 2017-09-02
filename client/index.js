import "whatwg-fetch";
import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { Router, browserHistory } from "react-router";
import { store } from "./store/configureStore";
import getRoutes from "./routes";

import "./css/main.scss";
import "./favicon.ico";

// Scroll window  to top after route changes
// except for fwd/back browser navigation.
browserHistory.listen(location => {
  if (typeof window.ga === "function") {
    window.ga("set", "page", location.pathname + location.search);
    window.ga("send", "pageview");
  }

  setTimeout(() => {
    if (location.action === "POP") {
      return;
    }
    window.scrollTo(0, 0);
  });
});

ReactDOM.render(
  <Provider store={store}>
    <Router history={browserHistory} routes={getRoutes(store)} />
  </Provider>,
  document.getElementById("app")
);

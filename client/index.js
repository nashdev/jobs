import "core-js/es6/map";
import "core-js/es6/set";
import "client/public/css/main.scss";
import "client/public/favicon.ico";

import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { store } from "client/store";
import history from "client/common/history";
import App from "client/common/components/app";

history.listen(location => {
  console.log("location", location);

  if (typeof window.ga === "function") {
    window.ga("set", "page", location.pathname + location.search);
    window.ga("send", "pageview");
  }

  setTimeout(() => {
    if (location.action === "POP") {
      return;
    }
    if (!location.hash) {
      window.scrollTo(0, 0);
    }
  });
});

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("app")
);

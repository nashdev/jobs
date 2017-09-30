import React from "react";
import { Router } from "react-router-dom";
import history from "client/common/history";
import Home from "client/common/components/home";
import Header from "client/common/components/header";
import Footer from "client/common/components/footer";
import AppRoutes from "client/common/routes";

export default class App extends React.Component {
  componentDidCatch(error, info) {
    console.log("componentDidCatch:", error, info);
  }
  render() {
    return (
      <Router history={history}>
        <div id="wrapper">
          <Header />
          <main id="main">
            <AppRoutes />
          </main>
          <Footer />
        </div>
      </Router>
    );
  }
}

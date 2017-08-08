import React from "react";
import Header from "./Header";
import Footer from "./Footer";
import Breadcrumb from "./Common/Breadcrumb";

class App extends React.Component {
  render() {
    return (
      <div id="wrapper">
        <Header />
        <main id="main">
          <Breadcrumb routes={this.props.routes} params={this.props.params} />
          {this.props.children}
        </main>
        <Footer />
      </div>
    );
  }
}

export default App;

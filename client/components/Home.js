import React from "react";
import { connect } from "react-redux";
import Messages from "./Messages";

class Home extends React.Component {
  render() {
    return (
      <div className="container">
        <Messages messages={this.props.messages} />
        <div className="row">
          <div className="col-sm">
            <h3>Jobs and stuff.</h3>
            <p>
              Donec id elit non mi porta gravida at eget metus. Fusce dapibus,
              tellus ac cursus commodo, tortor mauris condimentum nibh, ut
              fermentum massa justo sit amet risus. Etiam porta sem malesuada
              magna mollis euismod. Donec sed odio dui.
            </p>
            <a href="#" role="button">
              View details
            </a>
          <h3>Needed to</h3>
            <h3>pass test</h3>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    messages: state.messages
  };
};

export default connect(mapStateToProps)(Home);

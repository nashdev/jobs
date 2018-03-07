import React from "react";
import { withRouter } from "react-router-dom";
import { graphql, compose } from "react-apollo";
import gql from "graphql-tag";

class CreateCompany extends React.Component {
  state = {
    name: "",
    location: "",
    phone: "",
    size: 0,
    description: ""
  };

  render() {
    return (
      <div className="pa4 flex justify-center bg-white">
        <form onSubmit={this.handlePost}>
          <h1>Create Company</h1>
          <input
            autoFocus
            className="w-100 pa2 mv2 br2 b--black-20 bw1"
            onChange={e => this.setState({ name: e.target.value })}
            placeholder="Name"
            type="text"
            value={this.state.name}
          />
          <textarea
            className="db w-100 ba bw1 b--black-20 pa2 br2 mb2"
            cols={50}
            onChange={e => this.setState({ description: e.target.value })}
            placeholder="Description"
            rows={8}
            value={this.state.description}
          />
          <input
            autoFocus
            className="w-100 pa2 mv2 br2 b--black-20 bw1"
            onChange={e => this.setState({ location: e.target.value })}
            placeholder="Location"
            type="text"
            value={this.state.location}
          />
          <input
            autoFocus
            className="w-100 pa2 mv2 br2 b--black-20 bw1"
            onChange={e => this.setState({ phone: e.target.value })}
            placeholder="Phone"
            type="text"
            value={this.state.phone}
          />
          <input
            autoFocus
            className="w-100 pa2 mv2 br2 b--black-20 bw1"
            onChange={e => this.setState({ size: e.target.value })}
            placeholder="Size"
            type="text"
            value={this.state.size}
          />
          <input
            className={`pa3 bg-black-10 bn ${this.state.name &&
              this.state.description &&
              "dim pointer"}`}
            disabled={!this.state.name || !this.state.description}
            type="submit"
            value="Create"
          />{" "}
          <a className="f6 pointer" onClick={this.props.history.goBack}>
            or cancel
          </a>
        </form>
      </div>
    );
  }

  handlePost = async e => {
    e.preventDefault();
    const { name, location, phone, size, description } = this.state;
    const { data } = await this.props.createDraftCompany({
      variables: { name, location, phone, size, description }
    });

    this.props.history.replace(`/company/${data.createCompany.id}`, {
      flash: {
        success: "You created a company!"
      }
    });
  };
}

const CREATE_DRAFT_MUTATION = gql`
  mutation CreateDraftCompany(
    $name: String!
    $description: String!
    $location: String
    $phone: String
    $size: Int
  ) {
    createCompany(
      company: {
        name: $name
        description: $description
        location: $location
        phone: $phone
        size: $size
      }
    ) {
      id
      name
      location
      phone
      size
      description
    }
  }
`;

export default compose(
  graphql(CREATE_DRAFT_MUTATION, {
    name: "createDraftCompany"
  }),
  withRouter
)(CreateCompany);

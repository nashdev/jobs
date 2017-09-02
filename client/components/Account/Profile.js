import React from "react";
import { connect } from "react-redux";
import {
  updateProfile,
  changePassword,
  deleteAccount
} from "../../actions/auth";
import { link, unlink } from "../../actions/oauth";
import Messages from "../Messages";

class Profile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: props.user.email,
      name: props.user.name,
      gender: props.user.gender,
      location: props.user.location,
      website: props.user.website,
      gravatar: props.user.gravatar,
      password: "",
      confirm: ""
    };
  }

  handleChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  handleProfileUpdate(event) {
    event.preventDefault();
    this.props.dispatch(updateProfile(this.state, this.props.token));
  }

  handleChangePassword(event) {
    event.preventDefault();
    this.props.dispatch(
      changePassword(this.state.password, this.state.confirm, this.props.token)
    );
  }

  handleDeleteAccount(event) {
    event.preventDefault();
    this.props.dispatch(deleteAccount(this.props.token));
  }

  handleLink(provider) {
    this.props.dispatch(link(provider));
  }

  handleUnlink(provider) {
    this.props.dispatch(unlink(provider));
  }

  render() {
    const githubLinkedAccount = this.props.user.github ? (
      <a
        href="#"
        role="button"
        className="text-alert btn"
        onClick={this.handleUnlink.bind(this, "github")}
      >
        Unlink your Github account
      </a>
    ) : (
      <a
        href="#"
        role="button"
        onClick={this.handleLink.bind(this, "github")}
        className="btn"
      >
        Link your Github account
      </a>
    );
    return (
      <div>
        <section className="hero is-primary">
          <div className="hero-body">
            <div className="container is-fluid">
              <h1 className="title">Manage Account</h1>
            </div>
          </div>
        </section>
        <Messages messages={this.props.messages} />
        <section className="section">
          <div className="container is-fluid">
            <form onSubmit={this.handleProfileUpdate.bind(this)}>
              <div className="field">
                <label htmlFor="email" className="label">
                  E-mail
                </label>
                <div className="control">
                  <input
                    className="input"
                    type="email"
                    name="email"
                    id="email"
                    value={this.state.email}
                    onChange={this.handleChange.bind(this)}
                  />
                </div>
              </div>

              <div className="field">
                <label htmlFor="name" className="label">
                  Name
                </label>
                <div className="control">
                  <input
                    className="input"
                    type="text"
                    name="name"
                    id="name"
                    value={this.state.name}
                    onChange={this.handleChange.bind(this)}
                  />
                </div>
              </div>

              <div className="field">
                <label htmlFor="Gender" className="label">
                  Gender
                </label>
                <div className="control">
                  <label className="radio">
                    <input
                      type="radio"
                      name="gender"
                      value="male"
                      checked={this.state.gender === "male"}
                      onChange={this.handleChange.bind(this)}
                    />
                    Male
                  </label>
                  <label className="radio">
                    <input
                      type="radio"
                      name="gender"
                      value="female"
                      checked={this.state.gender === "female"}
                      onChange={this.handleChange.bind(this)}
                    />
                    Female
                  </label>
                </div>
              </div>

              <div className="field">
                <label htmlFor="location" className="label">
                  Location
                </label>
                <div className="control">
                  <input
                    className="input"
                    type="text"
                    name="location"
                    id="location"
                    value={this.state.location}
                    onChange={this.handleChange.bind(this)}
                  />
                </div>
              </div>
              <div className="field">
                <label htmlFor="website" className="label">
                  Website
                </label>
                <div className="control">
                  <input
                    className="input"
                    type="text"
                    name="website"
                    id="website"
                    value={this.state.website}
                    onChange={this.handleChange.bind(this)}
                  />
                </div>
              </div>

              <div className="field is-grouped">
                <div className="control">
                  <button className="button is-primary">Update Profile</button>
                </div>
                <div className="control">
                  <button className="button is-link">Cancel</button>
                </div>
              </div>
            </form>

            <hr className="divider" />

            <h4 className="title">Change Password</h4>
            <form onSubmit={this.handleChangePassword.bind(this)}>
              <div className="field">
                <label htmlFor="password" className="label">
                  Password
                </label>
                <div className="control">
                  <input
                    className="input"
                    type="password"
                    name="password"
                    id="password"
                    value={this.state.password}
                    onChange={this.handleChange.bind(this)}
                  />
                </div>
              </div>
              <div className="field">
                <label htmlFor="name" className="label">
                  Confirm Passwowrd
                </label>
                <div className="control">
                  <input
                    className="input"
                    type="password"
                    name="confirm"
                    id="confirm"
                    value={this.state.confirm}
                    onChange={this.handleChange.bind(this)}
                  />
                </div>
              </div>

              <div className="field is-grouped">
                <div className="control">
                  <button className="button is-primary">Change Password</button>
                </div>
                <div className="control">
                  <button className="button is-link">Cancel</button>
                </div>
              </div>
            </form>
            <hr className="divider" />

            <h4 className="title">Linked Accounts</h4>
            <p>{githubLinkedAccount}</p>

            <hr className="divider" />

            <h4 className="title">Delete Account</h4>
            <form onSubmit={this.handleDeleteAccount.bind(this)}>
              <p className="has-text-danger">
                You can delete your account, but keep in mind this action is
                irreversible. Your companies, job postings, and user profile
                will be lost.
              </p>
              <div className="field is-grouped">
                <div className="control">
                  <button className="button is-danger">Delete Account</button>
                </div>
                <div className="control">
                  <button className="button is-link">Cancel</button>
                </div>
              </div>
            </form>
          </div>
        </section>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    token: state.auth.token,
    user: state.auth.user,
    messages: state.messages
  };
};

export default connect(mapStateToProps)(Profile);

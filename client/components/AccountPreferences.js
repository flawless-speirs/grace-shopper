import React, { Component } from 'react';
import { connect } from 'react-redux';
import { changePassword } from '../store/user';

class AccountPreferences extends Component {
  constructor({ user, passwordError }) {
    super(passwordError);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.state = {
      currentPassword: '',
      newPassword: '',
      confirmPassword: '',
      passwordMatch: true,
    };
  }
  handleSubmit(evt) {
    evt.preventDefault();
    if (this.state.newPassword === this.state.confirmPassword) {
      this.props.changePassword(
        this.props.user,
        this.state.currentPassword,
        this.state.newPassword
      );
    } else {
      this.setState({ passwordMatch: false });
    }
  }

  handleChange(evt) {
    if (evt.target.name === 'current-password') {
      this.setState({ currentPassword: evt.target.value });
    }
    if (evt.target.name === 'confirm-password') {
      this.setState({ confirmPassword: evt.target.value });
    }
    if (evt.target.name === 'new-password') {
      this.setState({ newPassword: evt.target.value });
    }
  }

  render() {
    return (
      <div>
        {this.props.passwordError ? (
          <div>ERROR! Current Password is Incorrect!</div>
        ) : (
          <div />
        )}
        {this.state.passwordMatch ? (
          <div />
        ) : (
          <div>Please make sure your new passwords match</div>
        )}
        <form>
          <label name="current-password">Current password:</label>
          <input
            onChange={this.handleChange}
            type="text"
            name="current-password"
          />
          <br />
          <br />

          <label name="new-password">New password:</label>
          <input onChange={this.handleChange} type="text" name="new-password" />
          <br />

          <label name="confirm-password">Confirm password:</label>
          <input
            onChange={this.handleChange}
            type="text"
            name="confirm-password"
          />
          <br />
        </form>
        <button type="submit" onClick={this.handleSubmit}>
          Change Password
        </button>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    user: state.user,
    passwordError: state.user.passwordError,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    changePassword: (user, currentPassword, newPassword) =>
      dispatch(changePassword(user, currentPassword, newPassword)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AccountPreferences);

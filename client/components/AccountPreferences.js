import React, { Component } from 'react';
import { connect } from 'react-redux';
import { changePassword } from '../store/user';

class AccountPreferences extends Component {
  constructor() {
    super();
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.state = {
      currentPassword: '',
      password: '',
      confirmPassword: '',
    };
  }
  handleSubmit(evt) {
    evt.preventDefault();
    if (this.state.password === this.state.confirmPassword) {
      this.props.changePassword(this.props.user, this.state.password);
    }
  }

  handleChange(evt) {
    if (evt.target.name === 'current-password') {
      this.setState({ currentPassword: evt.target.value });
    }
    if (evt.target.name === 'confirm-password') {
      this.setState({ confirmPassword: evt.target.value });
    }
    if (evt.target.name === 'password') {
      this.setState({ password: evt.target.value });
    }
  }

  render() {
    return (
      <div>
        <form>
          <label name="password">Current password:</label>
          <input type="text" name="current-password" />
          <br />
          <label name="password">New password:</label>
          <input onChange={this.handleChange} type="text" name="password" />
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
  };
};

const mapDispatchToProps = dispatch => {
  return {
    changePassword: (user, password) =>
      dispatch(changePassword(user, password)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AccountPreferences);

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { newPassword, auth } from '../store';

class AccountPreferences extends Component {
  constructor() {
    super();
    this.state = {};
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    event.preventDefault();
    console.log('test here!!!');
    this.setState({
      [event.target.name]: event.target.value,
    });
    console.log(this.state);
  }

  async handleSubmit(event) {
    'inside handle submit!';
    event.preventDefault();
    await this.props.updateUser();
  }

  render() {
    return (
      <div>
        <form name="test">
          <label htmlFor="email">email address:</label>
          <input onChange={this.handleChange} type="text" name="email" />
          <br />

          <label htmlFor="currentPassword">current password:</label>
          <input
            onChange={this.handleChange}
            type="text"
            name="currentPassword"
          />
          <br />

          <label htmlFor="newPassword">new password:</label>
          <input onChange={this.handleChange} type="text" name="new-password" />
          <br />
        </form>
        <button onClick={this.handleSubmit} type="submit">
          Submit
        </button>
      </div>
    );
  }
}

const mapState = state => {
  return {
    user: state.user,
  };
};

const mapDispatch = dispatch => {
  return {
    updateUser: (email, newPassword, currentPassword) => {
      dispatch(newPassword(email, newPassword, currentPassword));
    },
  };
};

export default connect(mapState, mapDispatch)(AccountPreferences);

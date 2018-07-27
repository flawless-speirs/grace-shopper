import React, { Component } from 'react';
import AccountBar from './AccountBar';
import { Link, connect } from 'react-redux';

class Account extends Component {
  constructor() {
    super();
  }

  render() {
    return (
      <div>
        <AccountBar />
      </div>
    );
  }
}

const mapState = state => {
  return {
    user: state.user,
  };
};

export default connect(mapState, null)(Account);

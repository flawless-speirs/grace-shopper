import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Route, Link, Switch } from 'react-router-dom';
import AccountPreferences from './AccountPreferences';
import OrderHistory from './OrderHistory';
// import store from '../store';

const AccountBar = props => {
  return (
    <div>
      <div>Welcome {props.name}</div>
      <div>
        <Link to="/profile">Change Password</Link>
        <Link to="/orders">Order History</Link>
      </div>
    </div>
  );
};

const mapState = state => {
  return {
    name: state.user.email,
  };
};

export default connect(mapState, null)(AccountBar);

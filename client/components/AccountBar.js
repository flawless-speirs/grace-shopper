import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Route, Link, Switch } from 'react-router-dom';
import AccountPreferences from './AccountPreferences';
import OrderHistory from './OrderHistory';
// import store from '../store';

const AccountBar = props => {
  return (
    <div>
      <div>Welcome {props.name || props.email}</div>
      <div>
        <Link to="/profile">Change Password</Link>
        <br />
        <Link to="/orders">Order History</Link>
      </div>
    </div>
  );
};

const mapState = state => {
  return {
    email: state.user.email,
    name: state.user.name,
  };
};

export default connect(mapState, null)(AccountBar);

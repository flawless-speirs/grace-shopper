import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Route, Link, Switch } from 'react-router-dom';
import AccountPreferences from './AccountPreferences';
import OrderHistory from './OrderHistory';
// import store from '../store';

const AccountBar = props => {
  console.log("THIS IS THE USER'S NAME", props.match);
  return (
    <div>
      <div>Welcome {props.name}</div>
      <div>
        <Link to="/profile">Profile</Link>
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

import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

const AccountBar = ({ name }) => {
  console.log("THIS IS THE USER'S NAME", name);
  return (
    <div>
      <div>Welcome {name}</div>
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

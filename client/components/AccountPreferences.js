import React from 'react';
import { connect } from 'react-redux';

const AccountPreferences = props => {
  return (
    <div>
      <a>Hello</a>
    </div>
  );
};

const mapState = state => {
  return {
    user: state.user,
  };
};

export default connect(mapState)(AccountPreferences);

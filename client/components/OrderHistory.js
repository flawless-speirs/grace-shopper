import React from 'react';
import { connect } from 'react-redux';

const OrderHistory = props => {
  console.log('CURRENT USER: ', props.user);
  return (
    <div>
      <a>Test!</a>
    </div>
  );
};

const mapState = state => {
  console.log('entered state');
  return {
    user: state.user,
  };
};

export default connect(mapState)(OrderHistory);

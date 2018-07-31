import React, { Component } from 'react';
import { connect } from 'react-redux';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import AccountBar from './AccountBar';
import AccountPreferences from './AccountPreferences';
import OrderHistory from './OrderHistory';

class Account extends Component {
  constructor() {
    super();
  }

  render() {
    return (
      <div className="form-card">
        <BrowserRouter>
          <div>
            <AccountBar />
            <Route path="/profile" component={AccountPreferences} />
            <Route path="/orders" component={OrderHistory} />
          </div>
        </BrowserRouter>
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

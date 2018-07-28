import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getPastOrders } from '../store/user';

class OrderHistory extends Component {
  componentDidMount() {
    if (!this.props.user.orders) this.props.getOrders(this.props.user.id);
  }

  render() {
    console.log('CURRENT USER: ', this.props.user);
    return this.props.user.orders ? (
      <div>
        {this.props.user.orders.map(order => {
          return (
            <div key={order.id}>
              <hr />
              <div>TOTAL: {order.amount}</div>
              <div>DATE: {order.createdAt}</div>
              <div>SHIPPED: {order.sent}</div>
              <div>DELIVERED: {order.received}</div>
              <hr />
            </div>
          );
        })}
      </div>
    ) : (
      <div>loading...</div>
    );
  }
}

const mapStateToProps = state => {
  console.log('entered state');
  return {
    user: state.user,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getOrders: id => dispatch(getPastOrders(id)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(OrderHistory);

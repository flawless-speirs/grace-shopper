import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getPastOrders } from '../store/user';

class OrderHistory extends Component {
  componentDidMount() {
    if (!this.props.user.orders) this.props.getOrders(this.props.user.id);
  }

  render() {
    const dateParse = str => {
      const arr = str.split('-');
      const year = arr[0];
      const month = arr[1];
      const day = arr[2].slice(0, 2);
      return `${month}-${day}-${year}`;
    };
    return this.props.user.orders && this.props.user.orders.length ? (
      <div>
        {this.props.user.orders.map(order => {
          return (
            <div key={order.id}>
              <hr />
              <div>Total: ${order.amount}</div>
              <div>Date: {dateParse(order.createdAt)}</div>
              <div>Shipped: {order.sent}</div>
              <div>Status: {order.received}</div>
              <hr />
            </div>
          );
        })}
      </div>
    ) : (
      <div>No orders to display</div>
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

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { CardElement, injectStripe } from 'react-stripe-elements';
import { createOrder } from '../store/cart';

class CheckoutForm extends Component {
  constructor(props) {
    super(props);
    this.state = { complete: false };
    this.submit = this.submit.bind(this);
  }

  async submit(ev) {
    ev.preventDefault();
    let { token } = await this.props.stripe.createToken({ name: 'Name' });
    let response = await fetch('/charge', {
      method: 'POST',
      headers: { 'Content-Type': 'text/plain' },
      body: token.id,
    });
    await this.props.createOrder(this.props.total);
    if (response.ok) this.setState({ complete: true });
  }

  render() {
    if (this.state.complete) return (
      <h1 className="misc-bg" >Thank you for your purchase!</h1>
    );

    return (
      <div className="checkout">
        <CardElement />
        <br />
        <button className="btn btn-warning" type="submit" onClick={this.submit}>
          Pay
        </button>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  cart: state.cart,
  total: state.total,
});

const mapDispatchToProps = dispatch => ({
  createOrder: () => dispatch(createOrder()),
});

export default injectStripe(
  connect(mapStateToProps, mapDispatchToProps)(CheckoutForm)
);

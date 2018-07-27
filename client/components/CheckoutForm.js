import React, { Component } from 'react';
import { connect } from 'react-redux';
import { CardElement, injectStripe } from 'react-stripe-elements';

class CheckoutForm extends Component {
  constructor(props) {
    super(props);
    this.state = { complete: false };
    this.submit = this.submit.bind(this);
  }

  async submit(ev) {
    let { token } = await this.props.stripe.createToken({ name: 'Name' });
    let response = await fetch('/charge', {
      method: 'POST',
      headers: { 'Content-Type': 'text/plain' },
      body: token.id,
    });

    if (response.ok) this.setState({ complete: true });
  }

  render() {
    if (this.state.complete) return <h1>Thank you for your purchase!</h1>;

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

export default injectStripe(connect()(CheckoutForm));
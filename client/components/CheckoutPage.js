import React, { Component } from 'react';
import CheckoutForm from './CheckoutForm';
import { Elements } from 'react-stripe-elements';

/**
 * COMPONENT
 */

class CheckoutPage extends Component {
  render() {
    return (
      <Elements>
        <div className="row justify-content-center">
          <div className="col-4 text-center">
            <CheckoutForm />
          </div>
        </div>
      </Elements>
    );
  }
}

export default CheckoutPage;

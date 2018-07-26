import React, { Component } from 'react';
import { connect } from 'react-redux';
import ProductRow from './ProductRow';
import CheckoutForm from './CheckoutForm';
import { Elements } from 'react-stripe-elements';

/**
 * COMPONENT
 */

class Cart extends Component {
  render() {
    return (
      <div>
        <div className="container-fluid text-center">
          <div className="row text-center">
            <div className="col-4"> Product </div>
            <div className="col-2"> Price </div>
            <div className="col-2"> Quantity </div>
            <div className="col-2"> Amount </div>
          </div>
          <ProductRow />
          <div> Total </div>
        </div>
        <Elements>
          <CheckoutForm />
        </Elements>
      </div>
    );
  }
}

/**
 * CONTAINER
 */

const mapStateToProps = state => ({});

const mapDispatchToProps = dispatch => ({});

export default connect(mapStateToProps, mapDispatchToProps)(Cart);

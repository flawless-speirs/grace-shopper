import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import ProductRow from './ProductRow';

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
          <Link to="/cart/checkout" className="btn btn-warning">
            Checkout
          </Link>
        </div>
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

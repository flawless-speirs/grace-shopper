import React, { Component } from 'react';
import { connect } from 'react-redux';
import { addToCart, removeFromCart } from '../store/cart';
import LoadingScreen from './LoadingScreen';

/**
 * COMPONENT
 */

class ProductRow extends Component {
  constructor() {
    super();
    this.state = {};
    this.handleAdd = this.handleAdd.bind(this);
    this.handleRemove = this.handleRemove.bind(this);
  }

  async handleAdd(evt) {
    evt.preventDefault();
    await this.props.addToCart(this.props.cartProduct.productId);
    await this.props.updateTotal(this.props.productData.price);
  }

  async handleRemove(evt) {
    evt.preventDefault();
    if (this.props.cartProduct.quantity > 0) {
      await this.props.removeFromCart(this.props.cartProduct.productId);
      await this.props.updateTotal(-1 * this.props.productData.price);
    }
  }

  render() {
    if (!this.props.productData) {
      return <LoadingScreen />;
    }
    return (
      <div className="container-fluid text-center product-row-card">
        <div className="row text-center">
          <div className="col-4">
            {' '}
            <img
              height="150"
              width="150"
              src={this.props.productData.imageUrl}
            />{' '}
          </div>
          <div className="col-2">{this.props.productData.name}</div>
          <div className="col-2">${this.props.productData.price}</div>
          <div className="col-1">{this.props.cartProduct.quantity}</div>
          <button
            className="btn btn-info"
            type="button"
            onClick={this.handleAdd}
          >
            +
          </button>
          <button
            className="btn btn-info"
            type="button"
            onClick={this.handleRemove}
          >
            -
          </button>
        </div>
      </div>
    );
  }
}

/**
 * CONTAINER
 */

const mapStateToProps = state => ({
  products: state.products,
  cart: state.cart,
});

const mapDispatchToProps = dispatch => ({
  addToCart: id => dispatch(addToCart(id)),
  removeFromCart: id => dispatch(removeFromCart(id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ProductRow);

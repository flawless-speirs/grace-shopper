import React, { Component } from 'react';
import { connect } from 'react-redux';
import { addToCart, removeFromCart, eraseFromCart } from '../store/cart';
import { Link } from 'react-router-dom';
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
    this.handleErase = this.handleErase.bind(this);
  }

  async handleAdd(evt) {
    evt.preventDefault();
    await this.props.addToCart(this.props.productData.id);
    await this.props.updateTotal(this.props.productData.price);
  }

  async handleRemove(evt) {
    evt.preventDefault();
    if (this.props.cartProduct.quantity > 0) {
      await this.props.removeFromCart(this.props.productData.id);
      await this.props.updateTotal(-1 * this.props.productData.price);
    }
  }

  async handleErase(evt) {
    evt.preventDefault();
    await this.props.eraseFromCart(this.props.productData.id);
    await this.props.updateTotal(
      -1 * this.props.productData.price * this.props.cartProduct.quantity
    );
  }

  render() {
    if (!this.props.productData) {
      return <LoadingScreen />;
    }
    return (
      <div className="container-fluid text-center product-row-card">
        <div className="row text-center">
          <div className="col-3">
            {' '}
            <Link to={`/products/${this.props.productData.id}`}>
              <img
                height="150"
                width="150"
                src={this.props.productData.imageUrl}
              />
            </Link>{' '}
          </div>
          <div className="col-2 vertical-align">
            {this.props.productData.name}
          </div>
          <div className="col-2 vertical-align">
            ${this.props.productData.price}
          </div>
          <div className="col-1 vertical-align">
            {this.props.cartProduct.quantity}
          </div>
          <div className="col-3 vertical-align">
            <button
              className="btn btn-info cart-button"
              type="button"
              onClick={this.handleAdd}
            >
              +
            </button>
            <button
              className="btn btn-info cart-button"
              type="button"
              onClick={this.handleRemove}
            >
              -
            </button>
            <button
              className="btn btn-info"
              type="button"
              onClick={this.handleErase}
            >
              Delete
            </button>
          </div>
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
  eraseFromCart: id => dispatch(eraseFromCart(id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ProductRow);

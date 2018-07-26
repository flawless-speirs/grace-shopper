import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { addToCart, removeFromCart } from '../store/cart';

/**
 * COMPONENT
 */

class ProductRow extends Component {
  constructor() {
    super();
    this.handleAdd = this.handleAdd.bind(this);
    this.handleRemove = this.handleRemove.bind(this);
  }

  async handleAdd(evt) {
    evt.preventDefault();
    await this.props.addToCart(this.props.product.id);
  }

  async handleRemove(evt) {
    evt.preventDefault();
    await this.props.removeFromCart(this.props.product.id);
  }

  render() {
    const product = this.props.product;
    return (
      <div className="container-fluid text-center">
        <div className="row text-center">
          <div className="col-4"> Product Image </div>
          <div className="col-2"> {product.name} </div>
          <div className="col-2"> {product.price} </div>
          <div className="col-2">
            {product.quantity}
            <button type="button" onClick={this.handleAdd}>
              +
            </button>
            <button type="button" onClick={this.handleRemove}>
              -
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

const mapStateToProps = state => ({});

const mapDispatchToProps = dispatch => ({
  addToCart: id => dispatch(addToCart(id)),
  removeFromCart: id => dispatch(removeFromCart(id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ProductRow);

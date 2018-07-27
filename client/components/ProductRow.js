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
    this.state = {};
    this.handleAdd = this.handleAdd.bind(this);
    this.handleRemove = this.handleRemove.bind(this);
  }

  componentDidMount() {
    this.setState(this.props.product);
  }

  async handleAdd(evt) {
    evt.preventDefault();
    await this.props.addToCart(this.props.product.id);
    await this.props.updateTotal(this.props.product.price);
    this.setState(prevState => {
      return { ...prevState, quantity: prevState.quantity + 1 };
    });
    // this.props.product.quantity++;
    // this.forceUpdate();
  }

  async handleRemove(evt) {
    evt.preventDefault();
    if (this.state.quantity > 0) {
      await this.props.removeFromCart(this.props.product.id);
      await this.props.updateTotal(-1 * this.props.product.price);
      this.setState(prevState => {
        return { ...prevState, quantity: prevState.quantity - 1 };
      });
    }
    // this.props.product.quantity--
    // this.forceUpdate();
  }

  render() {
    const product = this.state;
    return (
      <div className="container-fluid text-center product-row-card">
        <div className="row text-center">
          <div className="col-4">
            {' '}
            <img height="150" width="150" src={product.imageUrl} />{' '}
          </div>
          <div className="col-2">{product.name}</div>
          <div className="col-2">${product.price}</div>
          <div className="col-1">{product.quantity}</div>
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

const mapStateToProps = state => ({});

const mapDispatchToProps = dispatch => ({
  addToCart: id => dispatch(addToCart(id)),
  removeFromCart: id => dispatch(removeFromCart(id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ProductRow);

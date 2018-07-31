import React, { Component } from 'react';
import { connect } from 'react-redux';
import { addToCart, removeFromCart } from '../store/cart';
import { Link } from 'react-router-dom';

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
  }

  render() {
    const product = this.state;
    return (
      <div className="container-fluid text-center product-row-card">
        <div className="row text-center">
          <div className="col-4">
            {' '}
            <Link to={`/products/${product.id}`}>
              <img height="150" width="150" src={product.imageUrl} />
            </Link>{' '}
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

const mapDispatchToProps = dispatch => ({
  addToCart: id => dispatch(addToCart(id)),
  removeFromCart: id => dispatch(removeFromCart(id)),
});

export default connect(null, mapDispatchToProps)(ProductRow);

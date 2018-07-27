import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import ProductRow from './ProductRow';
import CheckoutForm from './CheckoutForm';
import { Elements } from 'react-stripe-elements';
import { products as getProducts } from '../store/products';
import { getFromDB, addToCart, removeFromCart } from '../store/cart';

/**
 * COMPONENT
 */

class Cart extends Component {
  constructor() {
    super();
    this.state = { products: [] };
    this.handleAdd = this.handleAdd.bind(this);
    this.handleRemove = this.handleRemove.bind(this);
  }

  async handleRemove(evt, id) {
    evt.preventDefault();
    await this.props.removeFromCart(id);
    this.forceUpdate();
  }

  async handleAdd(evt, id) {
    evt.preventDefault();
    await this.props.addToCart(id);
    this.forceUpdate();
  }

  async componentDidMount() {
    // await this.props.retrieveProducts();
    // await this.props.getCart();
    let products = [];
    if (this.props.cart.length) {
      this.props.cart.forEach(item => {
        const toAdd = this.props.products.find(
          product => item.productId === product.id
        );
        if (toAdd) {
          products.push({
            id: toAdd.id,
            name: toAdd.name,
            price: toAdd.price,
            imageUrl: toAdd.imageUrl,
            quantity: item.quantity,
          });
        }
      });
    }
    this.setState({ products });
  }

  render() {
    const products = this.state.products;
    return products.length ? (
      <div>
        <div className="container-fluid text-center">
          <div className="row text-center">
            <div className="col-4" />
            <div className="col-2"> Product </div>
            <div className="col-2"> Price </div>
            <div className="col-1"> Quantity </div>
          </div>
          {products.map(product => {
            return (
              <div key={product.id}>
                <ProductRow
                  product={product}
                  handleAdd={this.handleAdd}
                  handleRemove={this.handleRemove}
                />
              </div>
            );
          })}
          <div> Total </div>
          <Link to="/cart/checkout" className="btn btn-warning">
            Checkout
          </Link>
        </div>
      </div>
    ) : (
      <div>Nothing in your cart yet</div>
    );
  }
}

/**
 * CONTAINER
 */

const mapStateToProps = state => ({
  cart: state.cart,
  products: state.products,
});

const mapDispatchToProps = dispatch => ({
  retrieveProducts: () => dispatch(getProducts()),
  getCart: () => dispatch(getFromDB()),
  addToCart: id => dispatch(addToCart(id)),
  removeFromCart: id => dispatch(removeFromCart(id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Cart);

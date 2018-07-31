import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import ProductRow from './ProductRow';
import LoadingScreen from './LoadingScreen';
import { products as getProducts } from '../store/products';
import { retrieveSession, updateSession } from '../store/cart';
import { computeTotal, updateTotal } from '../store/total';

/**
 * COMPONENT
 */

class Cart extends Component {
  constructor() {
    super();
    this.state = { productsInCart: [], loading: true };
  }

  async componentDidMount() {
    if (this.props.products.length < 2) {
      await this.props.retrieveProducts();
    }
    if (!this.props.cart.length) {
      await this.props.getSession();
    }
    if (this.props.cart.length && !this.props.total) {
      await this.props.computeTotal();
    }

    let productsInCart = [];
    if (this.props.cart.length) {
      this.props.cart.forEach(item => {
        const toAdd = this.props.products.find(
          product => item.productId === product.id
        );
        if (toAdd && item.quantity) {
          productsInCart.push({
            id: toAdd.id,
            name: toAdd.name,
            price: toAdd.price,
            imageUrl: toAdd.imageUrl,
            quantity: item.quantity,
          });
        }
      });
    }
    this.setState({ productsInCart, loading: false });
  }

  render() {
    if (this.state.loading) {
      return <LoadingScreen />;
    } else {
      const products = this.state.productsInCart;
      return products.length ? (
        <div>
          <div className="container-fluid text-center product-table-head">
            <div className="row text-center">
              <div className="col-4" />
              <div className="col-2"> Product </div>
              <div className="col-2"> Price </div>
              <div className="col-1"> Quantity </div>
            </div>
            {products.map(product => {
              if (product.quantity) {
                return (
                  <div key={product.id}>
                    <ProductRow
                      product={product}
                      updateTotal={this.props.updateTotal}
                    />
                  </div>
                );
              }
            })}
            <div> Total: ${this.props.total.toFixed(2)} </div>
            <Link to="/cart/checkout" className="btn btn-warning">
              Checkout
            </Link>
          </div>
        </div>
      ) : (
        <div className="text-center form-card">
          There is nothing in your cart yet
        </div>
      );
    }
  }
}

/**
 * CONTAINER
 */

const mapStateToProps = state => ({
  cart: state.cart,
  products: state.products,
  total: state.total,
});

const mapDispatchToProps = dispatch => ({
  retrieveProducts: () => dispatch(getProducts()),
  getSession: () => dispatch(retrieveSession()),
  computeTotal: () => dispatch(computeTotal()),
  updateTotal: amount => dispatch(updateTotal(amount)),
  updateSession: () => dispatch(updateSession()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Cart);

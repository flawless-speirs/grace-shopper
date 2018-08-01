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
  }

  findProductFromState(cartProduct) {
    const productData = this.props.products.find(
      item => item.id === cartProduct.productId
    );
    return (
      <div key={cartProduct.productId}>
        <ProductRow
          cartProduct={cartProduct}
          productData={productData}
          updateTotal={this.props.updateTotal}
        />
      </div>
    );
  }

  render() {
    if (this.props.products.length < 2) {
      return <LoadingScreen />;
    } else {
      const cart = this.props.cart;
      return cart.length ? (
        <div>
          <div className="container-fluid text-center product-table-head">
            <div className="row text-center">
              <div className="col-5"> Product </div>
              <div className="col-2"> Price </div>
              <div className="col-1"> Quantity </div>
            </div>
            {this.props.cart.map(product => {
              if (product.quantity) {
                return this.findProductFromState(product);
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
          There's nothing in your cart.
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

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import ProductRow from './ProductRow';
import { products as getProducts } from '../store/products';
import { getFromDB, addToCart, removeFromCart } from '../store/cart';
import { updateTotal } from '../store/total';

/**
 * COMPONENT
 */

class Cart extends Component {
  constructor() {
    super();
    this.state = { products: [] };
    this.updateTotal = this.updateTotal.bind(this);
  }

  updateTotal(amount) {
    this.props.updateTotal(amount);
  }

  componentDidMount() {
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
        <div className="container-fluid text-center product-table-head">
          <div className="row text-center">
            <div className="col-4" />
            <div className="col-2"> Product </div>
            <div className="col-2"> Price </div>
            <div className="col-1"> Quantity </div>
          </div>
          {products.map(product => {
            return (
              <div key={product.id}>
                <ProductRow product={product} updateTotal={this.updateTotal} />
              </div>
            );
          })}
          <div> Total: {this.props.total} </div>
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
  total: state.total,
});

const mapDispatchToProps = dispatch => ({
  retrieveProducts: () => dispatch(getProducts()),
  getCart: () => dispatch(getFromDB()),
  addToCart: id => dispatch(addToCart(id)),
  removeFromCart: id => dispatch(removeFromCart(id)),
  updateTotal: amount => dispatch(updateTotal(amount)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Cart);

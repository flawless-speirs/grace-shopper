import React, { Component } from 'react';
import { connect } from 'react-redux';
import ProductRow from './ProductRow';
import CheckoutForm from './CheckoutForm';
import { Elements } from 'react-stripe-elements';
import { products as getProducts } from '../store/products';
import { getFromDB } from '../store/cart';

/**
 * COMPONENT
 */

class Cart extends Component {
  constructor() {
    super();
    this.state = { products: [] };
  }

  async componentDidMount() {
    await this.props.retrieveProducts();
    await this.props.getCart();
    let products = [];
    if (this.props.cart) {
      this.props.cart.forEach((value, key) => {
        const toAdd = this.props.products.find(product => product.id === key);
        if (toAdd) {
          products.push({
            name: toAdd.name,
            price: toAdd.price,
            quantity: value,
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
            <div className="col-4"> Product </div>
            <div className="col-2"> Price </div>
            <div className="col-2"> Quantity </div>
            <div className="col-2"> Amount </div>
          </div>
          {products.map(product => {
            console.log(product);
            return (
              <div key={product.id}>
                <ProductRow product={product} />
              </div>
            );
          })}
          <div> Total </div>
        </div>
        <Elements>
          <CheckoutForm />
        </Elements>
      </div>
    ) : (
      <div>Loading...</div>
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
});

export default connect(mapStateToProps, mapDispatchToProps)(Cart);

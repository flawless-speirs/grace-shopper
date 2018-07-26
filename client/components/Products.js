import React, { Component } from 'react';
import { connect } from 'react-redux';
import { products } from '../store/products';
import { Link } from 'react-router-dom';

/**
 * COMPONENT
 */

class Products extends Component {
  componentDidMount() {
    this.props.retrieveProducts();
  }

  render() {
    return (
      <div className="container-fluid text-center">
        <h1>Products</h1>
        <div className="row">
          {this.props.products.map(product => {
            return (
              <div className="col-4" key={product.id}>
                <div>{product.name}</div>
                <Link to={`/products/${product.id}`}>
                  <img src={product.imageUrl} />
                </Link>
                <div>${product.price}</div>
                <br />
              </div>
            );
          })}
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
});

const mapDispatchToProps = dispatch => ({
  retrieveProducts: () => dispatch(products()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Products);
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
      <div>
        <h1>Products</h1>
        {this.props.products.map(product => {
          return (
            <div key={product.id}>
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

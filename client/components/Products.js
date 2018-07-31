import React, { Component } from 'react';
import { connect } from 'react-redux';
import { products } from '../store/products';
import { Link } from 'react-router-dom';
import LoadingScreen from './LoadingScreen';

/**
 * COMPONENT
 */

class Products extends Component {
  constructor() {
    super();
    this.state = {
      loading: true,
      searchValue: '',
    };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    this.setState({ searchValue: event.target.value });
  }

  async componentDidMount() {
    if (this.props.products.length < 2) {
      await this.props.retrieveProducts();
    }
    this.setState({ loading: false });
  }

  render() {
    if (this.state.loading) {
      return <LoadingScreen />;
    } else {
      return (
        <div className="container-fluid text-center all-products-bg">
          <h1>Products</h1>
          <input
            className="form-control search-bar"
            value={this.state.searchValue}
            onChange={this.handleChange}
            type="text"
            placeholder="Search"
          />
          <div className="row all-products-margin">
            {this.state.searchValue === ''
              ? this.props.products.map(product => {
                  return (
                    <div className="col-3 product-card" key={product.id}>
                      <div>{product.name}</div>
                      <Link to={`/products/${product.id}`}>
                        <img className="product-img" src={product.imageUrl} />
                      </Link>
                      <div>${product.price}</div>
                      <br />
                    </div>
                  );
                })
              : this.props.products
                  .filter(product => {
                    return product.name
                      .toLowerCase()
                      .includes(this.state.searchValue.toLowerCase());
                  })
                  .map(product => {
                    return (
                      <div className="col-3 product-card" key={product.id}>
                        <div>{product.name}</div>
                        <Link to={`/products/${product.id}`}>
                          <img className="product-img" src={product.imageUrl} />
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

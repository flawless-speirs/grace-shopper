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
      sort: '',
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSort = this.handleSort.bind(this);
  }

  handleChange(event) {
    this.setState({ searchValue: event.target.value });
  }

  handleSort(event) {
    if (event.target.value === 'sortByPrice') {
      this.setState({ sort: 'sortByPrice' });
    }
    if (event.target.value === 'sortByName') {
      this.setState({ sort: 'sortByName' });
    }
    if (event.target.value === 'sortById') {
      this.setState({ sort: 'sortById' });
    }
  }

  async componentDidMount() {
    await this.props.retrieveProducts();
    this.setState({ loading: false });
  }

  render() {
    let sortedArray;

    const productCard = product => (
      <div className="col-3 product-card" key={product.id}>
        <div>{product.name}</div>
        <Link to={`/products/${product.id}`}>
          <img className="product-img" src={product.imageUrl} />
        </Link>
        <div>${product.price}</div>
        <br />
      </div>
    );

    if (this.state.loading) {
      return <LoadingScreen />;
    } else {
      if (this.state.sort === 'sortByPrice') {
        sortedArray = this.props.products.slice().sort((obj1, obj2) => {
          return obj1.price - obj2.price;
        });
      } else if (this.state.sort === 'sortByName') {
        sortedArray = this.props.products.slice().sort((obj1, obj2) => {
          if (obj1.name < obj2.name) return -1;
          if (obj1.name > obj2.name) return 1;
          return 0;
        });
      } else {
        sortedArray = this.props.products.sort((obj1, obj2) => {
          return obj1.id - obj2.id;
        });
      }

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

          <select defaultValue="sortById" onChange={this.handleSort}>
            <option value="sortById">Sort</option>
            <option value="sortByPrice">Sort by Price</option>
            <option value="sortByName">Sort by Name</option>
          </select>

          <div className="row all-products-margin">
            {this.state.searchValue === ''
              ? sortedArray.map(product => {
                  return productCard(product);
                })
              : sortedArray
                  .filter(product => {
                    return product.name
                      .toLowerCase()
                      .includes(this.state.searchValue.toLowerCase());
                  })
                  .map(product => {
                    return productCard(product);
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

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { product as getProduct } from '../store/product';
import { products } from '../store/products';
import { addToCart } from '../store/cart';
import { updateTotal } from '../store/total';
import LoadingScreen from './LoadingScreen';
import Recommendations from './Recommendations';

class SingleProduct extends Component {
  constructor() {
    super();
    this.state = { loading: true };
    this.handleClick = this.handleClick.bind(this);
    this.clickCarousel = this.clickCarousel.bind(this);
  }

  async componentDidMount() {
    await this.props.retrieveSingleProduct();
    if (this.props.products.length < 2) {
      await this.props.retrieveProducts();
    }
    this.setState({ loading: false });
  }

  async handleClick(evt) {
    evt.preventDefault();
    await this.props.updateTotal(this.props.product.price);
    await this.props.addToCart(this.props.product);
    document.getElementById('addedToCartAlert').classList.remove('d-none');
    setTimeout(() => {
      document.getElementById('addedToCartAlert').classList.add('d-none');
    }, 1500);
  }

  async clickCarousel(id) {
    await this.props.retrieveSingleProductById(id);
    this.props.history.push('/products/' + id);
  }

  render() {
    if (this.state.loading) {
      return <LoadingScreen />;
    } else {
      const recommendedProducts = this.props.products.filter(product => {
        for (let i = 0; i < product.tags.length; i++) {
          for (let j = 0; j < this.props.product.tags.length; j++) {
            if (product.id === this.props.product.id) {
              return false;
            }
            if (
              product.tags[i].tagName === this.props.product.tags[j].tagName
            ) {
              return true;
            }
          }
        }
        return false;
      });
      return (
        <div className="container-fluid single-product-bg">
          <div className="row">
            <div className="product-image text-center">
              <img src={this.props.product.imageUrl} />
            </div>
            <div>
              <div className="product-name">{this.props.product.name}</div>
              <div className="product-price">${this.props.product.price}</div>
              <div className="product-description">
                {this.props.product.description}
              </div>
              {this.props.product.tags.map(tag => (
                <div key={tag.id}>{tag.tagName}</div>
              ))}
              <button
                className="btn btn-warning"
                type="button"
                onClick={this.handleClick}
              >
                Add to Cart
              </button>
              <div
                id="addedToCartAlert"
                className="alert alert-success d-none"
                role="alert"
              >
                Added to Cart!
              </div>
            </div>
            <div>
              <h3>Recommended Products</h3>
              <Recommendations
                key={this.props.match.params.id}
                clickCarousel={this.clickCarousel}
                recommendedProducts={recommendedProducts}
              />
            </div>
          </div>
        </div>
      );
    }
  }
}

const mapStateToProps = state => ({
  product: state.product,
  products: state.products,
  cart: state.cart,
  total: state.total,
});

const mapDispatchToProps = (dispatch, ownProps) => ({
  retrieveSingleProduct: () => dispatch(getProduct(ownProps.match.params.id)),
  retrieveSingleProductById: id => dispatch(getProduct(id)),
  retrieveProducts: () => dispatch(products()),
  addToCart: product => dispatch(addToCart(product.id)),
  updateTotal: amount => dispatch(updateTotal(amount)),
});

export default connect(mapStateToProps, mapDispatchToProps)(SingleProduct);

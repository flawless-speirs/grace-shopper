import React, { Component } from 'react';
import { connect } from 'react-redux';
import { product as getProduct } from '../store/product';
import { addToCart } from '../store/cart';
import { updateTotal } from '../store/total';
import LoadingScreen from './LoadingScreen';

class SingleProduct extends Component {
  constructor() {
    super();
    this.state = { loading: true };
    this.handleClick = this.handleClick.bind(this);
  }

  async componentDidMount() {
    await this.props.retrieveSingleProduct();
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

  render() {
    if (this.state.loading) {
      return <LoadingScreen />;
    } else {
      return (
        <div className="container-fluid single-product-bg">
          <div className="row">
            <div className="product-image text-center">
              <img src={this.props.product.imageUrl} />
            </div>
            <div className="">
              <div className="product-name">{this.props.product.name}</div>
              <div className="product-price">${this.props.product.price}</div>
              <div className="product-description">
                {this.props.product.description}
              </div>
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
          </div>
        </div>
      );
    }
  }
}

const mapStateToProps = state => ({
  product: state.product,
  cart: state.cart,
  total: state.total,
});

const mapDispatchToProps = (dispatch, ownProps) => ({
  retrieveSingleProduct: () => dispatch(getProduct(ownProps.match.params.id)),
  addToCart: product => dispatch(addToCart(product.id)),
  updateTotal: amount => dispatch(updateTotal(amount)),
});

export default connect(mapStateToProps, mapDispatchToProps)(SingleProduct);

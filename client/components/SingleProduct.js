import React, { Component } from 'react';
import { connect } from 'react-redux';
import { product as getProduct } from '../store/product';
import { addToCart, saveMyCart } from '../store/cart';
import { updateTotal } from '../store/total';

class SingleProduct extends Component {
  constructor() {
    super();
    this.handleClick = this.handleClick.bind(this);
  }

  async componentDidMount() {
    await this.props.retrieveSingleProduct();
  }

  async handleClick(evt) {
    evt.preventDefault();
    await this.props.updateTotal(this.props.product.price);
    await this.props.addToCart(this.props.product);
    await this.props.saveCart();
  }

  render() {
    return (
      <div className="container-fluid">
        <div className="row">
          <div className="product-image col-4 text-center">
            <img src={this.props.product.imageUrl} />
          </div>
          <div className="col-8">
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
          </div>
        </div>
      </div>
    );
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
  saveCart: () => dispatch(saveMyCart()),
  updateTotal: amount => dispatch(updateTotal(amount)),
});

export default connect(mapStateToProps, mapDispatchToProps)(SingleProduct);

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { product as addProduct } from '../store/product'
import { addToCart } from '../store/user'

class SingleProduct extends Component {
  constructor () {
    super()
    this.handleClick = this.handleClick.bind(this)
  }

  async componentDidMount() {
    await this.props.retrieveSingleProduct();
  }

  async handleClick (evt) {
    evt.preventDefault()
    await this.props.addToCart(this.props.product)
  }

  render() {
    console.log(this.props.product)
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
            <button className="btn btn-warning" type="button">
              Add to Cart
            </button>
          </div>
        </div>
      
        <div className="product-name">{this.props.product.name}</div>
        <div className="product-price">{this.props.product.price}</div>
        <div className="product-description">{this.props.product.description}</div>
        <button type="submit" onClick={this.handleClick}>Add To Cart</button>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  product: state.product,
});

const mapDispatchToProps = (dispatch, ownProps) => ({
  retrieveSingleProduct: () => dispatch(addProduct(ownProps.match.params.id)),
  addToCart: (product) => dispatch(addToCart(product))
})

export default connect(mapStateToProps, mapDispatchToProps)(SingleProduct)

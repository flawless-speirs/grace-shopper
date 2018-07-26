import React, { Component } from 'react';
import { connect } from 'react-redux';
import { product } from '../store/product';

class SingleProduct extends Component {
  async componentDidMount() {
    await this.props.retrieveSingleProduct();
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
            <button className="btn btn-warning" type="button">
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
});

const mapDispatchToProps = (dispatch, ownProps) => ({
  retrieveSingleProduct: () => dispatch(product(ownProps.match.params.id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(SingleProduct);

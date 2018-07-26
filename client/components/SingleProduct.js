import React, { Component } from 'react';
import { connect } from 'react-redux';
<<<<<<< HEAD
import { product as addProduct } from '../store/product'
import { addToCart } from '../store/user'
=======
import { product } from '../store/product';
>>>>>>> f9e16e0784aa4dd80eae2abce3d3efd3b6252c30

class SingleProduct extends Component {
  async componentDidMount() {
    await this.props.retrieveSingleProduct();
  }
  render() {
    return (
      <div>
        <div className="product-image">
          <img src={this.props.product.imageUrl} />
        </div>
        <div className="product-name">{this.props.product.name}</div>
        <div className="product-price">{this.props.product.price}</div>
        <div className="product-description">{this.props.product.description}</div>
        <button type="submit" onClick={() => this.props.addToCart(this.props.product)}>Add To Cart</button>
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

// import React from 'react'
// import { addToCart } from '../store/user'
// import { connect } from 'react-redux';

// export const SingleProduct = props => {
//   const product = props.product
//   return (
//     <div>
//       <div className="product-image"><img src={product.imageUrl} /></div>
//       <div className="product-name">{product.name}</div>
//       <div className="product-price">{product.price}</div>
//       <div className="product-description">{product.description}</div>
//       <button type="submit" onClick={() => props.addToCart(props.product)}>Add To Cart</button>
//     </div>
//   )
// }

// const mapDispatchToProps = dispatch => {
//   return {
//     addToCart: (product) => dispatch(addToCart(product))
//   }
// }

// export default connect(null, mapDispatchToProps)(SingleProduct)

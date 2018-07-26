import React from 'react'
import { addToCart } from '../store/user'
import { connect } from 'react-redux';

export const SingleProduct = props => {
  const product = props.product
  return (
    <div>
      <div className="product-image"><img src={product.imageUrl} /></div>
      <div className="product-name">{product.name}</div>
      <div className="product-price">{product.price}</div>
      <div className="product-description">{product.description}</div>
      <button type="submit" onClick={() => props.addToCart(props.product)}>Add To Cart</button>
    </div>
  )
}

const mapDispatchToProps = dispatch => {
  return {
    addToCart: (product) => dispatch(addToCart(product))
  }
}

export default connect(null, mapDispatchToProps)(SingleProduct)

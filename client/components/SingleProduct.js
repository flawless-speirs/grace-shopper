import React from 'react'

export const SingleProduct = props => {
  const product = props.product
  return (
    <div>
      <div className="product-image"><img src={product.imageUrl} /></div>
      <div className="product-name">{product.name}</div>
      <div className="product-price">{product.price}</div>
      <div className="product-description">{product.description}</div>
    </div>
  )
}

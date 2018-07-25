import React, {Component} from 'react'
import {connect} from 'react-redux'
import {products} from '../store/products'
import SingleProduct from '../components/SingleProduct'

/**
 * COMPONENT
 */

class Products extends Component {
  componentDidMount() {
    this.props.retrieveProducts()
  }

  render() {
    return (
      <div>
        <h1>Products</h1>
        {this.props.products.map(product => {
          return (
            <div key={product.id}>
              <SingleProduct product={product} />
            </div>
            // <div key={product.id}>
            //   <div>Name: {product.name}</div>
            //   <img src={product.imageUrl} />
            //   <div>Price: ${product.price}</div>
            // </div>
          )
        })}
      </div>
    )
  }
}

/**
 * CONTAINER
 */

const mapStateToProps = state => ({
  products: state.products
})

const mapDispatchToProps = dispatch => ({
  retrieveProducts: () => dispatch(products())
})

export default connect(mapStateToProps, mapDispatchToProps)(Products)

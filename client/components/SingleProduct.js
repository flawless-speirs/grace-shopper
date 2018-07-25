import React, { Component } from 'react'
import { connect } from 'react-redux';
import { product } from '../store/product'

class SingleProduct extends Component {
  async componentDidMount(){
    await this.props.retrieveSingleProduct()
  }
  render() {
    console.log('WE ARE RENDERING')
    console.log(this.props)
    return (
      <div>
        <div className="product-image"><img src={this.props.product.imageUrl} /></div>
        <div className="product-name">{this.props.product.name}</div>
        <div className="product-price">{this.props.product.price}</div>
        <div className="product-description">{this.props.product.description}</div>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  product: state.product
})

const mapDispatchToProps = (dispatch, ownProps) => ({
  retrieveSingleProduct: () => dispatch(product(ownProps.match.params.id))
})

export default connect(mapStateToProps, mapDispatchToProps)(SingleProduct)

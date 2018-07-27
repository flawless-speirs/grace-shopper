import React, { Component } from 'react';
import { connect } from 'react-redux';

/**
 * COMPONENT
 */

class ProductRow extends Component {
  render() {
    return (
      <div className="container-fluid text-center">
        <div className="row text-center">
          <div className="col-4"> Product Image </div>
          <div className="col-2"> Product Name </div>
          <div className="col-2"> Price </div>
          <div className="col-2">
            Quantity
            <button>+</button>
            <button>-</button>
          </div>
        </div>
      </div>
    );
  }
}

/**
 * CONTAINER
 */

const mapStateToProps = state => ({});

const mapDispatchToProps = dispatch => ({});

export default connect(mapStateToProps, mapDispatchToProps)(ProductRow);

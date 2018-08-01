import React, { Component } from "react";
import { Link } from 'react-router-dom';

class Menu extends Component {
  render() {
    var visibility = "hide";

    if (this.props.menuVisibility) {
      visibility = "show";
    }
    return (
      <div>
        {this.props.isLoggedIn ?
          <div id="flyoutMenu"
            onMouseDown={this.props.handleMouseDown}
            className={visibility}>
            <Link to="/" className="btn nav-btn mobile-btn" >
              Home
                </Link>
            <br />
            <Link to="/" className="btn nav-btn mobile-btn" onClick={this.props.handleClick}>
              Logout
              </Link>
            <br />
            <Link to="/account" className="btn nav-btn mobile-btn" >
              Account
              </Link>
            <br />
            <Link to="/products" className="btn nav-btn mobile-btn" >
              All Products
              </Link>
            <br />
            <Link to="/cart" className="btn nav-btn cart-btn mobile-btn" >
              Cart
              </Link>
          </div>
          :
          <div id="flyoutMenu"
            onMouseDown={this.props.handleMouseDown}
            className={visibility}>
            <Link to="/" className="btn nav-btn mobile-btn" >
              Home
                </Link>
            <br />
            <Link to="/login" className="btn nav-btn mobile-btn" >
              Login
              </Link>
            <br />
            <Link to="/signup" className="btn nav-btn mobile-btn" >
              Sign Up
              </Link>
            <br />
            <Link to="/products" className="btn nav-btn mobile-btn" >
              All Products
              </Link>
            <br />
            <Link to="/cart" className="btn nav-btn cart-btn mobile-btn" >
              Cart
              </Link>
          </div>
        }
      </div>


    );
  }
}

export default Menu;

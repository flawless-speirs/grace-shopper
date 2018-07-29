import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { logout } from '../store';

const Navbar = ({ handleClick, isLoggedIn, userEmail, itemsInCart }) => (
  <div className="sticky">
    {/* <Link to="/" className="btn home-btn">The Rick and Morty Store</Link> */}
    <Link to="/">
      <img src={window.location.origin + '/logo.png'} className="logo" />
    </Link>
    <nav>
      {isLoggedIn ? (
        <div className="navbar-btns">
          Logged in as {userEmail}
          {/* The navbar will show these links after you log in */}
          <Link to="/home" className="btn nav-btn">
            Home
          </Link>
          <Link to="/products" className="btn nav-btn">
            All Products
          </Link>
          <Link to="/account" className="btn nav-btn">
            Account
          </Link>
          <a href="#" onClick={handleClick} className="btn nav-btn">
            Logout
          </a>
          <Link to="/cart" className="btn nav-btn cart-btn">
            ({itemsInCart()}) Cart
          </Link>
        </div>
      ) : (
        <div className="navbar-btns">
          {/* The navbar will show these links before you log in */}
          <Link to="/login" className="btn nav-btn">
            Login
          </Link>
          <Link to="/signup" className="btn nav-btn">
            Sign Up
          </Link>
          <Link to="/products" className="btn nav-btn">
            All Products
          </Link>
          <Link to="/cart" className="btn nav-btn cart-btn">
            ({itemsInCart()}) Cart
          </Link>
        </div>
      )}
    </nav>
    <hr />
  </div>
);

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    isLoggedIn: !!state.user.id,
    userEmail: state.user.email,
    itemsInCart: () => {
      let numItems = 0;
      state.cart.forEach(element => {
        numItems += element.quantity;
      });
      return numItems;
    },
  };
};

const mapDispatch = dispatch => {
  return {
    handleClick() {
      dispatch(logout());
    },
  };
};

export default connect(mapState, mapDispatch)(Navbar);

/**
 * PROP TYPES
 */
Navbar.propTypes = {
  handleClick: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired,
};

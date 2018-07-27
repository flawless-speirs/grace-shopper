import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { logout } from '../store';

const Navbar = ({ handleClick, isLoggedIn }) => (
  <div>
    <Link to="/" className="btn home-btn">The Rick and Morty Store</Link>
    <nav>
      {isLoggedIn ? (
        <div>
          {/* The navbar will show these links after you log in */}
          <Link to="/home" className="btn nav-btn">Home</Link>
          <Link to="/products" className="btn nav-btn">All Products</Link>
          <a href="#" onClick={handleClick} className="btn nav-btn">
            Logout
          </a>
          <Link to="/cart" className="btn nav-btn cart-btn">Cart</Link>
        </div>
      ) : (
        <div>
          {/* The navbar will show these links before you log in */}
          <Link to="/login" className="btn nav-btn" >Login</Link>
          <Link to="/signup" className="btn nav-btn">Sign Up</Link>
          <Link to="/products" className="btn nav-btn">All Products</Link>
          <Link to="/cart" className="btn nav-btn cart-btn">Cart</Link>
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

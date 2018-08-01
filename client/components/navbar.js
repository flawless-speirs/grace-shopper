import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { logout } from '../store';
import { updateSession, retrieveSession } from '../store/cart';
import MenuContainer from './MenuContainer'

class Navbar extends Component {
  constructor() {
    super();
    this.onRefresh = this.onRefresh.bind(this);
  }

  onRefresh() {
    this.props.updateSession();
  }
  async componentDidMount() {
    if (!this.props.cart.length) {
      await this.props.getSession();
    }
    window.addEventListener('beforeunload', this.onRefresh);
  }

  async componentWillUnmount() {
    await this.props.updateSession();
    window.removeEventListener('beforeunload', this.onRefresh);
  }

  render() {
    const defaultEmails = ['contact@linkedin.com', 'contact@github.com'];
    return (
      <React.Fragment>
        <div className="dropdown"><MenuContainer isLoggedIn={this.props.isLoggedIn} handleClick={this.props.handleClick} /></div>
        <div className="sticky">
          <Link to="/">
            <img src={window.location.origin + '/logo.png'} className="logo" />
          </Link>
          <nav>
            {this.props.isLoggedIn ? (
              <React.Fragment>
                <div className="welcome-message">
                  Logged in as{' '}
                  {defaultEmails.indexOf(this.props.userEmail) === -1
                    ? this.props.userEmail
                    : this.props.user.name}
                </div>
                <div className="navbar-btns">
                  {/* The navbar will show these links after you log in */}
                  <Link to="/products" className="btn nav-btn">
                    All Products
                </Link>
                  <Link to="/account" className="btn nav-btn">
                    Account
                </Link>
                  <a
                    href="#"
                    onClick={this.props.handleClick}
                    className="btn nav-btn"
                  >
                    Logout
                </a>
                  <Link to="/cart" className="btn nav-btn cart-btn">
                    Cart ({this.props.itemsInCart()})
                </Link>
                </div>
              </React.Fragment>
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
                    Cart ({this.props.itemsInCart()})
              </Link>
                </div>
              )}
          </nav>
          <hr />
        </div>
      </React.Fragment>
    );
  }
}

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    cart: state.cart,
    isLoggedIn: !!state.user.id,
    user: state.user,
    userEmail: state.user.email,
    itemsInCart: () => {
      let numItems = 0;
      if (state.cart.length) {
        state.cart.forEach(element => {
          numItems += element.quantity;
        });
      }
      return numItems;
    },
  };
};

const mapDispatch = dispatch => {
  return {
    handleClick() {
      dispatch(logout());
    },
    updateSession() {
      dispatch(updateSession());
    },
    getSession() {
      dispatch(retrieveSession());
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

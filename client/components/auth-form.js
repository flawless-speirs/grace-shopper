import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { auth } from '../store';

/**
 * COMPONENT
 */
const AuthForm = props => {
  const { name, displayName, handleSubmit, error } = props;

  return (
    <div className="text-center">
      <form onSubmit={handleSubmit} name={name} className="form-card">
        <div className="form-group row justify-content-center">
          <div className="col-4">
            <label htmlFor="email">Email Address</label>
            <input
              className="form-control"
              name="email"
              type="text"
              placeholder="Enter Email"
            />
          </div>
        </div>

        <div className="form-group row justify-content-center">
          <div className="col-4">
            <label htmlFor="password">Password</label>
            <input
              className="form-control"
              name="password"
              type="password"
              placeholder="Password"
            />
          </div>
        </div>

        <div className="form-group row justify-content-center">
          <div className="col-4">
            <button className="btn btn-primary signup-btn" type="submit">
              {displayName}
            </button>
          </div>
        </div>
        <div>
          <a className="" href="/auth/google">
            <img src={window.location.origin + '/google-logo.png'} className="media-logo" />

          </a>
        </div>
        <div>
          <a className="" href="/auth/github">
            <img src={window.location.origin + '/github-logo.png'} className="media-logo" />

          </a>
        </div>
        <div>
          <a className="" href="/auth/linkedin">
            <img src={window.location.origin + '/linkedin-logo.png'} className="media-logo" />

          </a>
        </div>
        <div className="error-message">
          {error && error.response && <div> {error.response.data} </div>}
        </div>
      </form>
      {/* <a className="btn btn-success" href="/auth/google">
        {displayName} with Google
      </a> */}
    </div>
  );
};

/**
 * CONTAINER
 *   Note that we have two different sets of 'mapStateToProps' functions -
 *   one for Login, and one for Signup. However, they share the same 'mapDispatchToProps'
 *   function, and share the same Component. This is a good example of how we
 *   can stay DRY with interfaces that are very similar to each other!
 */
const mapLogin = state => {
  return {
    name: 'login',
    displayName: 'Login',
    error: state.user.error,
  };
};

const mapSignup = state => {
  return {
    name: 'signup',
    displayName: 'Sign Up',
    error: state.user.error,
  };
};

const mapDispatch = dispatch => {
  return {
    handleSubmit(evt) {
      evt.preventDefault();
      const formName = evt.target.name;
      const email = evt.target.email.value;
      const password = evt.target.password.value;
      dispatch(auth(email, password, formName));
    },
  };
};

export const Login = connect(mapLogin, mapDispatch)(AuthForm);
export const Signup = connect(mapSignup, mapDispatch)(AuthForm);

/**
 * PROP TYPES
 */
AuthForm.propTypes = {
  name: PropTypes.string.isRequired,
  displayName: PropTypes.string.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  error: PropTypes.object,
};

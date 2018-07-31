import axios from 'axios';
import history from '../history';
import { getMyCart, saveMyCart, updateSession } from './cart';
import { updateTotal, clearTotal } from './total';

/**
 * ACTION TYPES
 */
const GET_USER = 'GET_USER';
const REMOVE_USER = 'REMOVE_USER';
const GET_ORDERS = 'GET_ORDERS';
const CHANGE_PASSWORD = 'CHANGE_PASSWORD';
const PASSWORD_ERROR = 'PASSWORD_ERROR';

/**
 * INITIAL STATE
 */
const defaultUser = {
  passwordError: false,
};

/**
 * ACTION CREATORS
 */
const getUser = user => ({ type: GET_USER, user });
const removeUser = () => ({ type: REMOVE_USER });
const getOrders = user => ({ type: GET_ORDERS, user });
const changedPassword = user => ({ type: CHANGE_PASSWORD, user });
const passwordError = () => ({ type: PASSWORD_ERROR });

/**
 * THUNK CREATORS
 */
export const newPassword = () => async dispatch => {
  try {
    const res = await axios.post(`/auth/update`, {
      email,
      newPass,
      currentPass,
    });
    dispatch(me());
  } catch (err) {
    console.error(err);
  }
};

export const me = () => async dispatch => {
  try {
    const res = await axios.get('/auth/me');
    dispatch(getUser(res.data || defaultUser));
  } catch (err) {
    console.error(err);
  }
};

export const auth = (email, password, method) => async dispatch => {
  let res;
  try {
    res = await axios.post(`/auth/${method}`, { email, password });
    if (res) {
      await dispatch(updateSession());
      await dispatch(getMyCart());
      await dispatch(updateTotal());
    }
  } catch (authError) {
    return dispatch(getUser({ error: authError }));
  }

  try {
    await dispatch(getUser(res.data));
    await dispatch(getMyCart());
    history.push('/account');
  } catch (dispatchOrHistoryErr) {
    console.error(dispatchOrHistoryErr);
  }
};

export const logout = () => async dispatch => {
  try {
    await dispatch(saveMyCart());
    await dispatch(clearTotal());
    await axios.post('/auth/logout');
    dispatch(removeUser());
    history.push('/login');
  } catch (err) {
    console.error(err);
  }
};

export const getPastOrders = id => async dispatch => {
  try {
    const userWithOrders = await axios.get(`/api/users/${id}`);
    dispatch(getOrders(userWithOrders.data));
  } catch (err) {
    console.error(err);
  }
};

export const changePassword = (
  user,
  currentPassword,
  newPassword
) => async dispatch => {
  try {
    let response = await axios.put(`/api/users/${user.id}`, {
      currentPassword,
      newPassword,
    });
    dispatch(changedPassword(user));
  } catch (err) {
    dispatch(passwordError());
    console.error(err);
  }
};

/**
 * REDUCER
 */
export default function(state = defaultUser, action) {
  switch (action.type) {
    case GET_USER:
      return action.user;
    case REMOVE_USER:
      return defaultUser;
    case GET_ORDERS:
      return action.user;
    case CHANGE_PASSWORD:
      return { ...action.user, passwordError: false };
    case PASSWORD_ERROR:
      return { ...state, passwordError: true };
    default:
      return state;
  }
}

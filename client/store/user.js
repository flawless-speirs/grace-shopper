import axios from 'axios';
import history from '../history';
import { sendToDB as sendCartToDB, getFromDB as getCartFromDB } from './cart';

/**
 * ACTION TYPES
 */
const GET_USER = 'GET_USER';
const REMOVE_USER = 'REMOVE_USER';
const GET_ORDERS = 'GET_ORDERS';

/**
 * INITIAL STATE
 */
const defaultUser = {};

/**
 * ACTION CREATORS
 */
const getUser = user => ({ type: GET_USER, user });
const removeUser = () => ({ type: REMOVE_USER });
const getOrders = user => ({ type: GET_ORDERS, user });

/**
 * THUNK CREATORS
 */
export const me = () => async dispatch => {
  try {
    const res = await axios.get('/auth/me');
    dispatch(getUser(res.data || defaultUser));
    dispatch(getCartFromDB());
  } catch (err) {
    console.error(err);
  }
};

export const auth = (email, password, method) => async dispatch => {
  let res;
  try {
    res = await axios.post(`/auth/${method}`, { email, password });
  } catch (authError) {
    return dispatch(getUser({ error: authError }));
  }

  try {
    dispatch(getUser(res.data));
    dispatch(getCartFromDB());
    history.push('/account');
  } catch (dispatchOrHistoryErr) {
    console.error(dispatchOrHistoryErr);
  }
};

export const logout = () => async dispatch => {
  try {
    await dispatch(sendCartToDB());
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
    default:
      return state;
  }
}

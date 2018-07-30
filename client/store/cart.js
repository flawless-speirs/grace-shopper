import axios from 'axios';

//ACTION TYPES

const ADD_PRODUCT = 'ADD_PRODUCT';
const REMOVE_PRODUCT = 'REMOVE_PRODUCT';
const UPDATE_SESSION = 'UPDATE_SESSION';
const GET_SESSION = 'GET_SESSION';
const CLEAR_CART = 'CLEAR_CART';
const GET_CART = 'GET_CART';
const CREATED_ORDER = 'CREATED_ORDER';

// ACTION CREATORS

const addProduct = cart => ({ type: ADD_PRODUCT, cart });
const removeProduct = cart => ({ type: REMOVE_PRODUCT, cart });
const updatedSession = cart => ({ type: UPDATE_SESSION, cart });
const getSession = cart => ({ type: GET_SESSION, cart });
const clearCart = () => ({ type: CLEAR_CART });
const getCart = cart => ({ type: GET_CART, cart });
const createdOrder = () => ({ type: CREATED_ORDER });

// THUNKS

export const addToCart = id => (dispatch, getState) => {
  const cart = getState().cart;
  const item = cart.find(el => el.productId === id);
  if (!item) {
    cart.push({ productId: id, quantity: 1 });
  } else {
    let currentQuantity = item.quantity;
    item.quantity = currentQuantity + 1;
  }
  dispatch(addProduct(cart));
};

export const removeFromCart = id => (dispatch, getState) => {
  const cart = getState().cart;
  const item = cart.find(el => el.productId === id);
  let currentQuantity = item.quantity;
  if (currentQuantity > 0) {
    item.quantity = currentQuantity - 1;
    dispatch(removeProduct(cart));
  }
};

export const getMyCart = () => async dispatch => {
  const cart = await axios.get('/api/carts');
  dispatch(getCart(cart.data));
};

export const updateSession = () => async (dispatch, getState) => {
  const cart = getState().cart;
  const total = getState().total;
  await axios.put('/api/carts/session', { cart, total });
  dispatch(updatedSession(cart));
};

export const retrieveSession = () => async dispatch => {
  const cart = await axios.get('/api/carts/session');
  if (cart.data) {
    dispatch(getSession(cart.data));
  }
};

export const saveMyCart = () => async (dispatch, getState) => {
  const cart = getState().cart;
  await axios.put('/api/carts', cart);
  await axios.put('/api/carts/session', { cart: [], total: 0 });
  dispatch(clearCart());
};

export const createOrder = () => async (dispatch, getState) => {
  const total = getState().total;
  const cart = getState().cart;
  const order = await axios.post('/api/orders', { amount: parseFloat(total) });
  const orderId = order.data.id;
  cart.forEach(function(item) {
    item.orderId = orderId;
  });
  await axios.put('/api/carts', cart);
  dispatch(createdOrder());
  dispatch(clearCart());
};

export default function(state = [], action) {
  switch (action.type) {
    case ADD_PRODUCT:
      return action.cart;
    case REMOVE_PRODUCT:
      return action.cart;
    case GET_CART:
      return action.cart;
    case UPDATE_SESSION:
      return action.cart;
    case GET_SESSION:
      return action.cart;
    case CLEAR_CART:
      return [];
    case CREATED_ORDER:
      return [];
    default:
      return state;
  }
}

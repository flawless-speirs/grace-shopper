import axios from 'axios';

//ACTION TYPES

const ADD_PRODUCT = 'ADD_PRODUCT';
const REMOVE_PRODUCT = 'REMOVE_PRODUCT';
const CLEAR_CART = 'CLEAR_CART';
const GET_CART = 'GET_CART';
const CREATED_ORDER = 'CREATED_ORDER';

// ACTION CREATORS

const addProduct = cart => ({ type: ADD_PRODUCT, cart });
const removeProduct = cart => ({ type: REMOVE_PRODUCT, cart });
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

export const sendToDB = () => async (dispatch, getState) => {
  const cart = getState().cart;
  await axios.put('/api/carts', cart);
  dispatch(clearCart());
};

export const getFromDB = () => async dispatch => {
  const cart = await axios.get('/api/carts');
  let cartState = [];
  cart.data.forEach(item => {
    cartState.push({ productId: item.productId, quantity: item.quantity });
  });
  dispatch(getCart(cartState));
};

export const createOrder = () => async (dispatch, getState) => {
  const total = getState().total;
  const cart = getState().cart;
  const order = await axios.post('/api/orders', { amount: parseFloat(total) });
  const orderId = order.data.id;
  cart.forEach(function(item) {
    item.orderId = orderId;
  });
  console.log(cart);
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
    case CLEAR_CART:
      return [];
    case GET_CART:
      return action.cart;
    default:
      return state;
  }
}

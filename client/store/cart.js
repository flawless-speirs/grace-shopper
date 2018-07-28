import axios from 'axios';

//ACTION TYPES

const ADD_PRODUCT = 'ADD_PRODUCT';
const REMOVE_PRODUCT = 'REMOVE_PRODUCT';
const SAVE_CART = 'SAVE_CART';
const GET_CART = 'GET_CART';
const CREATED_ORDER = 'CREATED_ORDER';

// ACTION CREATORS

const addProduct = cart => ({ type: ADD_PRODUCT, cart });
const removeProduct = cart => ({ type: REMOVE_PRODUCT, cart });
const saveCart = cart => ({ type: SAVE_CART, cart });
const getCart = cart => ({ type: GET_CART, cart });
// should be called loadCart
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

export const saveMyCart = () => async (dispatch, getState) => {
  const cart = getState().cart;
  await axios.put('/api/carts', cart);
  dispatch(saveCart(cart));
};

export const createOrder = () => async (dispatch, getState) => {
  const total = getState().total;
  await axios.post('/api/orders', { amount: parseFloat(total) });
  dispatch(createdOrder());
};

export default function(state = [], action) {
  switch (action.type) {
    case ADD_PRODUCT:
      return action.cart;
    case REMOVE_PRODUCT:
      return action.cart;
    case GET_CART:
      return action.cart;
    // this gives error if changes to action.cart because cart is undefined
    case SAVE_CART:
      return action.cart;
    default:
      return state;
  }
}

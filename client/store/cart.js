import axios from 'axios';

//ACTION TYPES

const ADD_PRODUCT = 'ADD_PRODUCT';
const REMOVE_PRODUCT = 'REMOVE_PRODUCT';
const SAVE_CART = 'SAVE_CART';
const GET_CART = 'GET_CART';

// ACTION CREATORS

const addProduct = cart => ({ type: ADD_PRODUCT, cart });
const removeProduct = cart => ({ type: REMOVE_PRODUCT, cart });
const saveCart = () => ({ type: SAVE_CART });
const getCart = cart => ({ type: GET_CART, cart });

// THUNKS

export const addToCart = id => (dispatch, getState) => {
  const cart = getState().cart;
  if (!cart.get(id)) {
    cart.set(id, 1);
  } else {
    let currentQuantity = cart.get(id);
    cart.set(id, currentQuantity + 1);
  }
  dispatch(addProduct(cart));
};

export const removeFromCart = id => (dispatch, getState) => {
  const cart = getState().cart;
  let currentQuantity = cart.get(id);
  cart.set(id, currentQuantity - 1);
  dispatch(removeProduct(cart));
};

export const sendToDB = () => async (dispatch, getState) => {
  const cart = getState().cart;
  await axios.put('/api/carts', cart);
  dispatch(saveCart());
};

export const getFromDB = () => async dispatch => {
  const cart = await axios.get('/api/carts');
  let cartState = new Map();
  cart.data.forEach(item => {
    cartState.set(item.productId, item.quantity);
  });
  dispatch(getCart(cartState));
};

export default function(state = new Map(), action) {
  switch (action.type) {
    case ADD_PRODUCT:
      return action.cart;
    case REMOVE_PRODUCT:
      return action.cart;
    case SAVE_CART:
      return new Map();
    case GET_CART:
      return action.cart;
    default:
      return state;
  }
}

import axios from 'axios';

/**
 * ACTION TYPES
 */
const GET_SINGLE_PRODUCT = 'GET_SINGLE_PRODUCT';

/**
 * INITIAL STATE
 */
const defaultProduct = {
  id: 0,
  name: 'default name',
  imageUrl:
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRwqeFAYIE3hTj9Gs1j3v7o-oBadM5uDkuPBuXMPtXS85LufL7UVA',
  description: 'default description',
  price: 0.0,
};

/**
 * ACTION CREATORS
 */
const getSingleProduct = product => ({ type: GET_SINGLE_PRODUCT, product });

/**
 * THUNK CREATORS
 */
export const product = id => async dispatch => {
  try {
    const res = await axios.get(`/api/products/${id}`);
    dispatch(getSingleProduct(res.data));
  } catch (err) {
    console.error(err);
  }
};

/**
 * REDUCER
 */
export default function(state = defaultProduct, action) {
  switch (action.type) {
    case GET_SINGLE_PRODUCT:
      return action.product;
    default:
      return state;
  }
}

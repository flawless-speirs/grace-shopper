import axios from 'axios';

/**
 * ACTION TYPES
 */
const GET_PRODUCTS = 'GET_PRODUCTS';

/**
 * INITIAL STATE
 */
const defaultProducts = [
  {
    id: 0,
    name: 'default name',
    imageUrl:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRwqeFAYIE3hTj9Gs1j3v7o-oBadM5uDkuPBuXMPtXS85LufL7UVA',
    description: 'default description',
    price: 0,
  },
];

/**
 * ACTION CREATORS
 */
const getProducts = products => ({ type: GET_PRODUCTS, products });

/**
 * THUNK CREATORS
 */
export const products = () => async dispatch => {
  try {
    let token = 'server@server.com:123';
    let base64 = btoa(token);
    let Basic = 'Basic ' + base64;
    // const res = await axios.get('/api/products', {
    //   Headers: { Authorization: Basic },
    // });

    const res = await axios.get('/api/products', {
      auth: {
        username: 'server@server.com',
        password: '123',
      },
    });
    dispatch(getProducts(res.data));
  } catch (err) {
    console.error(err);
  }
};

/**
 * REDUCER
 */
export default function(state = defaultProducts, action) {
  switch (action.type) {
    case GET_PRODUCTS:
      return action.products;
    default:
      return state;
  }
}

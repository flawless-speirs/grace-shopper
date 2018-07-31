const UPDATE_TOTAL = 'UPDATE_TOTAL';
const COMPUTE_TOTAL = 'COMPUTE_TOTAL';
const CLEAR_TOTAL = 'CLEAR_TOTAL';

const changeTotal = total => ({ type: UPDATE_TOTAL, total });
const setTotal = total => ({ type: COMPUTE_TOTAL, total });
export const clearTotal = () => ({ type: CLEAR_TOTAL });

export const updateTotal = amount => (dispatch, getState) => {
  const total = getState().total;
  const newTotal = parseFloat(total) + parseFloat(amount);
  dispatch(changeTotal(newTotal));
};

export const computeTotal = () => (dispatch, getState) => {
  const cart = getState().cart;
  const products = getState().products;
  let total = 0;
  cart.map(item => {
    const quantity = item.quantity;
    const currProduct = products.find(product => item.productId === product.id);
    total = total + quantity * currProduct.price;
  });
  dispatch(setTotal(total));
};

export default function(state = 0, action) {
  switch (action.type) {
    case UPDATE_TOTAL:
      return action.total;
    case COMPUTE_TOTAL:
      return action.total;
    case CLEAR_TOTAL:
      return 0;
    default:
      return state;
  }
}

const UPDATE_TOTAL = 'UPDATE_TOTAL';

const changeTotal = total => ({ type: UPDATE_TOTAL, total });

export const updateTotal = amount => (dispatch, getState) => {
  const total = getState().total;
  const newTotal = parseFloat(total) + parseFloat(amount);
  dispatch(changeTotal(newTotal));
};

export default function(state = 0, action) {
  switch (action.type) {
    case UPDATE_TOTAL:
      return action.total;
    default:
      return state;
  }
}

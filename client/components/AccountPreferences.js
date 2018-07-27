import React from 'react';
import { connect } from 'react-redux';

const AccountPreferences = props => {
  return (
    <div>
      <form>
        <label name="email">email address:</label>
        <input type="text" name="email" />
        <br />

        <label name="password">password:</label>
        <input type="text" name="password" />
        <br />
      </form>
      <button type='submit', onClick={}>Submit</button>
    </div>
  );
};

const mapState = state => {
  return {
    user: state.user,
  };
};

export default connect(mapState)(AccountPreferences);

// <div>
//   <div>
//     <form>
//       email address:
//       <input type="text" name="email" /><br>
//       </form>
//   </div>
// </div>

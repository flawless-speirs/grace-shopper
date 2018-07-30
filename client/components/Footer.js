import React from 'react';
import { connect } from 'react-redux';

const Footer = () => (
  <div className="footer">
    <footer>
      <a href="https://www.youtube.com/watch?v=dQw4w9WgXcQ" className="fa fa-youtube footer-btns"/>
      <a href="https://github.com/flawless-speirs/grace-shopper" className="fa fa-github footer-btns" />
    </footer>
    </div>
);

export default connect()(Footer);

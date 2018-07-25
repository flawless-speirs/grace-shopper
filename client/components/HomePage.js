import React, { Component } from 'react';
import Creator from './Creator';

export default class HomePage extends Component {
  constructor() {
    super();
    this.state = {};
  }

  render() {
    console.log('inside homepage render');

    return (
      <div>
        <h1>Hello!!!!</h1>
        <Creator user={{ name: 'Rick' }} />
      </div>
    );
  }
}

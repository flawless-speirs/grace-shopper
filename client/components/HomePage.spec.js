/* global describe beforeEach it */

import { expect } from 'chai';
import React from 'react';
import enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { HomePage } from './HomePage';

const adapter = new Adapter();
enzyme.configure({ adapter });

describe('HomePage', () => {
  let homePage;

  beforeEach(() => {
    homePage = shallow(<HomePage />);
  });

  it('has 4 profile divs', () => {
    expect(homePage.find('Creator').length).to.be.equal(4);
  });
});

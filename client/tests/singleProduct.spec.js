// /* global describe beforeEach it */

// import { expect } from 'chai';
// import React from 'react';
// import enzyme, { shallow } from 'enzyme';
// import Adapter from 'enzyme-adapter-react-16';
// import { SingleProduct } from '../components';

// const product = {
//   imageUrl: 'www.placeholder.com',
//   name: 'Product Test',
//   price: 9.99,
//   description: 'Placeholder description goes here',
// };

// const adapter = new Adapter();
// enzyme.configure({ adapter });

// describe('SingleProduct', () => {
//   let singleProduct;

//   beforeEach(() => {
//     singleProduct = shallow(<SingleProduct product={product} />);
//   });

//   it("renders a product equal with an image, name, price, and description'", () => {
//     expect(singleProduct.find('.product-image').length).to.be.equal(1);
//     expect(singleProduct.find('.product-name').length).to.be.equal(1);
//     expect(singleProduct.find('.product-price').length).to.be.equal(1);
//     expect(singleProduct.find('.product-description').length).to.be.equal(1);
//   });
// });

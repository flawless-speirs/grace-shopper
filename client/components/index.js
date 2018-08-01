/**
 * `components/index.js` exists simply as a 'central export' for our components.
 * This way, we can import all of our components from the same place, rather than
 * having to figure out which file they belong to!
 */

export { default as Navbar } from './navbar';
export { default as Footer } from './Footer';
export { Login, Signup } from './auth-form';
export { HomePage } from './HomePage';
export { default as Products } from './Products';
export { default as SingleProduct } from './SingleProduct';
export { default as SingleProductError } from './SingleProductError';
export { default as Cart } from './Cart';
export { default as CheckoutForm } from './CheckoutForm';
export { default as CheckoutPage } from './CheckoutPage';
export { default as Account } from './Account';
export { default as OrderHistory } from './OrderHistory';
export { default as LoadingScreen } from './LoadingScreen';
export { default as Recommendations } from './Recommendations';

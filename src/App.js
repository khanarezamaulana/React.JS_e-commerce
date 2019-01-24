import React, { Component } from 'react';
import { Route, Link } from 'react-router-dom';
import Navbar from './Components/Navbar';
import Carousel from './Components/Carousel';
import Content from './Components/Content';
import Footer from './Components/Footer';
import LoginRegister from './Page/LoginRegister';
import Cart from './Page/Cart';
import Home from './Page/Home';
import Shop from './Page/Shop';
import About from './Page/About';
import CheckoutPayment from './Page/CheckoutPayment';
import CheckoutAddress from './Page/CheckoutAddress';
import CheckoutShipping from './Page/CheckoutShipping';
import CheckoutReview from './Page/CheckoutReview';
import CheckoutComplete from './Page/CheckoutComplete';
import ProductDetail from './Page/ProductDetail';

class App extends Component {
  render() {
    return (
      
      <div id="page-top">
        <Navbar />

        <div>
          <Route exact path="/" component={Home} />
          <Route path="/shop" component={Shop} />
          <Route path="/login" component={LoginRegister} />
          <Route path="/cart" component={Cart} />
          <Route path="/about" component={About} />
          <Route path="/productdetail" component={ProductDetail} />
          <Route path="/checkout-address" component={CheckoutAddress} />
          <Route path="/checkout-shipping" component={CheckoutShipping} />
          <Route path="/checkout-payment" component={CheckoutPayment} />
          <Route path="/checkout-review" component={CheckoutReview} />
          <Route path="/checkout-complete" component={CheckoutComplete} />
        </div>

        <Footer />
      </div>

    )
  }
}

export default App;

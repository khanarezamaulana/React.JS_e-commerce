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
import Dashboard from './Admin/Dashboard';
import addUser from './Admin/addUser';
import addProduct from './Admin/addProduct';
import editUser from './Admin/editUser';
import editProduct from './Admin/editProduct';
import axios from 'axios';

class App extends Component {

  state = {
    username: "",
    role: ""
  }

  getUsername = (x) => {
    this.setState({
      username: x
    })
  }

  componentDidMount(){
    var username = localStorage.getItem("username")
        // alert(username)
        axios.get(`http://localhost:2018/users/${username}`).then((x) => {
            // console.log(x.data[0].profilePicture)
            console.log(x)
            
            this.setState({
                profilePicture: x.data[0].profilePicture,
                role: x.data[0].role
            })
        }).catch(() => {
            console.log("Failed!")
        })
  }

  render() {
    return (
      
      <div id="page-top">
        <Navbar username={this.state.username}/>

        <div>
          <Route exact path="/" component={Home} />
          <Route exact path="/shop" component={Shop} />
          <Route path="/shop/:id" component={ProductDetail} />
          <Route path="/login" render={(props) => <LoginRegister {...props} getUsername={this.getUsername}/> }/>
          <Route path="/cart" component={Cart} />
          <Route path="/about" component={About} />
          
          <Route path="/checkout-address" component={CheckoutAddress} />
          <Route path="/checkout-shipping" component={CheckoutShipping} />
          <Route path="/checkout-payment" component={CheckoutPayment} />
          <Route path="/checkout-review" component={CheckoutReview} />
          <Route path="/checkout-complete" component={CheckoutComplete} />
          {this.state.role == 'admin' && <Route path="/dashboard" component={Dashboard} /> }
          
          <Route path="/adduser" component={addUser} />
          <Route path="/addproduct" component={addProduct} />
          <Route path="/edituser/:id" component={editUser} />
          <Route path="/editproduct/:id" component={editProduct} />
        </div>

        <Footer />
      </div>

    )
  }
}

export default App;

import React, { Component } from 'react';
import { Route, Link } from 'react-router-dom';
import Navbar from './Components/Navbar';
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
import MyProfile from './Page/MyProfile';
import MyAddress from './Page/MyAddress';
import notFound404 from './Page/notFound404';
import MyOrders from './Page/MyOrders';
import ConfirmPayment from './Page/ConfirmPayment';
import ordersData from './Admin/ordersData';
import ordersDetail from './Page/ordersDetail';
import axios from 'axios';

class App extends Component {

  constructor(){
    super();
    this.state = {
      username: localStorage.getItem("username"),
      role: "",
      dataUser: "",
      total: "",
      checkoutYes: false
    }
  }

  getUsername = (x) => {
    this.setState({
      username: x
    })
  }

  sendTotal = (x) => {

    this.setState({
      total: x
    })
  }

  componentDidMount(){
    var username = localStorage.getItem("username")
        // alert(username)
        axios.get(`http://localhost:2018/users/${username}`).then((x) => {
            // console.log(x.data[0].profilePicture)
            console.log(x)
            var dataUserCopy = {
              userID: x.data[0].userID
            }
            
            this.setState({
                dataUser: dataUserCopy,
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

          <Route 
            exact path="/shop" 
            render={(props) => <Shop {...props} userID={this.state.dataUser.userID} />} 
          />

          <Route 
            path="/shop/:id" 
            render={(props) => <ProductDetail {...props} userID={this.state.dataUser.userID} />} 
          />

          <Route 
            path="/login" 
            render={(props) => <LoginRegister {...props} getUsername={this.getUsername} />}
          />
          
          <Route 
            path="/cart" 
            render={(props) => <Cart {...props} userID={this.state.dataUser.userID} sendTotal={this.sendTotal}/>} 
          />
          
          <Route path="/about" component={About} />
        

        <Route 
            path="/checkout-address" 
            render={(props) => <CheckoutAddress {...props} userID={this.state.dataUser.userID} total={this.state.total} />} 
          />
          

          <Route path="/checkout-shipping" component={CheckoutShipping} />
          <Route path="/checkout-payment" component={CheckoutPayment} />
          <Route path="/checkout-review" component={CheckoutReview} />
          <Route path="/checkout-complete" component={CheckoutComplete} />

          {this.state.role == 'admin' && 
          <Route path="/dashboard" component={Dashboard} /> }
          
          <Route path="/adduser" component={addUser} />
          <Route path="/myorders" component={MyOrders} />
          <Route path="/myprofile" component={MyProfile} />
          <Route path="/myaddress" component={MyAddress} />
          <Route path="/addproduct" component={addProduct} />
          <Route path="/edituser/:id" component={editUser} />
          <Route path="/editproduct/:id" component={editProduct} />
          <Route path="/confirmpayment" component={ConfirmPayment} />
          <Route path="/ordersdata" component={ordersData} />
          <Route path="/ordersdetail" component={ordersDetail} />
          <Route path="/404" component={notFound404} />
        </div>

        <Footer />
      </div>

    )
  }
}

export default App;

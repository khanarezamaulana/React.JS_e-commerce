import React from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

class Navbar extends React.Component {

    constructor(){
        super();
        this.state = {
            profilePicture: "",
            quantity: 1,
            dataCart: "",
            isLoading: false
        }
    }

    refreshCart = () => {
        this.setState({isLoading: true})
        // ambil data carts
        var userID = localStorage.getItem("userid");
        axios.get(`http://localhost:2018/cart/${userID}`)
        .then((x) => {
            console.log(x.data)
            if (x.data.length > 0) {
                this.setState({
                    dataCart: x.data,
                    isLoading: false
                })
            }
            else {
                this.setState({
                    dataCart: "",
                    isLoading: false
                })
            }
        })
        .catch((x) => {
            console.log('Error')
        })
    }

    // DELETE data cart
    removeCart = (cartID) => {
        axios.delete(`http://localhost:2018/cart/${cartID}`).then(() => {
            this.refreshCart()
        });
        alert('Cart deleted!')
        
    }

    // 
    runTotal = () => {
        this.props.sendTotal(this.totalPrice());
        setTimeout(() => {
            window.location.href = "/checkout-address"
        }, 1500);
    }

    // fungsi untuk menghitung totalPrice di cart
    totalPrice(){
        var total = 0;
        for(var i = 0; i<this.state.dataCart.length; i++){
            total+= this.state.dataCart[i].totalPrice
        }
        return total;
    }

    // SHOW DATA USER
    componentDidMount(){
        var username = localStorage.getItem("username")
        // alert(username)
        axios.get(`http://localhost:2018/users/${username}`).then((x) => {
            // console.log(x.data[0].profilePicture)
            console.log(x)
            
            this.setState({
                profilePicture: x.data[0].profilePicture
            })
        }).catch(() => {
            console.log("Failed!")
        })

        // buat reload data cart
        this.refreshCart()
    }

    dataCart() {
        return this.state.dataCart.map((val, i) => {
            return (
                <div className="dropdown-product-item"><span className="dropdown-product-remove"><i className="icon-cross" onClick={() => {this.removeCart(val.cartID)}}></i></span><a className="dropdown-product-thumb" href="/cart"><img src={val.picture} alt="Product"/></a>
                    <div className="dropdown-product-info text-capitalize"><a className="dropdown-product-title" href="/cart">{val.productname}</a><span className="dropdown-product-details">{val.quantity} x {parseInt(val.price).toLocaleString()}</span></div>
                </div>
            )
        })
    }

  render() {
    return (

        <div>
            {/* Topbar*/}
            <div className="topbar bg-dark" style={{position: 'fixed'}}>
                    <div className="topbar-column"><a className="hidden-md-down text-light" href=""><i className="icon-mail"></i>&nbsp; promotion@support.com</a>
                    <a className="hidden-md-down text-light" href="tel:00331697720"><i className="icon-bell"></i>&nbsp; 0852 9611 6745</a><a className="social-button sb-facebook shape-none sb-light-skin" href="" target="_blank"><i className="socicon-facebook"></i></a><a className="social-button sb-twitter shape-none sb-light-skin" href="" target="_blank"><i className="socicon-twitter"></i></a><a className="social-button sb-instagram shape-none sb-light-skin" href="" target="_blank"><i className="socicon-instagram"></i></a><a className="social-button sb-pinterest shape-none sb-light-skin" href="" target="_blank"><i className="socicon-pinterest"></i></a>
                    </div>
                    <div className="topbar-column"><a className="hidden-md-down" href=""><i className="icon-download"></i>&nbsp; Get mobile app</a>
                    <div className="lang-currency-switcher-wrap">
                        <div className="lang-currency-switcher dropdown-toggle text-light"><span className="language"><img alt="English" src="img/flags/INA.png"/></span><span className="currency text-light">IDR</span></div>
                        <div className="dropdown-menu">
                        <div className="currency-select">
                            <select className="form-control form-control-rounded form-control-sm">
                            <option value="usd">IDR</option>
                            {/* <option value="usd">$ USD</option>
                            <option value="usd">€ EUR</option>
                            <option value="usd">£ UKP</option>
                            <option value="usd">¥ JPY</option> */}
                            </select>
                        </div>
                        <a className="dropdown-item" href=""><img src="img/flags/FR.png" alt="Français"/>Français</a>
                        <a className="dropdown-item" href=""><img src="img/flags/GB.png" alt="Deutsch"/>America</a>
                        <a className="dropdown-item" href=""><img src="img/flags/IT.png" alt="Italiano"/>Italiano</a>
                        </div>
                    </div>
                    </div>
                </div>

            {/* Navbar */}
            <div id="navbar" className="container-fluid px-0 fixed-top" style={{position: 'fixed', top: '36px'}}>
                <nav className="navbar navbar-expand-lg navbar-light bg-white">
                    {/* <a href="/" className="navbar-brand"> <img id="logo" src="img/Logo Pro-Motion Transparan.png"/></a> */}
                    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    
                    <div className="collapse navbar-collapse text-uppercase" id="navbarSupportedContent">
                        <ul className="navbar-nav mr-auto mx-auto font-menu">
                        <li className="nav-item active">
                            <a href="/" className="nav-link">Home <span className="sr-only"></span></a>
                        </li>
                        <li className="nav-item">
                            <a href='/shop' className="nav-link text-uppercase">Shop</a>
                        </li>
                        {/* <li className="nav-item">
                            <Link to="/checkout-address"><a className="nav-link">Payment</a></Link>
                        </li> */}
                        <li className="nav-item dropdown">
                            <a className="nav-link dropdown-toggle" href="" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            Category
                            </a>
                            <div className="dropdown-menu text-uppercase font-category" aria-labelledby="navbarDropdown">
                            <a className="dropdown-item" href="">Shirt</a>
                            <a className="dropdown-item" href="">Knitwear</a>
                            <a className="dropdown-item" href="">Jackets</a>
                            <a className="dropdown-item" href="">Accessories</a>
                            <a className="dropdown-item" href="">Watches</a>
                            </div>
                        </li>
                        <li className="nav-item">
                            <Link to="/about"><a className="nav-link" href="">About</a></Link>
                        </li>
                        </ul>

                        {/* Search*/}
                        {/* <div className="row"> */}
                            <form className="site-search" method="get">
                                <input type="text" name="site_search" placeholder="Type to search..."/>
                                <div className="search-tools"><span className="clear-search">Clear</span><span className="close-search"><i className="icon-cross"></i></span></div>
                            </form>
                            <div className="site-branding">
                                <div className="inner">
                                    {/* Logo */}
                                    <a className="site-logo light-logo" href="/"><img src="img/Logo Pro-Motion Transparan.png" alt="Unishop"/></a><a className="site-logo logo-stuck" href="index.html"><img src="img/logo/logo.png" alt="Unishop"/></a>
                                </div>
                            </div>
                            {/* <form className="form-inline my-2 my-lg-0">
                            <input className="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search"/>
                            <button className="btn btn-outline-success my-2 my-sm-0" type="submit"><i className="fas fa-search"></i></button>
                            </form> */}
                            {/* Toolbar*/}
                            <div className="toolbar">
                            <div className="inner">
                                <div className="tools">
                                <div className="search"><i className="icon-search"></i></div>

                                {/* Login Button */}

                                {/* kalo user lagi login tampilkan button logout */}
                                {localStorage.getItem("username") ?
                                <div className="account text-capitalize"><i className="icon-head"></i>
                                    <ul className="toolbar-dropdown">
                                    <li className="sub-menu-user">
                                        <div className="user-ava"><img src={this.state.profilePicture} alt="krm"/>
                                        </div>
                                        <div className="user-info">
                                        <h6 className="user-name">{localStorage.getItem("username")}</h6><span className="text-xs text-muted"></span>
                                        </div>
                                    </li>
                                        <li><a className="text-capitalize" href="/myprofile">My Profile</a></li>
                                        <li><a className="text-capitalize" href="/myorders">Orders List</a></li>
                                    <li className="sub-menu-separator"></li>
                                    <li onClick={() => {
                                        localStorage.removeItem("username");
                                        localStorage.removeItem("userid");
                                        window.location.href = "/"
                                    }}><a className="text-capitalize"><i className="icon-unlock"></i>Logout</a></li>
                                    </ul>
                                </div>
                                // kalo user logout tampilkan button login
                                :   <Link to="/login"><div className="account text-capitalize"><i className="icon-head"></i>
                                        <ul className="toolbar-dropdown">
                                            <li><a className="text-capitalize" href="/login"><i className="icon-lock"></i>Login</a></li>
                                        </ul>
                                    </div></Link>
                                }

                                {/* Keranjang */}
                                <div className="cart"><i className="icon-bag"></i><span className="count">{this.state.dataCart ? this.state.dataCart.length : 0}</span><span className="subtotal">IDR {this.totalPrice().toLocaleString()}</span>
                                    <div className="toolbar-dropdown">
                                    
                                    {/* dataCart nya load dari database trus baru di mapping dan di tampilin */}
                                    {this.state.dataCart ? this.dataCart() : ""}

                                    <div className="toolbar-dropdown-group">
                                        <div className="column"><span className="text-lg">Total:</span></div>
                                        <div className="column text-right"><span className="text-lg text-medium text-capitalize">Rp. {this.totalPrice().toLocaleString()}&nbsp;</span></div>
                                    </div>
                                    <div className="toolbar-dropdown-group">
                                    <div className="column"><a className="btn btn-sm btn-block btn-secondary" href="/cart">View Cart</a></div>
                                        <div className="column"><a className="btn btn-sm btn-block btn-success" href="/checkout-address">Checkout</a></div>
                                    </div>
                                    </div>
                                </div>
                                </div>
                            </div>
                            </div>
                        {/* </div> */}
                    </div>
                </nav>
            </div>
        </div>
    )
  }
}
export default Navbar;

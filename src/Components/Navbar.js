import React from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

class Navbar extends React.Component {

    constructor(){
        super();
        this.state = {
            profilePicture: ""
        }
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
                        <li className="nav-item">
                            <Link to="/checkout-address"><a className="nav-link">Payment</a></Link>
                        </li>
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
                                        <li><a className="text-capitalize" href="">My Profile</a></li>
                                    <li className="sub-menu-separator"></li>
                                    <li onClick={() => {
                                        localStorage.removeItem("username");
                                        window.location.href = "/"
                                    }}><a className="text-capitalize"><i className="icon-unlock"></i>Logout</a></li>
                                    </ul>
                                </div>
                                :   <Link to="/login"><div className="account text-capitalize"><i className="icon-head"></i>
                                        <ul className="toolbar-dropdown">
                                            <li><a className="text-capitalize" href="/login"><i className="icon-lock"></i>Login</a></li>
                                        </ul>
                                    </div></Link>
                                }

                                <div className="cart"><a href="/cart"></a><i className="icon-bag"></i><span className="count">3</span><span className="subtotal">IDR 800K</span>
                                    <div className="toolbar-dropdown">
                                    <div className="dropdown-product-item"><span className="dropdown-product-remove"><i className="icon-cross"></i></span><a className="dropdown-product-thumb" href="shop-single.html"><img src="img/cart-dropdown/01.jpg" alt="Product"/></a>
                                        <div className="dropdown-product-info text-capitalize"><a className="dropdown-product-title" href="shop-single.html">Unionbay Park</a><span className="dropdown-product-details">1 x 200K</span></div>
                                    </div>
                                    <div className="dropdown-product-item text-capitalize"><span className="dropdown-product-remove"><i className="icon-cross"></i></span><a className="dropdown-product-thumb" href="shop-single.html"><img src="img/cart-dropdown/02.jpg" alt="Product"/></a>
                                        <div className="dropdown-product-info"><a className="dropdown-product-title" href="shop-single.html">Daily Fabric Cap</a><span className="dropdown-product-details">2 x 200K</span></div>
                                    </div>
                                    <div className="dropdown-product-item text-capitalize"><span className="dropdown-product-remove"><i className="icon-cross"></i></span><a className="dropdown-product-thumb" href="shop-single.html"><img src="img/cart-dropdown/03.jpg" alt="Product"/></a>
                                        <div className="dropdown-product-info"><a className="dropdown-product-title" href="shop-single.html">Haan Crossbody</a><span className="dropdown-product-details">1 x 200K</span></div>
                                    </div>
                                    <div className="toolbar-dropdown-group">
                                        <div className="column"><span className="text-lg">Total:</span></div>
                                        <div className="column text-right"><span className="text-lg text-medium">IDR 800K&nbsp;</span></div>
                                    </div>
                                    <div className="toolbar-dropdown-group">
                                        <div className="column"><a href="/cart" className="btn btn-sm btn-block btn-secondary">View Cart</a></div>
                                        <div className="column"><a href="/checkout-address" className="btn btn-sm btn-block btn-success">Checkout</a></div>
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

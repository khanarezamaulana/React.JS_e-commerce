import React from 'react';
import { Link } from 'react-router-dom';

class Navbar extends React.Component {
  render() {
    return (

        <div>
            {/* Header */}
            <div className="container-fluid bg-black header-top d-none d-md-block fixed-top">
                    <div id="header" className="row  text-light py-2">
                        <div className="col-lg-6">
                            
                            <div className="col-lg-7"> 
                                <i className="far fa-envelope" aria-hidden="true"></i>
                                promotion.id2018@gmail.com
                                &nbsp;
                                <i className="fas fa-mobile-alt" aria-hidden="true"></i>
                                +62 852 9611 6745
                            </div>
                            <div className="col-lg-5"></div>
                                {/* <div className="col-lg-auto"> </div> */}
                        </div>
                        <div className="col-lg-6 text-right">
                            <div className="col-lg-6"></div>
                            <div className="col-lg-6 ml-auto">
                                <Link to="/login"><a className="login text-white" href=""><i className="far fa-user" aria-hidden="true"></i> Login</a></Link>
                                &nbsp;
                                <Link to="/cart" className="text-white"><i className="fa fa-cart-plus text-white" aria-hidden="true"></i> My Cart</Link>
                            </div>
                            {/* <div className="col-md-2"></div> */}
                        </div>
                    </div>
                    {/* <div id="header" className="row text-light pt-2 pb-2">
                    </div> */}
            </div>

            {/* Navbar */}
            <div id="navbar" className="container-fluid px-0 fixed-top" style={{position: 'fixed', top: '36px'}}>
                <nav className="navbar navbar-expand-lg navbar-light bg-white">
                    <a href="/" className="navbar-brand"> <img id="logo" src="img/Logo Pro-Motion Transparan.png"/
                        ></a>
                    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    
                    <div className="collapse navbar-collapse text-uppercase" id="navbarSupportedContent">
                        <ul className="navbar-nav mr-auto mx-auto font-menu">
                        <li className="nav-item active">
                            <a href="/" className="nav-link">Home <span className="sr-only">(current)</span></a>
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
                        <form className="form-inline my-2 my-lg-0">
                        <input className="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search"/>
                        <button className="btn btn-outline-success my-2 my-sm-0" type="submit"><i className="fas fa-search"></i></button>
                        </form>
                    </div>
                </nav>
            </div>
        </div>
    )
  }
}
export default Navbar;

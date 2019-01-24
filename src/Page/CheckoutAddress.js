import React from 'react';

class CheckoutAddress extends React.Component {
    render() {
        return(
            <div style={{position: "relative", top: "120px", borderTop: "1px solid #e1e7ec"}}>
                {/* Page Title */}
                <div className="page-title">
                    <div className="container">
                    <div className="column">
                        <h1>Checkout</h1>
                    </div>
                    <div className="column">
                        <ul className="breadcrumbs">
                        <li><a href="index.html">Home</a>
                        </li>
                        <li className="separator">&nbsp;</li>
                        <li>Checkout</li>
                        </ul>
                    </div>
                    </div>
                </div>

                {/* Page Content */}
                <div className="container padding-bottom-3x mb-2">
                    <div className="row">
                    
                    {/* Checkout Adress */}
                    <div className="col-xl-9 col-lg-8" style={{paddingBottom: "80px"}}>
                        <div className="checkout-steps"><a href="/checkout-review">4. Review</a><a href="/checkout-payment"><span className="angle"></span>3. Payment</a><a href="/checkout-shipping"><span className="angle"></span>2. Shipping</a><a className="active" href="/checkout-address"><span className="angle"></span>1. Address</a></div>
                        <h4>Billing Address</h4>
                        <hr className="padding-bottom-1x"/>
                        <div className="row">
                        <div className="col-sm-6">
                            <div className="form-group">
                            <label for="checkout-fn">First Name</label>
                            <input className="form-control" type="text" id="checkout-fn"/>
                            </div>
                        </div>
                        <div className="col-sm-6">
                            <div className="form-group">
                            <label for="checkout-ln">Last Name</label>
                            <input className="form-control" type="text" id="checkout-ln"/>
                            </div>
                        </div>
                        </div>
                        <div className="row">
                        <div className="col-sm-6">
                            <div className="form-group">
                            <label for="checkout-email">E-mail Address</label>
                            <input className="form-control" type="email" id="checkout-email"/>
                            </div>
                        </div>
                        <div className="col-sm-6">
                            <div className="form-group">
                            <label for="checkout-phone">Phone Number</label>
                            <input className="form-control" type="text" id="checkout-phone"/>
                            </div>
                        </div>
                        </div>
                        <div className="row">
                        <div className="col-sm-6">
                            <div className="form-group">
                            <label for="checkout-company">Company</label>
                            <input className="form-control" type="text" id="checkout-company"/>
                            </div>
                        </div>
                        <div className="col-sm-6">
                            <div className="form-group">
                            <label for="checkout-country">Country</label>
                            <select className="form-control" id="checkout-country">
                                <option>Choose country</option>
                                <option>Australia</option>
                                <option>Canada</option>
                                <option>France</option>
                                <option>Germany</option>
                                <option>Switzerland</option>
                                <option>USA</option>
                            </select>
                            </div>
                        </div>
                        </div>
                        <div className="row">
                        <div className="col-sm-6">
                            <div className="form-group">
                            <label for="checkout-city">City</label>
                            <select className="form-control" id="checkout-city">
                                <option>Choose city</option>
                                <option>Amsterdam</option>
                                <option>Berlin</option>
                                <option>Geneve</option>
                                <option>New York</option>
                                <option>Paris</option>
                            </select>
                            </div>
                        </div>
                        <div className="col-sm-6">
                            <div className="form-group">
                            <label for="checkout-zip">ZIP Code</label>
                            <input className="form-control" type="text" id="checkout-zip"/>
                            </div>
                        </div>
                        </div>
                        <div className="row padding-bottom-1x">
                        <div className="col-sm-6">
                            <div className="form-group">
                            <label for="checkout-address1">Address 1</label>
                            <input className="form-control" type="text" id="checkout-address1"/>
                            </div>
                        </div>
                        <div className="col-sm-6">
                            <div className="form-group">
                            <label for="checkout-address2">Address 2</label>
                            <input className="form-control" type="text" id="checkout-address2"/>
                            </div>
                        </div>
                        </div>
                        <h4>Shipping Address</h4>
                        <hr className="padding-bottom-1x"/>
                        <div className="form-group">
                        <div className="custom-control custom-checkbox">
                            <input className="custom-control-input" type="checkbox" id="same_address" checked/>
                            <label className="custom-control-label" for="same_address">Same as billing address</label>
                        </div>
                        </div>
                        <div className="checkout-footer">
                        <div className="column"><a className="btn btn-outline-secondary" href="cart.html"><i className="icon-arrow-left"></i><span className="hidden-xs-down">&nbsp;Back To Cart</span></a></div>
                        <div className="column"><a className="btn btn-primary" href="checkout-shipping.html"><span className="hidden-xs-down">Continue&nbsp;</span><i className="icon-arrow-right"></i></a></div>
                        </div>
                    </div>
                    
                    {/* Sidebar */}
                    <div className="col-xl-3 col-lg-4">
                        <aside className="sidebar">
                        <div className="padding-top-2x hidden-lg-up"></div>
                        
                        {/* Order Summary Widget */}
                        <section className="widget widget-order-summary">
                            <h3 className="widget-title">Order Summary</h3>
                            <table className="table">
                            <tr>
                                <td>Cart Subtotal:</td>
                                <td className="text-medium">$289.68</td>
                            </tr>
                            <tr>
                                <td>Shipping:</td>
                                <td className="text-medium">$22.50</td>
                            </tr>
                            <tr>
                                <td>Estimated tax:</td>
                                <td className="text-medium">$3.42</td>
                            </tr>
                            <tr>
                                <td></td>
                                <td className="text-lg text-medium">$315.60</td>
                            </tr>
                            </table>
                        </section>
                        
                        {/* Featured Products Widget */}
                        <section className="widget widget-featured-products">
                            <h3 className="widget-title">Recently Viewed</h3>
                            
                            {/* Entry*/}
                            <div className="entry">
                            <div className="entry-thumb"><a href="shop-single.html"><img src="img/shop/widget/01.jpg" alt="Product"/></a></div>
                            <div className="entry-content">
                                <h4 className="entry-title"><a href="shop-single.html">Oakley Kickback</a></h4><span className="entry-meta">$155.00</span>
                            </div>
                            </div>
                            
                            {/* Entry */}
                            <div className="entry">
                            <div className="entry-thumb"><a href="shop-single.html"><img src="img/shop/widget/02.jpg" alt="Product"/></a></div>
                            <div className="entry-content">
                                <h4 className="entry-title"><a href="shop-single.html">Top-Sider Fathom</a></h4><span className="entry-meta">$90.00</span>
                            </div>
                            </div>
                            
                            {/* Entry */}
                            <div className="entry">
                            <div className="entry-thumb"><a href="shop-single.html"><img src="img/shop/widget/03.jpg" alt="Product"/></a></div>
                            <div className="entry-content">
                                <h4 className="entry-title"><a href="shop-single.html">Vented Straw Fedora</a></h4><span className="entry-meta">$49.50</span>
                            </div>
                            </div>
                            
                            {/* Entry */}
                            <div className="entry">
                            <div className="entry-thumb"><a href="shop-single.html"><img src="img/shop/widget/04.jpg" alt="Product"/></a></div>
                            <div className="entry-content">
                                <h4 className="entry-title"><a href="shop-single.html">Big Wordmark Tote</a></h4><span className="entry-meta">$29.99</span>
                            </div>
                            </div>
                        </section>
                        
                        {/* Promo Banner */}
                        <section className="promo-box" style={{backgroundImage: "url(img/banners/02.jpg)"}}><span className="overlay-dark" style={{opacity: ".4"}}></span>
                            <div className="promo-box-content text-center padding-top-2x padding-bottom-2x">
                            <h4 className="text-light text-thin text-shadow">New Collection of</h4>
                            <h3 className="text-bold text-light text-shadow">Sunglasses</h3><a className="btn btn-outline-white btn-sm" href="shop-grid-ls.html">Shop Now</a>
                            </div>
                        </section>
                        </aside>
                    </div>
                    </div>
                </div>
            </div>
        )
    }
}
export default CheckoutAddress;
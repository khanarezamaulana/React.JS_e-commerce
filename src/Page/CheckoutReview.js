import React from 'react';

class CheckoutReview extends React.Component {
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
                    <div className="row" >
            
                        {/* Checkout Adress */}
                        <div className="col-xl-9 col-lg-8" style={{paddingBottom: "80px"}}>
                        <div className="checkout-steps">
                            <a className="active" href="/checkout-review">4. Review</a>
                            <a className="completed" href="/checkout-payment"><span className="step-indicator icon-circle-check"></span><span className="angle"></span>3. Payment</a>
                            <a className="completed" href="/checkout-shipping"><span className="step-indicator icon-circle-check"></span><span className="angle"></span>2. Shipping</a>
                            <a className="completed" href="/checkout-address"><span className="step-indicator icon-circle-check"></span><span className="angle"></span>1. Address</a>
                        </div>
                        <h4>Review Your Order</h4>
                        <hr className="padding-bottom-1x"/>
                        <div className="table-responsive shopping-cart">
                            <table className="table">
                            <thead>
                                <tr>
                                <th>Product Name</th>
                                <th className="text-center">Subtotal</th>
                                <th></th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                <td>
                                    <div className="product-item"><a className="product-thumb" href="shop-single.html"><img src="img/shop/cart/01.jpg" alt="Product"/></a>
                                    <div className="product-info">
                                        <h4 className="product-title"><a href="shop-single.html">Unionbay Park<small>x 1</small></a></h4><span><em>Size:</em> 10.5</span><span><em>Color:</em> Dark Blue</span>
                                    </div>
                                    </div>
                                </td>
                                <td className="text-center text-lg text-medium">$43.90</td>
                                <td className="text-center"><a className="btn btn-outline-primary btn-sm" href="cart.html">Edit</a></td>
                                </tr>
                                <tr>
                                <td>
                                    <div className="product-item"><a className="product-thumb" href="shop-single.html"><img src="img/shop/cart/02.jpg" alt="Product"/></a>
                                    <div className="product-info">
                                        <h4 className="product-title"><a href="shop-single.html">Daily Fabric Cap<small>x 2</small></a></h4><span><em>Size:</em> XL</span><span><em>Color:</em> Black</span>
                                    </div>
                                    </div>
                                </td>
                                <td className="text-center text-lg text-medium">$24.89</td>
                                <td className="text-center"><a className="btn btn-outline-primary btn-sm" href="cart.html">Edit</a></td>
                                </tr>
                                <tr>
                                <td>
                                    <div className="product-item"><a className="product-thumb" href="shop-single.html"><img src="img/shop/cart/03.jpg" alt="Product"/></a>
                                    <div className="product-info">
                                        <h4 className="product-title"><a href="shop-single.html">Cole Haan Crossbody<small>x 1</small></a></h4><span><em>Size:</em> -</span><span><em>Color:</em> Turquoise</span>
                                    </div>
                                    </div>
                                </td>
                                <td className="text-center text-lg text-medium">$200.00</td>
                                <td className="text-center"><a className="btn btn-outline-primary btn-sm" href="cart.html">Edit</a></td>
                                </tr>
                            </tbody>
                            </table>
                        </div>
                        <div className="shopping-cart-footer">
                            <div className="column"></div>
                            <div className="column text-lg">Subtotal: <span className="text-medium">$289.68</span></div>
                        </div>
                        <div className="row padding-top-1x mt-3">
                            <div className="col-sm-6">
                            <h5>Shipping to:</h5>
                            <ul className="list-unstyled">
                                <li><span className="text-muted">Client:</span>Daniel Adams</li>
                                <li><span className="text-muted">Address:</span>44 Shirley Ave. West Chicago, IL 60185, USA</li>
                                <li><span className="text-muted">Phone:</span>+1(808) 764 554 330</li>
                            </ul>
                            </div>
                            <div className="col-sm-6">
                            <h5>Payment method:</h5>
                            <ul className="list-unstyled">
                                <li><span className="text-muted">Credit Card:</span>**** **** **** 5300</li>
                            </ul>
                            </div>
                        </div>
                        <div className="checkout-footer margin-top-1x">
                            <div className="column hidden-xs-down"><a className="btn btn-outline-secondary" href="checkout-payment.html"><i className="icon-arrow-left"></i>&nbsp;Back</a></div>
                            <div className="column"> <a className="btn btn-primary" href="/checkout-complete">Complete Order</a></div>
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
                            {/* Entry */}
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
export default CheckoutReview;
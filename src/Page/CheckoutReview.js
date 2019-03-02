import React from 'react';
import OrderSummary from '../Components/OrderSummary';

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
                        <a><span className=""></span>4. Payment</a>
                            {/* <a>3. Review</a> */}
                            <a className="active"><span className="angle"></span>3. Review</a>
                            
                            {/* <a className="active">4. Review</a>
                            <a className="completed"><span className="step-indicator icon-circle-check"></span><span className="angle"></span>3. Payment</a> */}
                            <a className="completed"><span className="step-indicator icon-circle-check"></span><span className="angle"></span>2. Shipping</a>
                            <a className="completed"><span className="step-indicator icon-circle-check"></span><span className="angle"></span>1. Address</a>
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
                                    <div className="product-item"><a className="product-thumb"><img src="img/shop/cart/01.jpg" alt="Product"/></a>
                                    <div className="product-info">
                                        <h4 className="product-title"><a href="shop-single.html">Unionbay Park<small>x 1</small></a></h4><span><em>Size:</em> 10.5</span><span><em>Color:</em> Dark Blue</span>
                                    </div>
                                    </div>
                                </td>
                                <td className="text-center text-lg text-medium">Rp. 495000</td>
                                <td className="text-center"><a className="btn btn-outline-primary btn-sm" href="/cart">Edit</a></td>
                                </tr>
                            </tbody>
                            </table>
                        </div>
                        <div className="shopping-cart-footer">
                            <div className="column"></div>
                            <div className="column text-lg">Subtotal: <span className="text-medium">Rp. 495000</span></div>
                        </div>
                        <div className="row padding-top-1x mt-3">
                            <div className="col-sm-6">
                            <h5>Shipping to:</h5>
                            <ul className="list-unstyled">
                                <li><span className="text-muted">Client:</span> Khana Reza Maulana</li>
                                <li><span className="text-muted">Address:</span> Jalan Jend. Sudriman</li>
                                <li><span className="text-muted">Phone:</span> +62 852 9611 6745</li>
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
                            <div className="column hidden-xs-down"><a className="btn btn-outline-secondary" href="/checkout-shipping"><i className="icon-arrow-left"></i>&nbsp;Back</a></div>
                            <div className="column"><a className="btn btn-primary" href="/checkout-payment"><span className="hidden-xs-down">Continue&nbsp;</span><i className="icon-arrow-right"></i></a></div>
                            {/* <div className="column"> <a className="btn btn-primary" href="/checkout-complete">Complete Order</a></div> */}
                        </div>
                        </div>
                        {/* Sidebar */}
                        <div className="col-xl-3 col-lg-4">
                        <aside className="sidebar">
                            <div className="padding-top-2x hidden-lg-up"></div>
            
                            {/* Order Summary Widget */}
                            <section className="widget widget-order-summary">
                            
                                <React.Fragment>
                                    <OrderSummary />
                                </React.Fragment>

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
import React from 'react';
import OrderSummary from '../Components/OrderSummary';

class CheckoutPayment extends React.Component {
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
                    
                    {/* Checkout Payment */}
                    <div className="col-xl-9 col-lg-8" style={{paddingBottom: "80px"}}>
                        <div className="checkout-steps">
                        <a className="active"><span className=""></span>4. Payment</a>
                        <a className="completed"><span className="step-indicator icon-circle-check"></span><span className="angle"></span>3. Review</a>
                            {/* <a>4. Review</a>
                            <a className="active"><span className="angle"></span>3. Payment</a> */}
                            <a className="completed"><span className="step-indicator icon-circle-check"></span><span className="angle"></span>2. Shipping</a>
                            <a className="completed"><span className="step-indicator icon-circle-check"></span><span className="angle"></span>1. Address</a>
                        </div>
                        <h4>Choose Payment Method</h4>
                        <hr className="padding-bottom-1x"/>
                        <div className="accordion" id="accordion" role="tablist">

                        {/* Bank Transfer */}
                        <div className="card">
                            <div className="card-header" role="tab">
                            <h6><a href="#card" data-toggle="collapse"><i className="icon-columns"></i>Pay with Bank Transfer</a></h6>
                            </div>
                            <div className="collapse show" id="card" data-parent="#accordion" role="tabpanel">
                            <div className="card-body">
                                <p>We accept following Bank Transfer:&nbsp;&nbsp; <img className="d-inline-block align-middle" src="img/credit-cards.png" style={{width: "120px"}} alt="Cerdit Cards"/></p>
                                <form className="interactive-credit-card row">
                                <div className="form-group col-sm-6">
                                    <input className="form-control" type="text" name="number" placeholder="Card Number" required/>
                                </div>
                                <div className="form-group col-sm-6">
                                    <input className="form-control" type="text" name="name" placeholder="Full Name" required/>
                                </div>
                                <div className="form-group col-sm-3">
                                    <input className="form-control" type="text" name="expiry" placeholder="MM/YY" required/>
                                </div>
                                <div className="form-group col-sm-3">
                                    <input className="form-control" type="text" name="cvc" placeholder="CVC" required/>
                                </div> 
                                <div className="col-sm-6">
                                    <button className="btn btn-outline-primary btn-block margin-top-none" type="submit">Konfirmasi Pembayaran</button>
                                </div>
                                </form>
                            </div>
                            </div>
                        </div>

                        {/* Credit Card */}
                        {/* <div className="card">
                            <div className="card-header" role="tab">
                            <h6><a className="collapsed" href="#card" data-toggle="collapse"><i className="icon-columns"></i>Pay with Credit Card</a></h6>
                            </div>
                            <div className="collapse" id="card" data-parent="#accordion" role="tabpanel">
                            <div className="card-body">
                                <p>We accept following credit cards:&nbsp;<img className="d-inline-block align-middle" src="img/credit-cards.png" style={{width: "120px"}} alt="Cerdit Cards"/></p>
                                <div className="card-wrapper"></div>
                                <form className="interactive-credit-card row">
                                <div className="form-group col-sm-6">
                                    <input className="form-control" type="text" name="number" placeholder="Card Number" required/>
                                </div>
                                <div className="form-group col-sm-6">
                                    <input className="form-control" type="text" name="name" placeholder="Full Name" required/>
                                </div>
                                <div className="form-group col-sm-3">
                                    <input className="form-control" type="text" name="expiry" placeholder="MM/YY" required/>
                                </div>
                                <div className="form-group col-sm-3">
                                    <input className="form-control" type="text" name="cvc" placeholder="CVC" required/>
                                </div>
                                <div className="col-sm-6">
                                    <button className="btn btn-outline-primary btn-block margin-top-none" type="submit">Submit</button>
                                </div>
                                </form>
                            </div>
                            </div>
                        </div> */}

                        {/* Paypal */}
                        {/* <div className="card">
                            <div className="card-header" role="tab">
                            <h6><a className="collapsed" href="#paypal" data-toggle="collapse"><i className="socicon-paypal"></i>Pay with PayPal</a></h6>
                            </div>
                            <div className="collapse" id="paypal" data-parent="#accordion" role="tabpanel">
                            <div className="card-body">
                                <p>PayPal - the safer, easier way to pay</p>
                                <form className="row" method="post">
                                <div className="col-sm-6">
                                    <div className="form-group">
                                    <input className="form-control" type="email" placeholder="E-mail" required/>
                                    </div>
                                </div>
                                <div className="col-sm-6">
                                    <div className="form-group">
                                    <input className="form-control" type="password" placeholder="Password" required/>
                                    </div>
                                </div>
                                <div className="col-12">
                                    <div className="d-flex flex-wrap justify-content-between align-items-center"><a className="navi-link" href="#">Forgot password?</a>
                                    <button className="btn btn-outline-primary margin-top-none" type="submit">Log In</button>
                                    </div>
                                </div>
                                </form>
                            </div>
                            </div>
                        </div> */}
                        </div>

                        <div className="checkout-footer margin-top-1x">
                        <div className="column"><a className="btn btn-outline-secondary" href="/checkout-review"><i className="icon-arrow-left"></i><span className="hidden-xs-down">&nbsp;Back</span></a></div>
                        {/* <div className="column"><a className="btn btn-primary" href="/checkout-review"><span className="hidden-xs-down">Continue&nbsp;</span><i className="icon-arrow-right"></i></a></div> */}
                        <div className="column"> <a className="btn btn-primary" href="/checkout-complete">Complete Order</a></div>
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
export default CheckoutPayment;
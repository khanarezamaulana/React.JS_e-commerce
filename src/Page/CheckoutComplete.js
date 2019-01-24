import React from 'react';

class CheckoutComplete extends React.Component {
    render() {
        return(

            <div style={{paddingTop: "180px"}}>
                    {/* Page Content */}
                    <div className="container padding-bottom-3x mb-2">
                    <div className="card text-center">
                        <div className="card-body padding-top-2x">
                        <h3 className="card-title">Thank you for your order!</h3>
                        <p className="card-text">Your order has been placed and will be processed as soon as possible.</p>
                        <p className="card-text">Make sure you make note of your order number, which is <span className="text-medium">34VB5540K83</span></p>
                        <p className="card-text">You will be receiving an email shortly with confirmation of your order. 
                            <u>You can now:</u>
                        </p>
                        <div className="padding-top-1x padding-bottom-1x"><a className="btn btn-outline-secondary" href="/shop">Go Back Shopping</a></div>
                        </div>
                    </div>
                </div>
            </div>

        )
    }
}
export default CheckoutComplete;
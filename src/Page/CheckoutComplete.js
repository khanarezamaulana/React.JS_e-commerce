import React from 'react';
import axios from 'axios';

class CheckoutComplete extends React.Component {

    constructor(){
        super();
        this.state = {

            transactionID: "",
            namaBank: "",
            pemilikRekening: "",
            nomorRekening: "",
            jumlahTransfer: ""
        }
    }

    componentDidMount(){

        // get userID yang lagi login dari local storage
        var userID = localStorage.getItem("userid")
        axios.get(`http://localhost:2018/transaction/${userID}`).then((x) => {
            console.log(x.data[0])
            // console.log(userID)
            // console.log('hahah')
            this.setState({
                transactionID: x.data[0].transactionID
            })
        }).catch((err) => {
            console.log('error')
        })
    }

    render() {
        return(

            <div style={{paddingTop: "180px"}}>
                    {/* Page Content */}
                    <div className="container padding-bottom-3x mb-2">
                    <div className="card text-center">
                        <div className="card-body padding-top-2x">
                        <h3 className="card-title">Thank you for your order!</h3>
                        <p className="card-text">Your order has been placed and will be processed as soon as possible.</p>
                        <p className="card-text">Make sure you make note of your order number, which is <span className="text-medium">{this.state.transactionID}</span></p>
                        <p className="card-text">

                            Please make payment to the account below: <br/>

                            Bank BCA 043-0951-475 a/n Khana Reza Maulana <br/><br/>

                            URGENT: If you already a transfer, you have to CONFIRM the PAYMENT!
                            </p>
                        <p className="card-text">You will be receiving an email shortly with confirmation of your order. </p>
                        <div className="row">
                            <div className="padding-top-1x padding-bottom-1x col-lg-6"><a className="btn btn-outline-secondary" href="/shop">Go Back Shopping</a></div>
                            <div className="padding-top-1x padding-bottom-1x col-lg-6"><a className="btn btn-primary" href="/confirmpayment">Confirm Payment</a></div>
                        </div>
                        </div>
                    </div>
                </div>
            </div>

        )
    }
}
export default CheckoutComplete;
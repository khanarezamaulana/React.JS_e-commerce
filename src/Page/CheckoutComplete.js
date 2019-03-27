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
            jumlahTransfer: "",
            total: "",
            cart: "",
            ongkir: "",
            subTotal: ""
        }
    }

    componentDidMount(){

        // get userID yang lagi login dari local storage
        var userID = localStorage.getItem("userid")
        axios.get(`http://localhost:2018/transaction/${userID}`).then((x) => {
            console.log(x.data[0])
            // console.log(userID)
            console.log('hahah')
            console.log(x.data)
            
            // get ongkir berdasarkan city_id
            this.getOngkir(x.data[0].city);

            this.setState({
                transactionID: x.data[0].transactionID
            })
        }).catch((err) => {
            console.log('error')
        })

        // untuk dapetin data cart user
        axios.get(`http://localhost:2018/cart/${userID}`)
        .then((x) => {
            this.setState({
                cart: x.data
            })
        })
    }

    // fungsi untuk menghitung total harga (subTotal)
    total(){
        var total = 0;
        for(var i = 0; i<this.state.cart.length; i++){
            total += this.state.cart[i].totalPrice
        }
        return total 
    }

    // fungsi untuk GET ongkir dari route backend yang dapet dari API Raja Ongkir
    getOngkir = (city) => {
        axios.get(`http://localhost:2018/shipping/${city}`).then((x) => {
            this.setState({
                ongkir: x.data.rajaongkir.results[0].costs[1].cost[0].value,
                // subTotal: this.total() + this.state.ongkir
            })
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

                    {/* Sidebar */}
                    {/* <div className="col-xl-3 col-lg-4" style={{marginBottom: "80px"}}>
                        <aside className="sidebar">
                        <div className="padding-top-2x hidden-lg-up"></div> */}
                        
                        {/* Order Summary Widget */}
                        {/* <section className="widget widget-order-summary">
                            <h3 className="widget-title">Order Summary</h3>
                            <table className="table">
                                <tr>
                                    <td>Cart Subtotal:</td>
                                    <td className="text-medium">Rp. {this.total().toLocaleString()}</td>
                                </tr>
                                <tr>
                                    <td>Shipping (JNE Reguler):</td>
                                    <td className="text-medium">Rp. {this.state.ongkir.toLocaleString()}</td>
                                </tr>
                                <tr>
                                    <td></td>
                                    <td className="text-lg text-medium">Rp. {parseInt(this.total() + this.state.ongkir).toLocaleString()}</td>
                                </tr>
                            </table>
                        </section>
                        </aside>
                    </div> */}
                </div>
            </div>

        )
    }
}
export default CheckoutComplete;
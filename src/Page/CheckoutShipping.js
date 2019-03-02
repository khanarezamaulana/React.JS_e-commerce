import React from 'react';
import OrderSummary from '../Components/OrderSummary';
import axios from 'axios';

class CheckoutShipping extends React.Component {

    constructor(){
        super();
        this.state = {
            total: "",
            cart: "",
            ongkir: "",
            subTotal: ""
        }
    }

    // untuk dapetin userID buat dapetin city_id nya, untuk dapet ongkirnya dari API Raja Ongkir
    componentDidMount(){
        this.setState({isLoading: true})

        // get userID yang lagi login dari local storage
        var userID = localStorage.getItem("userid")

        // get data user from database
        axios.get(`http://localhost:2018/users/${userID}`).then((x) => {
            // console.log(x.data[0])
            console.log(x.data[0])

            // get ongkir berdasarkan city_id
            this.getOngkir(x.data[0].city);
            this.setState({
                province_id: x.data[0].province,
                city_id: x.data[0].city,
                dataUser: x.data[0],
                isLoading: false
            })
        }).catch((x) => {
            console.log(x)
        })
    }

    // fungsi untuk GET ongkir dari route backend yang dapet dari API Raja Ongkir
    getOngkir = (city) => {
        axios.get(`http://localhost:2018/shipping/${city}`).then((x) => {
            this.setState({
                ongkir: x.data.rajaongkir.results[0].costs[1].cost[0].value,
            })
        })    
    }

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
                    
                    {/* Checkout Shipping */}
                    <div className="col-xl-9 col-lg-8" style={{paddingBottom: "80px"}}>
                        <div className="checkout-steps">
                        <a><span className=""></span>4. Payment</a>
                            {/* <a>3. Review</a> */}
                            <a className=""><span className="angle"></span>3. Review</a>
                        <a className="active"><span className="angle"></span>2. Shipping</a>
                        <a className="completed"><span className="angle"></span><span className="step-indicator icon-circle-check"></span>1. Address</a></div>
                        <h4>Choose Shipping Method</h4>
                        <hr className="padding-bottom-1x"/>
                        <div className="table-responsive">
                        <table className="table table-hover">
                            <thead className="thead-default">
                            <tr>
                                <th></th>
                                <th>Shipping method</th>
                                <th>Delivery time</th>
                                <th>Handling fee</th>
                            </tr>
                            </thead>
                            <tbody>
                            <tr>
                                <td className="align-middle">
                                <div className="custom-control custom-radio mb-0">
                                    <input className="custom-control-input" type="radio" id="local" name="shipping-method" checked/>
                                    <label className="custom-control-label" for="local"></label>
                                </div>
                                </td>
                                <td className="align-middle"><span className="text-medium">JNE</span><br/><span className="text-muted text-sm">Layanan Reguler</span></td>
                                <td className="align-middle">1 - 2 days</td>
                                <td className="align-middle">Rp. {this.state.ongkir}</td>
                            </tr>
                            {/* <tr>
                                <td className="align-middle">
                                <div className="custom-control custom-radio mb-0">
                                    <input className="custom-control-input" type="radio" id="courier" name="shipping-method" checked/>
                                    <label className="custom-control-label" for="courier"></label>
                                </div>
                                </td>
                                <td className="align-middle"><span className="text-medium">JNE</span><br/><span className="text-muted text-sm">OKE (Ongkos Kirim Ekonomis)</span></td>
                                <td className="align-middle">2 - 3 days</td>
                                <td className="align-middle">Rp. 33000</td>
                            </tr>
                            <tr>
                                <td className="align-middle">
                                <div className="custom-control custom-radio mb-0">
                                    <input className="custom-control-input" type="radio" id="local" name="shipping-method"/>
                                    <label className="custom-control-label" for="local"></label>
                                </div>
                                </td>
                                <td className="align-middle"><span className="text-medium">JNE</span><br/><span className="text-muted text-sm">Layanan Reguler</span></td>
                                <td className="align-middle">1 - 2 days</td>
                                <td className="align-middle">Rp. 56000</td>
                            </tr>
                            <tr>
                                <td className="align-middle">
                                <div className="custom-control custom-radio mb-0">
                                    <input className="custom-control-input" type="radio" id="flat" name="shipping-method"/>
                                    <label className="custom-control-label" for="flat"></label>
                                </div>
                                </td>
                                <td className="align-middle"><span className="text-medium">JNE</span><br/><span className="text-muted text-sm">YES (Yakin Esok Sampai)</span></td>
                                <td className="align-middle">1 days</td>
                                <td className="align-middle">Rp. 88000</td>
                            </tr> */}
                            </tbody>
                        </table>
                        </div>
                        <div className="checkout-footer margin-top-1x">
                        <div className="column"><a className="btn btn-outline-secondary" href="/checkout-address"><i className="icon-arrow-left"></i><span className="hidden-xs-down">&nbsp;Back</span></a></div>
                        <div className="column"><a className="btn btn-primary" href="/checkout-review"><span className="hidden-xs-down">Continue&nbsp;</span><i className="icon-arrow-right"></i></a></div>
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
                
                            {/* Featured Products Widget */}
                            {/* <section className="widget widget-featured-products">
                                <h3 className="widget-title">Recently Viewed</h3> */}
                                
                                {/* Entry */}
                                {/* <div className="entry">
                                <div className="entry-thumb"><a href="shop-single.html"><img src="img/shop/widget/01.jpg" alt="Product"/></a></div>
                                <div className="entry-content">
                                    <h4 className="entry-title"><a href="shop-single.html">Oakley Kickback</a></h4><span className="entry-meta">$155.00</span>
                                </div>
                                </div>
                                */}
                                {/* Entry */}
                                {/* <div className="entry">
                                <div className="entry-thumb"><a href="shop-single.html"><img src="img/shop/widget/02.jpg" alt="Product"/></a></div>
                                <div className="entry-content">
                                    <h4 className="entry-title"><a href="shop-single.html">Top-Sider Fathom</a></h4><span className="entry-meta">$90.00</span>
                                </div>
                                </div> */}
                                
                                {/* Entry */}
                                {/* <div className="entry">
                                <div className="entry-thumb"><a href="shop-single.html"><img src="img/shop/widget/03.jpg" alt="Product"/></a></div>
                                <div className="entry-content">
                                    <h4 className="entry-title"><a href="shop-single.html">Vented Straw Fedora</a></h4><span className="entry-meta">$49.50</span>
                                </div>
                                </div> */}
                                
                                {/* Entry */}
                                {/* <div className="entry">
                                <div className="entry-thumb"><a href="shop-single.html"><img src="img/shop/widget/04.jpg" alt="Product"/></a></div>
                                <div className="entry-content">
                                    <h4 className="entry-title"><a href="shop-single.html">Big Wordmark Tote</a></h4><span className="entry-meta">$29.99</span>
                                </div>
                                </div>
                            </section> */}
                            
                            {/* Promo Banner */}
                            {/* <section className="promo-box" style={{backgroundImage: "url(img/banners/02.jpg)"}}><span className="overlay-dark" style={{opacity: ".4"}}></span>
                                <div className="promo-box-content text-center padding-top-2x padding-bottom-2x">
                                <h4 className="text-light text-thin text-shadow">New Collection of</h4>
                                <h3 className="text-bold text-light text-shadow">Sunglasses</h3><a className="btn btn-outline-white btn-sm" href="shop-grid-ls.html">Shop Now</a>
                                </div>
                            </section> */}
                        </aside>
                    </div>
                    </div>
                </div>
            </div>            
        )
    }
}
export default CheckoutShipping;
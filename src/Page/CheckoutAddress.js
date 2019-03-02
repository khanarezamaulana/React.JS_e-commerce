import React, { useReducer } from 'react';
import axios from 'axios';
import OrderSummary from '../Components/OrderSummary';

class CheckoutAddress extends React.Component {

    constructor() {
        super();
        this.state = {
            dataUser: {
                transactionID: "",
                firstname: "",
                lastname: "",
                email: "",
                phoneNumber: "",
                country: "",
                province: "",
                city: "",
                address: "",
                subtotal: ""
            },
            isLoading: false,
            provinces: "",
            cities: "",
            province_id: "",
            postal_code: "",
            ongkir: "",
            cart: ""
        }
    }

    componentWillReceiveProps(){
        // alert(this.props.total)
        this.setState({
            total: this.props.total
        })
    }

    componentDidMount(){
        this.setState({isLoading: true})

        // get userID yang lagi login dari local storage
        var userID = localStorage.getItem("userid")

        // get data user from database
        axios.get(`http://localhost:2018/users/${userID}`).then((x) => {
            console.log(x.data[0])
            this.setState({
                province_id: x.data[0].province,
                city_id: x.data[0].city,
                dataUser: x.data[0],
                isLoading: false
            })

            // untuk dapetin zipcode berdasarkan city user
            // axios.get(`http://localhost:2018/city/${x.data[0].city}`).then((x) => {
            // console.log(x.data.rajaongkir.results.postal_code)
            //     this.setState({
            //         postal_code: x.data.rajaongkir.results.postal_code
            //     });
            // })
        }).catch((x) => {
            console.log(x)
        })

        // var userID = localStorage.getItem("userid");
        axios.get(`http://localhost:2018/cart/${userID}`)
        .then((x) => {
            this.setState({
                cart: x.data
            })
        })

        // get province API Raja Ongkir from route backend
        // axios.get('http://localhost:2018/province').then((x) => {
        //     console.log(x.data.rajaongkir.results)
        //     this.setState({
        //         provinces: x.data.rajaongkir.results
        //     })
        // }).catch((err) => {
        //     console.log(err)
        // })

        // get city API Raja Ongkir from route backend
        // axios.get('http://localhost:2018/city').then((x) => {
        //     console.log(x.data.rajaongkir.results)
        //     this.setState({
        //         cities: x.data.rajaongkir.results
        //     })
        // }).catch((err) => {
        //         console.log(err)
        // })

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
    // getOngkir = (city) => {
    //     axios.get(`http://localhost:2018/shipping/${this.state.dataUser.city}`).then((x) => {
    //         this.setState({
    //             ongkir: x.data.rajaongkir.results[0].costs[1].cost[0].value,
                // subTotal: this.total() + this.state.ongkir
            // })
            // alert(x.data.rajaongkir.results[0].costs[1].cost[0].value)
        // })    
    // }

    checkout = () => {
        // this.getOngkir();
        var detik = (new Date().getSeconds().toString())
        var milidetik = (new Date().getMilliseconds()).toString();
        var invoice = detik + milidetik
        var date = new Date();
        var order_date = date.getDate() + "-" + (date.getMonth() + 1) + "-" + date.getFullYear();
        console.log(this.state.dataUser)
        
        axios.post('http://localhost:2018/transaction', {
            transactionID: invoice,
            firstname: this.state.dataUser.firstname,
            lastname: this.state.dataUser.lastname,
            email: this.state.dataUser.email,
            phoneNumber: this.state.dataUser.phoneNumber,
            country: this.state.dataUser.country,
            province: this.state.dataUser.province,
            city: this.state.dataUser.city,
            zipcode: this.state.dataUser.postal_code,
            address: this.state.dataUser.address,
            subtotal: parseInt(this.total()) + this.state.ongkir,
            status: "NotPaid",
            orderDate: order_date
        }).then(() => {
            
            console.log(this.state.cart[0].cartID)
            for(var j = 0; j<this.state.cart.length; j++){
                console.log(this.state.cart[j].cartID)
                axios.post(`http://localhost:2018/order`,{
                    invoice: invoice,
                    userID: localStorage.getItem("userid"),
                    productID: this.state.cart[j].productID,
                    quantity: this.state.cart[j].quantity
                }).then(() => {
                    axios.delete(`http://localhost:2018/carts/${localStorage.getItem("userid")}`)
                })
            }
            // alert("sukses");
            window.location.href="/checkout-complete";
        }).catch(() => {
            alert("gagal")
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
                    
                    {/* Checkout Adress */}
                    <div className="col-xl-9 col-lg-8" style={{marginBottom: "80px"}}>
                        <div className="checkout-steps">
                        <a><span className=""></span></a>
                            {/* <a>3. Review</a> */}
                            <a className=""><span></span></a>
                            
                            <a><span></span></a>
                            <a className="active" href="/checkout-address"><span className="angle"></span>1. Address</a>
                        </div>
                        <h4>Billing Address</h4>
                        <hr className="padding-bottom-1x"/>
                        <div className="row">
                        <div className="col-sm-6">
                            <div className="form-group">
                            <label for="checkout-fn">First Name</label>
                            <input className="form-control" type="text" id="checkout-fn" 
                                value={this.state.dataUser && this.state.dataUser.firstname}
                                onChange={(e) => {
                                    let data = this.state.dataUser;
                                    data.firstname = e.target.value;
                                    this.setState({dataUser: data})
                                }}
                                placeholder= "First name"
                            />
                            </div>
                        </div>
                        <div className="col-sm-6">
                            <div className="form-group">
                            <label for="checkout-ln">Last Name</label>
                            <input className="form-control" type="text" id="checkout-ln"
                                value={this.state.dataUser && this.state.dataUser.lastname}
                                onChange={(e) => {
                                    let data = this.state.dataUser;
                                    data.lastname = e.target.value;
                                    this.setState({dataUser: data})
                                }}
                                placeholder= "Last name"
                            />
                            </div>
                        </div>
                        </div>
                        <div className="row">
                        <div className="col-sm-6">
                            <div className="form-group">
                            <label for="checkout-email">E-mail Address</label>
                            <input className="form-control" type="email" id="checkout-email"
                                value={this.state.dataUser && this.state.dataUser.email}
                                onChange={(e) => {
                                    let data = this.state.dataUser;
                                    data.email = e.target.value;
                                    this.setState({dataUser: data})
                                }}
                                placeholder= "Enter email"
                            />
                            </div>
                        </div>
                        <div className="col-sm-6">
                            <div className="form-group">
                            <label for="checkout-phone">Phone Number</label>
                            <input className="form-control" type="text" id="checkout-phone"
                                value={this.state.dataUser && this.state.dataUser.phoneNumber}
                                onChange={(e) => {
                                    let data = this.state.dataUser;
                                    data.phoneNumber = e.target.value;
                                    this.setState({dataUser: data})
                                }}
                                placeholder= "Phone number"
                            />
                            </div>
                        </div>
                        </div>
                        <div className="row">
                        <div className="col-sm-6">
                            <div className="form-group">
                                <label for="checkout-country">Country</label>
                                <select className="form-control" id="checkout-country">
                                    <option hidden>Choose country</option>
                                    <option selected>Indonesia</option>
                                </select>
                            </div>
                        </div>
                        <div className="col-sm-6">
                            <div className="form-group">
                                <label for="checkout-province">Province</label>
                                <select className="form-control" id="checkout-province" value={this.state.dataUser.province}
                                    onChange={(e) => {
                                        let data = this.state.dataUser;
                                        data.province = e.target.value
                                        this.setState({dataUser: data, province_id: e.target.value}) 
                                        // state province_id sementara buat nampung id untuk dapetin city 
                                    }}
                                >
                                    <option hidden>Choose Province</option>
                                    {this.state.provinces ? this.state.provinces.map((val) => {
                                                    
                                        return (
                                            <option value={val.province_id}>{val.province}</option>
                                        )
                                        
                                    }) : ""}
                                </select>
                            </div>
                        </div>
                        <div className="col-sm-6">
                            <div className="form-group">
                                <label for="checkout-city">City</label>
                                <select className="form-control" id="checkout-city" value={this.state.dataUser.city} 
                                    onChange={(e) => {
                                        let data = this.state.dataUser;
                                            data.city = e.target.value.split('-')[0]
                                            data.postal_code = e.target.value.split('-')[1]
                                            this.setState({dataUser: data})
                                            
                                            // untuk dapetin zipcode nya berdasarkan city user
                                            axios.get(`http://localhost:2018/city/${e.target.value}`).then((x) => {
                                                this.setState({
                                                    postal_code: x.data.rajaongkir.results.postal_code
                                                })
                                            })
                                    }}
                                >
                                    <option hidden>Choose city</option>
                                    {this.state.cities ? this.state.cities.map((val) => {
                                        if(val.province_id == this.state.province_id || val.province_id == this.state.dataUser.province){
                                            return (
                                                // buat auto generate zip code
                                                <option value={val.city_id}>{val.city_name}</option>
                                            )}
                                        }) : ""}
                                </select>
                            </div>
                        </div>
                        <div className="col-sm-6">
                            <div className="form-group">
                                <label for="checkout-zip">ZIP Code</label>
                                <input disabled className="form-control" type="text" id="checkout-zip" 
                                    value={this.state.dataUser.postal_code || this.state.postal_code}
                                    onChange={(e) => {
                                        let data = this.state.dataUser;
                                        data.postal_code = e.target.value
                                        this.setState({
                                            dataUser: data
                                        })
                                    }}
                                />
                            </div>
                        </div>
                        </div>
                        <div className="row">
                            <div className="col-sm-12">
                                <div className="form-group">
                                    <label for="checkout-company">Address</label>
                                    <input className="form-control" type="text" id="checkout-company"
                                        value={this.state.dataUser && this.state.dataUser.address}
                                        onChange={(e) => {
                                            let data = this.state.dataUser;
                                            data.address = e.target.value;
                                            this.setState({dataUser: data})
                                        }}
                                        placeholder= "Enter address"
                                    />
                                </div>
                            </div>
                        </div>
                        {/* <div className="row padding-bottom-1x">
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
                        </div> */}
                        <h4>Shipping Address</h4>
                        <hr className="padding-bottom-1x"/>
                        <div className="form-group">
                        <div className="custom-control custom-checkbox">
                            <input className="custom-control-input" type="checkbox" id="same_address" checked/>
                            <label className="custom-control-label" for="same_address">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Same as billing address</label>
                        </div>
                        </div>
                        <div className="checkout-footer">
                        <div className="column">
                        {/* <a className="btn btn-outline-secondary" href="/cart"><i className="icon-arrow-left"></i><span className="hidden-xs-down">&nbsp;Back To Cart</span></a> */}
                        </div>
                        <div className="column"><a className="btn btn-outline-primary" onClick={this.checkout}><span className="hidden-xs-down">Complete Order&nbsp;</span><i className="icon-arrow-right"></i></a></div>
                        </div>
                    </div>
                    
                    {/* Sidebar */}
                    <div className="col-xl-3 col-lg-4" style={{marginBottom: "80px"}}>
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
                            
                            {/* Entry*/}
                            {/* <div className="entry">
                            <div className="entry-thumb"><a href="shop-single.html"><img src="img/shop/widget/01.jpg" alt="Product"/></a></div>
                            <div className="entry-content">
                                <h4 className="entry-title"><a href="shop-single.html">Oakley Kickback</a></h4><span className="entry-meta">$155.00</span>
                            </div>
                            </div> */}
                            
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
                            </div> */}
                        {/* </section> */}
                        
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
export default CheckoutAddress;
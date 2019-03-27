import React from 'react';
import axios from 'axios';

class MyAddress extends React.Component {

    constructor(){
        super();
        this.state = {
            dataUser: {
                country: "",
                province: "",
                city: "",
                zipcode: "",
                address: "",
                province_id: "",
                postal_code: "",
                city :""
            },
            provinces: "",
            cities: "",
            province_id: "" // state sementara buat nampung id
        }
    }

    componentDidMount(){
        // get province API Raja Ongkir from route backend
        axios.get('http://localhost:2018/province').then((x) => {
            console.log(x.data.rajaongkir.results)
            this.setState({
                provinces: x.data.rajaongkir.results
            })
        }).catch((err) => {
            console.log(err)
        })

        // get city API Raja Ongkir from route backend
        axios.get('http://localhost:2018/city').then((x) => {
            console.log(x.data.rajaongkir.results)
            this.setState({
                cities: x.data.rajaongkir.results
            })
        }).catch((err) => {
                console.log(err)
        })

        // get userID yang lagi login dari local storage
        var userID = localStorage.getItem("userid")
        
        // get data user from database
        axios.get(`http://localhost:2018/users/${userID}`).then((x) => {
            console.log(x.data[0])
            this.setState({
                dataUser: x.data[0],
                isLoading: false
            })
        
        // untuk dapetin zipcode berdasarkan city user
        axios.get(`http://localhost:2018/city/${x.data[0].city}`).then((x) => {
            console.log(x.data.rajaongkir.results.postal_code)
                this.setState({
                    postal_code: x.data.rajaongkir.results.postal_code
                });
            })
        }).catch((x) => {
            console.log(x)
        })
    }

    editUser = () => {
        // get userID yang lagi login dari local storage
        var userID = localStorage.getItem("userid")
        // update data user dari halaman my profile
        axios.put(`http://localhost:2018/address/${userID}`, this.state.dataUser).then((x) => {
            console.log(x.data)
            alert("Profile Address Updated!");
            window.location.href = "/myaddress"
        }).catch(() => {
            console.log("Update Failed!")
            alert("Update Failed!")
        })
    }

    render() {
        return(
            <div style={{position: "relative", top: "120px", borderTop: "1px solid #e1e7ec"}}>

                {/* Page Title */}
                <div className="page-title">
                    <div className="container">
                        <div className="column">
                        <h1>My Profile</h1>
                        </div>
                        <div className="column">
                        <ul className="breadcrumbs">
                            <li><a href="index.html">Home</a>
                            </li>
                            <li className="separator">&nbsp;</li>
                            <li><a href="account-orders.html">Account</a>
                            </li>
                            <li className="separator">&nbsp;</li>
                            <li>My Address</li>
                        </ul>
                        </div>
                    </div>
                </div>

                {/* Page Content */}
                <div className="container padding-bottom-3x mb-1">
                    <div className="row">
                        <div className="col-lg-4">
                        <aside className="user-info-wrapper">
                            <div className="user-cover" style={{backgroundImage: `url("img/account/user-cover-img.jpg")`}}>
                            <div className="info-label" data-toggle="tooltip" title="You currently have 290 Reward Points to spend"><i className="icon-medal"></i>Verified</div>
                            </div>
                            <div className="user-info">
                            <div className="user-avatar"><a className="edit-avatar" href="#"></a><img src={this.state.dataUser.profilePicture} alt="User"/></div>
                            <div className="user-data">
                                <h4>{this.state.dataUser.firstname + this.state.dataUser.lastname}</h4><span>Joined {this.state.dataUser.created_at}</span>
                            </div>
                            </div>
                        </aside>
                        <nav className="list-group">
                            <a className="list-group-item with-badge" href="/myorders" style={{cursor: "pointer"}}><i className="icon-bag"></i>Orders<span className="badge badge-primary badge-pill"></span></a>
                            <a className="list-group-item" href="/myprofile" style={{cursor: "pointer"}}><i className="icon-head"></i>Profile</a>
                            <a className="list-group-item active" href="/myaddress" style={{cursor: "pointer"}}><i className="icon-map"></i>Addresses</a>
                            <a className="list-group-item with-badge" href="/mywishlist" style={{cursor: "pointer"}}><i className="icon-heart"></i>Wishlist<span className="badge badge-primary badge-pill"></span></a>
                            {/* <a className="list-group-item with-badge" href="account-tickets.html"><i className="icon-tag"></i>My Tickets<span className="badge badge-primary badge-pill">4</span></a> */}
                        </nav>
                        </div>

                        {/* Address */}
                        <div className="col-lg-8">
                            <div className="padding-top-2x mt-2 hidden-lg-up"></div>
                            <h4>Contact Address</h4>
                            <hr className="padding-bottom-1x"/>
                            <form className="row">
                                <div className="col-md-6">
                                    <div className="form-group">
                                        <label for="account-city">Country</label>
                                        <select className="form-control" id="account-country"
                                            value={this.state.dataUser && this.state.dataUser.country}
                                            onChange={(e) => {
                                                let data = this.state.dataUser;
                                                data.country = e.target.value;
                                                this.setState({dataUser: data})
                                            }}
                                        >
                                        <option>Choose country</option>
                                        <option selected>Indonesia</option>
                                        </select>
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="form-group">
                                        <label for="account-province">Province</label>
                                        <select className="form-control" id="account-province"  value={this.state.dataUser.province}
                                            // value={this.state.dataUser && this.state.dataUser.province}
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
                                <div className="col-md-6">
                                    <div className="form-group">
                                        <label for="account-city">City</label>
                                        <select className="form-control" id="account-city" value={this.state.dataUser.city}
                                            onChange={(e) => {
                                                let data = this.state.dataUser;
                                                    data.city = e.target.value.split('-')[0]
                                                    // data.postal_code = e.target.value.split('-')[1]
                                                    this.setState({dataUser: data})
                                                    
                                                    // untuk dapetin zipcode nya berdasarkan city user
                                                    // axios.get(`http://localhost:2018/city/${e.target.value}`).then((x) => {
                                                    //     this.setState({
                                                    //         postal_code: x.data.rajaongkir.results.postal_code
                                                    //     })
                                                    // })
                                            }}
                                        >
                                            <option hidden>Choose City</option>
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
                                <div className="col-md-6">
                                <div className="form-group">
                                    <label for="account-zip">ZIP Code</label>
                                    <input className="form-control" type="text" id="account-zip" 
                                        value={this.state.dataUser.zipcode}
                                        onChange={(e) => {
                                            let data = this.state.dataUser;
                                            data.zipcode = e.target.value
                                            this.setState({
                                                dataUser: data
                                            })
                                        }}
                                    />
                                </div>
                                </div>
                                <div className="col-md-12">
                                <div className="form-group">
                                    <label for="account-address1">Address</label>
                                    <input className="form-control" type="text" id="account-address1" required
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

                                {/*  padding-top-1x after col-12 */}
                                <div className="col-12">
                                    {/* <h4>Shipping Address</h4>
                                    <hr className="padding-bottom-1x"/>
                                    <div className="custom-control custom-checkbox d-block">
                                        <input className="custom-control-input" type="checkbox" id="same_address" checked/>
                                        <label className="custom-control-label" for="same_address">Same as Contact Address</label>
                                    </div> */}
                                    <hr className="margin-top-1x margin-bottom-1x"/>
                                    <div className="text-right">
                                        <button onClick={this.editUser} className="btn btn-primary margin-bottom-none" type="button" data-toast data-toast-position="topRight" data-toast-type="success" data-toast-icon="icon-circle-check" data-toast-title="Success!" data-toast-message="Your address updated successfuly.">Update Address</button>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default MyAddress;
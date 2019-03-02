import React from 'react';
import axios from 'axios';

class MyOrders extends React.Component {

    constructor(){
        super();
        this.state = {

            transactionID: "",
            namaBank: "",
            pemilikRekening: "",
            nomorRekening: "",
            jumlahTransfer: "",
            myOrders: "",
            isLoading: false
        }
    }

    componentDidMount(){

        // get userID yang lagi login dari local storage
        var userID = localStorage.getItem("userid")
        axios.get(`http://localhost:2018/transaction/${userID}`).then((x) => {
            console.log(x.data)
            // console.log(userID)
            console.log('hahah')
            if (x.data.length > 0) {
                this.setState({
                    myOrders: x.data,
                    isLoading: false
                })
            }
            else {
                this.setState({
                    myOrders: "",
                    isLoading: false
                })
            }
        }).catch((err) => {
            console.log('error')
        })
    }

    myOrders = () => {
        return this.state.myOrders.map((val, i) => {

            return (
                <tr>
                    <td><a className="text-medium navi-link" href="" data-toggle="modal" data-target="#orderDetails">{val.transactionID}</a></td>
                    <td>{val.orderDate}</td>
                    <td><span className="text-danger">{val.status}</span></td>
                    <td><span className="text-medium">Rp. {val.subtotal}</span></td>
                </tr>
            )
        })
    }

    render(){
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
                            <li>My Orders</li>
                        </ul>
                        </div>
                    </div>
                </div>

                {/* Page Content */}
                <div className="container padding-bottom-3x mb-2">
                    <div className="row">
                        <div className="col-lg-4">
                        <aside className="user-info-wrapper">
                            <div className="user-cover" style={{backgroundImage: `url("img/account/user-cover-img.jpg")`}}>
                            <div className="info-label" data-toggle="tooltip" title="You currently have 290 Reward Points to spend"><i className="icon-medal"></i>290 points</div>
                            </div>
                            <div className="user-info">
                            <div className="user-avatar"><a className="edit-avatar" href=""></a><img src="img/team/01.jpg" alt="User"/></div>
                            <div className="user-data">
                                <h4>Khana Reza Maulana</h4><span>Joined February 06, 2017</span>
                            </div>
                            </div>
                        </aside>
                        <nav className="list-group">
                            <a className="list-group-item with-badge active" href="/myorders" style={{cursor: "pointer"}}><i className="icon-bag"></i>Orders<span className="badge badge-primary badge-pill">6</span></a>
                            <a className="list-group-item" href="/myprofile" style={{cursor: "pointer"}}><i className="icon-head"></i>Profile</a>
                            <a className="list-group-item" href="/myaddress" style={{cursor: "pointer"}}><i className="icon-map"></i>Addresses</a>
                            <a className="list-group-item with-badge" href="/mywishlist" style={{cursor: "pointer"}}><i className="icon-heart"></i>Wishlist<span className="badge badge-primary badge-pill">3</span></a>
                        </nav>
                        </div>
                        <div className="col-lg-8">
                        <div className="padding-top-2x mt-2 hidden-lg-up"></div>
                        <div className="table-responsive">
                            <table className="table table-hover margin-bottom-none">
                            <thead>
                                <tr>
                                <th>Invoice</th>
                                <th>Date Purchased</th>
                                <th>Status</th>
                                <th>Total</th>
                                </tr>
                            </thead>
                            <tbody>
                            {this.state.myOrders ? this.myOrders() : ""}
                            </tbody>
                            </table>
                        </div>
                        <hr/>
                        <div className="text-right"><a className="btn btn-link-primary margin-bottom-none" href=""><i className="icon-download"></i>&nbsp;Order Details</a></div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
export default MyOrders;
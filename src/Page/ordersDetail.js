import React from 'react';
import axios from 'axios';

class ordersDetail extends React.Component{

    constructor(){
        super();
        this.state = {
            loading: [],
            ordersDetail: [],
            dataModal: [],
            isLoading: false,
            provinceName: "",
            cityName: "",
        }
    }
    
    componentDidMount(){

        this.setState({
            loading: <img style={{width: "50%", height: "50%", margin: "25%", marginLeft: "270%"}} alt='loading' src='https://kesbangpol.kalteng.go.id/wp-content/plugins/gallery-album/assets/img/load11.gif'/>,
            ordersDetail: []
        })

        // get userID yang lagi login dari local storage
        var userID = localStorage.getItem("userid")

        axios.get(`http://localhost:2018/ordersdata/${userID}`).then((x) => {
            this.setState({
                loading: [],
                ordersDetail: x.data,
            })
        }).catch((err) => {
            console.log(err)
            console.log('error')
        })
    }

    // untuk dapet nama province dan city berdasarkan ID nya dari Raja Ongkir,
    // dan juga data display modalnya show address
    getAll = (transactionID, city) => {
        this.setState({
            isLoading: true,
            // loading: <img style={{width: "50%", height: "50%", margin: "25%", marginLeft: "270%"}} alt='loading' src='https://kesbangpol.kalteng.go.id/wp-content/plugins/gallery-album/assets/img/load11.gif'/>,
            // dataModal: [],
            // provinceName: "",
            // cityName: ""
        })
        console.log(transactionID)
        console.log('cek')
        console.log(city)
        axios.all([
            axios.get(`http://localhost:2018/ordersdetail/${transactionID}`), 
            axios.get(`http://localhost:2018/city/${city}`)
        ]).then(axios.spread((dataModal, cityName) => {
            console.log(dataModal.data[0])
            console.log('detail')
            console.log(cityName.data.rajaongkir.results)
            this.setState({
                isLoading: false,
                // loading: [],
                dataModal: dataModal.data[0],
                provinceName: cityName.data.rajaongkir.results.province,
                cityName: cityName.data.rajaongkir.results.city_name
            })
            console.log(this.state.provinceName)
            console.log(this.state.cityName)
        }))
    }

    // display orders data table
    ordersDataTable() {
        // console.log(this.state.ordersDetail)
        // console.log('ordersData')
        return this.state.ordersDetail.map((value, i) => {
            return(
            <tr>
                <td>{value.invoice}</td>
                <td>{value.userID}</td>
                <td>{value.firstname}{value.lastname}</td>
                {/* <td>{value.lastname}</td> */}
                {/* <td>{value.phoneNumber}</td>
                <td>{this.state.provinceName}</td>
                <td>{value.city}</td>
                <td>{value.address}</td>
                <td>{value.zipcode}</td> */}
                <td>{value.productname}</td>
                <td>{value.quantity}</td>
                <td>{(value.price).toLocaleString()}</td>
                <td>{<img src={value.picture} style={{ width: 50, height: "auto" }} />}</td>
                <td>{value.color}</td>
                <td>{value.size}</td>
                <td>{(value.subtotal).toLocaleString()}</td>
                <td>{value.status}</td>
                <td style={{width: "100px"}}>{value.orderDate}</td>
                <td><button onClick={() => {this.getAll(value.transactionID, value.city)}} type="button" className="btn btn-primary" data-toggle="modal" data-target="#modalDefault">Show More</button></td>
            </tr>
            )
        })
    }

    // modal view address
    displayModal() {
        return (
            <div className="modal fade" id="modalDefault" tabindex="-1" role="dialog">
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                    <div className="modal-header">
                        <h4 className="modal-title" style={{marginLeft: "140px"}}>Invoice #{this.state.dataModal.invoice}</h4>
                        <button className="close" type="button" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                    </div>
                    <div className="modal-body">
                        <div className="card">
                            <div className="row p-2"> 
                                <div className="col-lg-12">
                                    <div>{this.state.dataModal.firstname}{this.state.dataModal.lastname}</div> 
                                    <div className="text-muted">{this.state.dataModal.phoneNumber}</div>
                                    {this.state.dataModal.address}, {this.state.cityName}, {this.state.provinceName}, {this.state.dataModal.zipcode}
                                </div>
                            </div>
                        </div>
                        <br/>
                        <h6>Your Receipt/Proof of Transfer:</h6>
                        <div className="card">
                            <div className="row p-2"> 
                                <div className="col-lg-6">
                                    <img src={this.state.dataModal.receipt}  />
                                </div>
                                <div className="col-lg-6">
                                    <h6>Bank Name:</h6>
                                    <p>{this.state.dataModal.bankname}</p>
                                    <h6>Name of Bank Account:</h6>
                                    <p>{this.state.dataModal.nameofbankaccount}</p>
                                    <h6>Number of Account:</h6>
                                    <p>{this.state.dataModal.numberofaccount}</p>
                                    <h6>Amount of Transfer:</h6>
                                    <p>IDR {parseInt(this.state.dataModal.amountoftransfer).toLocaleString()}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="modal-footer">
                        <button class="btn btn-outline-secondary btn-sm" type="button" data-dismiss="modal">Close</button>
                        {/* <button onClick={() => {window.location.href ='/cart'}} class="btn btn-primary btn-sm" type="button">View cart</button> */}
                    </div>
                    </div>
                </div>
            </div>
        )
    }

    render(){
        return(
            <div style={{position: "relative", top: "120px", borderTop: "1px solid #e1e7ec"}}>
                <div className="page-title mb-4">
                    <div className="container">
                        <div className="column">
                        <h1>Orders Detail</h1>
                        </div>
                        <div className="column">
                        <ul className="breadcrumbs">
                            <li><a onClick={this.getProvinceName} >Account</a>
                            </li>
                            <li className="separator">&nbsp;</li>
                            <li><a href="/myorders">My Orders</a></li>
                            <li className="separator">&nbsp;</li>
                            <li><a href="/ordersdetail">Orders Detail</a></li>
                        </ul>
                        </div>
                    </div>
                </div>

                <div className="col-lg-11 mx-auto">
                    <table className="table table-striped">
                        <thead className="thead-dark">
                                <tr>
                                    <th scope="col">Invoice</th>
                                    <th scope="col">UserID</th>
                                    <th scope="col">Name</th>
                                    {/* <th scope="col">Last Name</th> */}
                                    {/* <th scope="col">Phone Number</th>
                                    <th scope="col">Province</th>
                                    <th scope="col">City</th>
                                    <th scope="col">Address</th>
                                    <th scope="col">Zipcode</th> */}
                                    <th scope="col">Product Name</th>
                                    <th scope="col">Quantity</th>
                                    <th scope="col">Price</th>
                                    <th scope="col">Picture</th>
                                    <th scope="col">Color</th>
                                    <th scope="col">Size</th>
                                    <th scope="col">Subtotal+Ongkir</th>
                                    <th scope="col">Status</th>
                                    <th scope="col">Order Date</th>
                                    <th scope="col" className="text-center">Action</th>
                                </tr>
                        </thead>
                        <tbody>
                            {this.state.loading}
                            {this.ordersDataTable()}
                            {this.displayModal()}
                        </tbody>
                    </table>
                </div>
            </div>
        )
    }
}
export default ordersDetail;
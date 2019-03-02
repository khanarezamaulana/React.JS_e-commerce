import React from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

class Dashboard extends React.Component {

    constructor() {
        super();
        this.state = {
            userData: {
                firstname: "",
                lastname: "",
                email: "",
                phoneNumber: "",
                state: "",
                city: "",
                address: "",
                profilePicture: ""
            },
            productData: {
                productName: "",
                price: "",
                productDesc: "",
                size: "",
                color: "",
                stock: "",
                category: "",
                picture: ""
            },
            
            dataUser: [],
            productData: [],
            isLoading: false,
            styleUser: 'block',
            styleProduct: 'none'
        }
    }

    // GET data users
    componentDidMount(){
        this.setState({isLoading: true})
        axios.get('http://localhost:2018/users').then((x) => {
            this.setState({
                dataUser: x.data,
                isLoading: false
            })
            // console.log(this.state.dataUser)
        }).catch((x) => {
            console.log(x)
        })

        // GET data Products
        // this.setState({isLoading: true})
        axios.get('http://localhost:2018/products').then((x) => {
            console.log(x.data)
            this.setState({
                productData: x.data,
                isLoading: false
            }) 
            console.log(this.state.productData)
        }).catch((x) => {
            console.log(x)
        })
    }

    // fungsi untuk refresh halaman setelah remove
    refreshData = () => {
        axios.get('http://localhost:2018/users').then((x) => {
            this.setState({
                dataUser: x.data
            })
        });

        axios.get('http://localhost:2018/products').then((x) => {
            this.setState({
                productData: x.data,
                isLoading: false
            })
        })
    }

    // DELETE data user
    removeUser = (userID) => {
        axios.delete(`http://localhost:2018/users/${userID}`).then(() => {
            alert("User Deleted!");
            this.refreshData()
            // window.location.reload();
        })
    }

    // DELETE data product
    removeProduct = (productID) => {
        axios.delete(`http://localhost:2018/products/${productID}`).then(() => {
            alert("Product Deleted!");
            this.refreshData()
            // window.location.reload();
        })
    }

    // Dashboard Users Table
    usersTable() {
        // console.log(this.state.dataUser)
        if(!this.state.isLoading && this.state.dataUser){
            return this.state.dataUser.map((value, i) => {
                return(
                <tr>
                    <td>{value.userID}</td>
                    <td>{value.firstname}</td>
                    <td>{value.lastname}</td>
                    <td>{value.email}</td>
                    <td>{value.phoneNumber}</td>
                    <td>{value.state}</td>
                    <td>{value.city}</td>
                    <td>{<img src={value.profilePicture} style={{ width: 150, height: "auto" }} />}</td>
                    <td><Link to={`/edituser/${value.userID}`}><button type="button" className="btn btn-primary">Edit</button></Link></td>
                    <td><button type="button" onClick={() => {
                        this.removeUser(value.userID)
                    }} className="btn btn-danger">Remove</button></td>
                </tr>
                )
            })
        }
            else{
                return <React.Fragment></React.Fragment>
            }
    }

    // Dashboard Product Table
    productsTable() {
        // console.log(this.state.dataUser)
        if(!this.state.isLoading && this.state.productData){
            // alert("dapt")
            // console.log("wadaw")
            console.log(this.state.productData)
            return this.state.productData.map((value, i) => {
                return(
                <tr>
                    <td>{value.productID}</td>
                    <td>{value.productname}</td>
                    <td>{value.price}</td>
                    <td style={{maxWidth: "200px"}}>{value.productdesc}</td>
                    <td>{value.size}</td>
                    <td>{value.color}</td>
                    <td>{value.stock}</td>
                    <td>{value.category}</td>
                    <td>{<img src={value.picture} style={{ width: 150, height: "auto" }} />}</td>
                    <td><Link to={`/editproduct/${value.productID}`}><button type="button" className="btn btn-primary">Edit</button></Link></td>
                    <td><button type="button" onClick={() => {
                        this.removeProduct(value.productID)
                    }} className="btn btn-danger">Remove</button></td>
                </tr>
                )
            })
        }
            else{
                return <React.Fragment></React.Fragment>
            }
    }

    render(){
        return(
            <div style={{position: "relative", top: "120px", borderTop: "1px solid #e1e7ec"}}>
                <div className="page-title mb-4">
                    <div className="container">
                        <div className="column">
                        <h1>Dashboard</h1>
                        </div>
                        <div className="column">
                        <ul className="breadcrumbs">
                            <li><a href="">Admin</a>
                            </li>
                            <li className="separator">&nbsp;</li>
                            <li>Dashboard</li>
                        </ul>
                        </div>
                    </div>
                </div>

                {/* Content */}
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-lg-2">
                            <div>
                                <div style={{marginBottom: 0, display: "block", overflow: "hidden"}}>
                                    <div className="col-md-12 col-1 pl-0 pr-0 width" style={{marginBottom: "150px"}} id="sidebar">
                                            <div className="list-group border-0 card text-center text-md-left">
                                            <a className="list-group-item d-inline-block " data-parent="#sidebar"><i class="fa fa-heart"></i> <span class="d-none d-md-inline">Welcome Admin !</span></a>
                                            
                                            {/* Button Users */}
                                            <a onClick={() => {this.setState({
                                                styleProduct: 'none',
                                                styleUser: 'block'
                                            })}} type="button" className="list-group-item d-inline-block " data-parent="#sidebar" style={{cursor: "pointer"}}><i class="fas fa-users"></i>  <span class="d-none d-md-inline">Users</span></a>
                                            
                                            {/* Button Products */}
                                            <a onClick={() => {this.setState({
                                                styleProduct: 'block',
                                                styleUser: 'none'
                                            })}} type="button" className="list-group-item d-inline-block " data-parent="#sidebar" style={{cursor: "pointer"}}><i class="fab fa-product-hunt"></i> <span class="d-none d-md-inline">Products</span></a>

                                            {/* Button Add User */}
                                            <a href="/adduser" type="button" className="list-group-item d-inline-block " data-parent="#sidebar" style={{cursor: "pointer"}}><i class="fas fa-plus-circle"></i> <span class="d-none d-md-inline">Add User</span></a>

                                            {/* Button Add Product */}
                                            <a href="/addproduct" type="button" className="list-group-item d-inline-block " data-parent="#sidebar" style={{cursor: "pointer"}}><i class="fas fa-plus-circle"></i> <span class="d-none d-md-inline">Add Product</span></a>
                                        
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="col-lg-10 mx-0">
                            {/* display users */}
                            {this.state.styleUser == 'block' && 
                                <table className="table table-striped" style={{display: this.state.styleUser}}>
                                    <thead className="thead-dark">
                                            <tr>
                                                <th scope="col">UserID</th>
                                                <th scope="col">First Name</th>
                                                <th scope="col">Last Name</th>
                                                <th scope="col">Email</th>
                                                <th scope="col">Phone Number</th>
                                                <th scope="col">State</th>
                                                <th scope="col">City</th>
                                                <th scope="col">Profile Picture</th>
                                                <th scope="col" colSpan="2" className="text-center">Edit / Remove</th>
                                            </tr>
                                    </thead>
                                    <tbody>
                                        {this.usersTable()}
                                    </tbody>
                                </table>
                            }

                            {/* display products */}
                            {this.state.styleProduct == 'block' && 
                                <table className="table table-striped" style={{display: this.state.styleProduct}}>
                                    <thead className="thead-dark">
                                        <tr>
                                            <th scope="col">ProductID</th>
                                            <th scope="col">Product Name</th>
                                            <th scope="col">Price</th>
                                            <th scope="col">Description</th>
                                            <th scope="col">Size</th>
                                            <th scope="col">Color</th>
                                            <th scope="col">Stock</th>
                                            <th scope="col">Category</th>
                                            <th scope="col">Picture</th>
                                            <th scope="col" colSpan="2" className="text-center">Edit / Remove</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {this.productsTable()}
                                    </tbody>
                                </table>
                            }
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Dashboard;
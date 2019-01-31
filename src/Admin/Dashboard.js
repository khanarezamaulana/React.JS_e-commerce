import React from 'react';
import axios from 'axios';

class Dashboard extends React.Component {

    constructor() {
        super();
        this.state = {
            userData: {
                firstname: "",
                lastname: "",
                email: "",
                phoneNumber: "",
                country: "",
                city: "",
                address: "",
                profilePicture: ""
            },
            dataUser: [],   
            isLoading: false
        }
    }

    ambilData = () => {
        var url = 'http://localhost:2018/users';
        axios.get(url).then((x) => {
            console.log(x.data)
            this.setState({
                dataUser: x.data
            })
            console.log(this.state.dataUser)
        }).catch((x) => {
            console.log(x)
        })
    }

    componentDidMount(){
        this.setState({isLoading: true})
        // this.ambilData();
        var url = 'http://localhost:2018/users';
        axios.get(url).then((x) => {
            console.log(x.data[0].userID)
            var temp = x.data
            this.setState({
                dataUser: temp,
                isLoading: false
            })
            // console.log(this.state.dataUser)
        }).catch((x) => {
            console.log(x)
        })
    }

    usersTable() {
        // console.log(this.state.dataUser)
        if(!this.state.isLoading){
        return this.state.dataUser.map((value, i) => {
            return(
            <tr>
                <td>{value.userID}</td>
                <td>{value.firstname}</td>
                <td>{value.lastname}</td>
                <td>{value.email}</td>
                <td>{value.phoneNumber}</td>
                <td>{value.country}</td>
                <td>{value.city}</td>
                {/* <td>{<img src={value.profilePicture} style={{ width: 50, height: 50 }} />}</td> */}
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
                <div className="row col-lg-2 col-lg-10">
                    <div className="container-fluid">
                        <div className="" style={{marginBottom: 0, display: "block", overflow: "hidden"}}>
                            <div className="col-md-2 col-1 pl-0 pr-0 width" style={{marginBottom: "150px"}} id="sidebar">
                                    <div className="list-group border-0 card text-center text-md-left">
                                    <a className="list-group-item d-inline-block " data-parent="#sidebar"><i class="fa fa-heart"></i> <span class="d-none d-md-inline">Welcome Admin !</span></a>
                                    <a onClick={this.ambilData} class="list-group-item d-inline-block " data-parent="#sidebar" style={{cursor: "pointer"}}><i class="fa fa-list"></i>  <span class="d-none d-md-inline">Users</span></a>
                                    <a className="list-group-item d-inline-block " data-parent="#sidebar" style={{cursor: "pointer"}}><i class="fa fa-clock-o"></i> <span class="d-none d-md-inline">Products</span></a>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    <table>
                        <thead>
                                <tr>
                                    <th>UserID</th>
                                    <th>First Name</th>
                                    <th>Last Name</th>
                                    <th>Email</th>
                                    <th>Phone Number</th>
                                    <th>Address</th>
                                    <th>Profile Picture</th>
                                    <th colSpan="2" className="text-center">Action</th>
                                </tr>
                            
                            
                                {/* <tr>
                                    <th>ProductID</th>
                                    <th>Product Name</th>
                                    <th>Price</th>
                                    <th>Category</th>
                                    <th>Stock</th>
                                    <th>Quantity</th>
                                    <th>Description</th>
                                    <th>Size</th>
                                    <th>Color</th>
                                    <th>Picture</th>
                                    <th colSpan="2" className="text-center">Action</th>
                                </tr> */}
                        </thead>
                        <tbody>
                            {this.usersTable()}
                        </tbody>
                    </table>
                </div>
            </div>
        )
    }
}

export default Dashboard;
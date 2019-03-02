import React from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

class editUser extends React.Component {

    constructor() {
        super();
        this.state = {
            dataUser: {
                firstname: "",
                lastname: "",
                email: "",
                phoneNumber: "",
                profilePicture: "",
                files: ""
            },
            preview: ""
        }
    }

    componentDidMount(){
        axios.get(`http://localhost:2018/users/${this.props.match.params.id}`).then((x) => {
            // console.log(x.data[0].firstname)
            this.setState({
                dataUser: x.data[0]
            })
        }).catch(() => {
            console.log("Failed!")
        })
    }

    editUser = () => {
        axios.put(`http://localhost:2018/users/${this.props.match.params.id}`, this.state.dataUser).then((x) => {
            console.log(x.data)
            // alert("User Updated!");
            // window.location.href = "/dashboard"

            // update profil picture user
            var formData = new FormData();

            formData.append("file", this.state.dataUser.files);
            formData.append("userID", x.data);
            console.log(this.state.dataUser.files)

            var setting = {
                headers: {'Content-Type': 'multipart/form-data'}
            };

            axios.post('http://localhost:2018/usersupload', formData, setting).then((y) => {
                console.log(y);
                alert("Upload Success!")
            }).catch(() => { 
                // alert("Upload Failed!")
            })
            alert("User Updated!");
            window.location.href = "/dashboard"
        }).catch(() => {
            console.log("Update Failed!")
        })
    }

    render(){
        return(
            <div>
                <div style={{position: "relative", top: "120px", borderTop: "1px solid #e1e7ec"}}>
                    <div className="page-title mb-4">
                        <div className="container">
                            <div className="column">
                            <h1>Dashboard</h1>
                            </div>
                            <div className="column">
                            <ul className="breadcrumbs">
                                <li><a href="">Admin</a></li>
                                <li className="separator">&nbsp;</li>
                                <li>Dashboard</li>
                                <li className="separator">&nbsp;</li>
                                <li>AddUser</li>
                            </ul>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Content */}
                <form encType="multipart/form-data" className="col-lg-8 mx-auto" style={{marginTop: "150px"}}>
                    <div className="form-row">
                        <div className="form-group col-md-6">
                            <label for="inputEmail4">First Name</label>
                            <input type="text" id="firstname" className="form-control" 
                            onChange={(e) => {
                                let data = this.state.dataUser;
                                data.firstname = e.target.value;
                                this.setState({dataUser: data})
                            }}
                            value={this.state.dataUser.firstname}
                            placeholder="First name"/>
                        </div>

                        <div className="form-group col-md-6">
                            <label for="inputEmail4">Last Name</label>
                            <input type="text" id="lastname" className="form-control"
                            onChange={(e) => {
                                let data = this.state.dataUser;
                                data.lastname = e.target.value;
                                this.setState({dataUser: data})
                            }}
                            value={this.state.dataUser.lastname}
                            placeholder="Last name"/>
                        </div>
                    </div>
                    
                    <div className="form-row">
                        <div className="form-group col-md-12">
                        <label for="inputEmail4">Email</label>
                        <input type="email" id="email" className="form-control" id="inputEmail4" 
                        onChange={(e) => {
                            let data = this.state.dataUser;
                            data.email = e.target.value;
                            this.setState({dataUser: data})
                        }}
                        value={this.state.dataUser.email}
                        placeholder="Email"/>
                        </div>

                        {/* <div className="form-group col-md-6">
                        <label for="inputPassword4">Password</label>
                        <input type="password" id="password" className="form-control" id="inputPassword4" 
                        onChange={(e) => {
                            let data = this.state.dataUser;
                            data.password = e.target.value;
                        }}
                        value={this.state.dataUser.password}
                        placeholder="Password"/>
                        </div>                         */}
                    </div>

                    <div className="form-group">
                        <label for="inputAddress">Address</label>
                        <input type="text" id="address" className="form-control" id="inputAddress" 
                        onChange={(e) => {
                            let data = this.state.dataUser;
                            data.address = e.target.value;
                            this.setState({dataUser: data})
                        }}
                        value={this.state.dataUser.address}
                        disabled/>
                    </div>

                    <div className="form-group">
                        <label for="phoneNumber">Phone Number</label>
                        <input type="text" id="phoneNumber" className="form-control" id="phoneNumber" 
                        onChange={(e) => {
                            let data = this.state.dataUser;
                            data.phoneNumber = e.target.value;
                            this.setState({dataUser: data})
                        }}
                        value={this.state.dataUser.phoneNumber}
                        />
                    </div>

                    <div className="form-row">
                        <div className="form-group col-md-6">
                        <label for="inputCity">City</label>
                        <input type="text" id="city" className="form-control" id="inputCity"
                        onChange={(e) => {
                            let data = this.state.dataUser;
                            data.city = e.target.value;
                            this.setState({dataUser: data})
                        }}
                        value={this.state.dataUser.city}
                        disabled/>
                        </div>

                        <div className="form-group col-md-4">
                        <label for="inputState">Country</label>
                        <select id="state" className="form-control"
                        onChange={(e) => {
                            let data = this.state.dataUser;
                            data.country = e.target.value;
                            this.setState({dataUser: data})
                        }}
                        value={this.state.dataUser.country}
                        disabled>
                            <option selected>Choose...</option>
                            <option>Indonesia</option>
                        </select>
                        </div>

                        <div className="form-group col-md-2">
                        <label for="inputZip">Zip Code</label>
                        <input type="text" id="zipcode" className="form-control" id="inputZip"
                        onChange={(e) => {
                            let data = this.state.dataUser;
                            data.zipcode = e.target.value;
                            this.setState({dataUser: data})
                        }}
                        value={this.state.dataUser.zipcode}
                        disabled/>
                        </div>
                    </div>

                    <div className="row">
                        <div className="col-md-6">
                            <div className="form-group">
                            <label for="inputZip">Profile Picture</label>
                                <td>
                                    {<img src={this.state.dataUser.profilePicture} style={{ width: 150, height: "auto" }} />} 
                                </td>
                            </div>
                        </div>
                        
                        <div className="col-md-6">
                            <div className="form-group custom-file">
                            <label for="customFile">Change Profile Picture</label><br/>
                            
                            {this.state.preview ? <img alt="ok" src={this.state.preview && this.state.preview} style={{width: 150, height: "auto"}} />
                            : <React.Fragment></React.Fragment> }
                            
                            <input type='file' accept="image/*" name='filename' 
                            onChange={(e) => {
                                let data = this.state.dataUser;
                                data.files = e.target.files[0];
                                this.setState({
                                    dataUser: data,
                                    preview: URL.createObjectURL(e.target.files[0])
                                })
                            }}
                            />
                            </div>
                        </div>
                    </div>

                    {/* <div className="form-group">
                        <div className="form-check">
                        <input className="form-check-input" type="checkbox" id="gridCheck"/>
                        <label className="form-check-label" for="gridCheck">
                            Check me out
                        </label>
                        </div>
                    </div> */}
                    
                        <button onClick={this.editUser} type="submit" className="btn btn-primary">Save</button>
                        <Link to="/dashboard"><button type="button" className="btn btn-secondary">Back</button></Link>
                </form>
            </div>
        )
    }
}

export default editUser;
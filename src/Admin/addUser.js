import React from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

class addUser extends React.Component {

    constructor() {
        super();
        this.state = {
            dataUser: {
                firstname: "",
                lastname: "",
                email: "",
                phoneNumber: "",
                password: "",
                country: "",
                city: "",
                zipcode: "",
                address: "",
                files: ""
            },
            preview: ""
        }
    }

    addUser = (e) => {
        e.preventDefault();
        console.log(this.state.dataUser.files);

        // axios post data user dan axios upload profile picture user 
        axios.post('http://localhost:2018/users', this.state.dataUser).then((x) => {
            console.log(x.data.userID)
            
            var formData = new FormData();

            formData.append("file", this.state.dataUser.files);
            formData.append("userID", x.data.userID);
            console.log(this.state.dataUser.files)

            var setting = {
                headers: {'Content-Type': 'multipart/form-data'}
            };

            axios.post('http://localhost:2018/usersupload', formData, setting).then((y) => {
                console.log(y);
                alert("Upload Success!")
            }).catch(() => {
                alert("Uplaod Failed!")
            })
            alert("User Successfully Added !");
            window.location.href = "/dashboard"
            // this.props.history.push("/dashboard");

      }).catch((x) => {
          alert("Failed User Added !")
          console.log(x)
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
                                let dataUserCopy = this.state.dataUser;
                                dataUserCopy.firstname = e.target.value;
                                this.setState({
                                    dataUser: dataUserCopy
                                })
                              }}
                            placeholder="First name"/>
                        </div>

                        <div className="form-group col-md-6">
                            <label for="inputEmail4">Last Name</label>
                            <input type="text" id="lastname" className="form-control"
                            onChange={(e) => {
                                let dataUserCopy = this.state.dataUser;
                                dataUserCopy.lastname = e.target.value;
                                this.setState({
                                    dataUser: dataUserCopy
                                })
                              }}
                            placeholder="Last name"/>
                        </div>
                    </div>
                    
                    <div className="form-row">
                        <div className="form-group col-md-6">
                        <label for="inputEmail4">Email</label>
                        <input type="email" id="email" className="form-control" id="inputEmail4" 
                        onChange={(e) => {
                            let dataUserCopy = this.state.dataUser;
                            dataUserCopy.email = e.target.value;
                            this.setState({
                                dataUser: dataUserCopy
                            })
                          }}
                        placeholder="Email"/>
                        </div>

                        <div className="form-group col-md-6">
                        <label for="inputPassword4">Password</label>
                        <input type="password" id="password" className="form-control" id="inputPassword4" 
                        onChange={(e) => {
                            let dataUserCopy = this.state.dataUser;
                            dataUserCopy.password = e.target.value;
                            this.setState({
                                dataUser: dataUserCopy
                            })
                          }}
                        placeholder="Password"/>
                        </div>                        
                    </div>

                    <div className="form-group">
                        <label for="inputAddress">Address</label>
                        <input type="text" id="address" className="form-control" id="inputAddress" 
                        onChange={(e) => {
                            let dataUserCopy = this.state.dataUser;
                            dataUserCopy.address = e.target.value;
                            this.setState({
                                dataUser: dataUserCopy
                            })
                          }}
                        />
                    </div>

                    <div className="form-group">
                        <label for="phoneNumber">Phone Number</label>
                        <input type="text" id="phoneNumber" className="form-control" id="phoneNumber" 
                        onChange={(e) => {
                            let dataUserCopy = this.state.dataUser;
                            dataUserCopy.phoneNumber = e.target.value;
                            this.setState({
                                dataUser: dataUserCopy
                            })
                          }}
                        />
                    </div>

                    <div className="form-row">
                        <div className="form-group col-md-6">
                        <label for="inputCity">City</label>
                        <input type="text" id="city" className="form-control" id="inputCity"
                        onChange={(e) => {
                            let dataUserCopy = this.state.dataUser;
                            dataUserCopy.city = e.target.value;
                            this.setState({
                                dataUser: dataUserCopy
                            })
                          }}
                        />
                        </div>

                        <div className="form-group col-md-4">
                        <label for="inputState">Country</label>
                        <select id="state" className="form-control"
                        onChange={(e) => {
                            let dataUserCopy = this.state.dataUser;
                            dataUserCopy.country = e.target.value;
                            this.setState({
                                dataUser: dataUserCopy
                            })
                          }}
                        >
                            <option selected>Choose...</option>
                            <option>Indonesia</option>
                        </select>
                        </div>

                        <div className="form-group col-md-2">
                        <label for="inputZip">Zip Code</label>
                        <input type="text" id="zipcode" className="form-control" id="inputZip"
                        onChange={(e) => {
                            let dataUserCopy = this.state.dataUser;
                            dataUserCopy.zipcode = e.target.value;
                            this.setState({
                                dataUser: dataUserCopy
                            })
                          }}
                        />
                        </div>
                    </div>
                    
                    <div className="form-group custom-file">
                    <label for="customFile">Profile Picture</label><br/>
                    <input type='file' accept="image/*" name='filename' 
                    onChange={(e) => {
                        let dataUserCopy = this.state.dataUser;
                        dataUserCopy.files = e.target.files[0];
                        this.setState({
                            dataUser: dataUserCopy,
                            preview: URL.createObjectURL(e.target.files[0])
                        })
                    }} />
                    </div>

                    <div className="form-group">
                        <div className="form-check">
                        <input className="form-check-input" type="checkbox" id="gridCheck"/>
                        <label className="form-check-label" for="gridCheck">
                            Check me out
                        </label>
                        </div>
                    </div>

                    <button onClick={this.addUser} type="submit" className="btn btn-primary">Add User</button>
                    <Link to="/dashboard"><button type="button" className="btn btn-secondary">Back</button></Link>
                </form>
            </div>
        )
    }
}

export default addUser;
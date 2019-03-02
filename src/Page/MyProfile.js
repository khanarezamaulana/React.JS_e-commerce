import React from 'react';
import axios from 'axios';

class MyProfile extends React.Component {

    constructor(){
        super();
        this.state = {
            dataUser: {
                firstname: "",
                lastname: "",
                email: "",
                phoneNumber: "",
                password: "",
                newPassword: "",
                profilePicture: "",
                files: "",
                created_at: ""
            },
            confirmPassword: "",
            isLoading: false,
            alert: ""
        }
    }

    componentDidMount(){
        this.setState({isLoading: true})
        // get userID yang lagi login dari local storage
        var userID = localStorage.getItem("userid")
        
        // get data user from database
        axios.get(`http://localhost:2018/users/${userID}`).then((x) => {
            // console.log(x.data[0])
            this.setState({
                dataUser: x.data[0],
                isLoading: false
            })
        }).catch((x) => {
            console.log(x)
        })
    }

    editUser = () => {
        // get userID yang lagi login dari local storage
        var userID = localStorage.getItem("userid")

        // update data user dari halaman my profile
        axios.put(`http://localhost:2018/users/${userID}`, this.state.dataUser).then((x) => {
            console.log(x.data)

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
                // alert("Upload Success!")
            }).catch(() => { 
                // alert("Upload Failed!")
            })
            // alert("Profile Updated!");
            window.location.href = "/myprofile"
        }).catch(() => {
            console.log("Update Failed!")
        })

        // request ganti password user
        axios.put(`http://localhost:2018/changepassword/${userID}`, this.state.dataUser).then((x) => {
            console.log(x.data)
            if(x.data.status == "Your old password is wrong!") {
               alert("Your old password is wrong!")
            }
            else {
                alert("Password Changed!")
            }
        }).catch(() => {
            console.log('gagal')
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
                            <li>My Profile</li>
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
                                <div className="info-label" data-toggle="tooltip" title="Your account is verified!"><i className="icon-medal"></i>Verified</div>
                                </div>
                                <div className="user-info">
                                <div className="user-avatar">
                                    <input style={{width: "30px", height: "30px"}} className="edit-avatar" type="file" accept="image/*" name='filename' 
                                        onChange={(e) => {
                                            let data = this.state.dataUser;
                                            data.files = e.target.files[0];
                                            this.setState({
                                                dataUser: data,
                                                preview: URL.createObjectURL(e.target.files[0])
                                            })
                                        }}
                                    />
                                    <img src={this.state.dataUser.profilePicture} alt="User"/>
                                </div>
                                <div className="user-data">
                                    <h4>{this.state.dataUser.firstname + this.state.dataUser.lastname}</h4><span>Joined {this.state.dataUser.created_at}</span>
                                </div>
                                </div>
                            </aside>

                            {/* Menu Profile */}
                            <nav className="list-group">
                                <a className="list-group-item with-badge" href="/myorders" style={{cursor: "pointer"}}><i className="icon-bag"></i>Orders<span className="badge badge-primary badge-pill">6</span></a>
                                <a className="list-group-item active" href="/myprofile" style={{cursor: "pointer"}}><i className="icon-head"></i>Profile</a>
                                <a className="list-group-item" href="/myaddress" style={{cursor: "pointer"}}><i className="icon-map"></i>Addresses</a>
                                <a className="list-group-item with-badge" href="mywishlist" style={{cursor: "pointer"}}><i className="icon-heart"></i>Wishlist<span className="badge badge-primary badge-pill">3</span></a>
                                {/* <a className="list-group-item with-badge" href="account-tickets.html"><i className="icon-tag"></i>My Tickets<span className="badge badge-primary badge-pill">4</span></a> */}
                            </nav>
                        </div>
                        
                        {/* Data Profile */}
                        <div className="col-lg-8">
                            <div className="padding-top-2x mt-2 hidden-lg-up"></div>
                            <form className="row">

                                {/* First Name */}
                                <div className="col-md-6">
                                    <div className="form-group">
                                        <label for="account-fn">First Name</label>
                                        <input className="form-control" type="text" id="account-fn" required 
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

                                {/* Last Name */}
                                <div className="col-md-6">
                                    <div className="form-group">
                                        <label for="account-ln">Last Name</label>
                                        <input className="form-control" type="text" id="account-ln" required
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

                                {/* Email Address */}
                                <div className="col-md-6">
                                    <div className="form-group">
                                        <label for="account-email">E-mail Address</label>
                                        <input className="form-control" type="email" id="account-email"
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

                                {/* Phone Number */}
                                <div className="col-md-6">
                                    <div className="form-group">
                                        <label for="account-phone">Phone Number</label>
                                        <input className="form-control" type="text" id="account-phone" required
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
                                <div className="col-12">
                                <label>Change Password</label>
                                <hr className="mt-0 mb-3"/>
                                </div>
                                <div className="col-md-6">
                                <div className="form-group">
                                    <label for="account-pass">Current Password</label>
                                    <input className="form-control" type="password" id="account-pass" required 
                                        onChange={(e) => {
                                            let data = this.state.dataUser;
                                            data.password = e.target.value;
                                            this.setState({dataUser: data})
                                        }}
                                        placeholder="Password"
                                    />
                                </div>
                                </div>
                                
                                {/* Cuma buat pemisah */}
                                <div className="col-md-6"></div>

                                {/* New Password */}
                                <div className="col-md-6">
                                    <div className="form-group">
                                        <label for="account-pass">New Password</label>
                                        <input className="form-control" type="password" id="account-pass" required 
                                            onChange={(e) => {
                                                let data = this.state.dataUser;
                                                data.newPassword = e.target.value;
                                                this.setState({dataUser: data})
                                            }}
                                            placeholder="New Password"
                                        />
                                    </div>
                                </div>

                                {/* Confirm Password */}
                                <div className="col-md-6">
                                    <div className="form-group">
                                        <label for="account-confirm-pass">Confirm Password</label>
                                        <input className="form-control" type="password" id="account-confirm-pass" onKeyDown={this.handleEnter} required 
                                            value={this.state.confirmPassword}
                                            onChange={(e) => {
                                                this.setState({
                                                    confirmPassword: e.target.value
                                                })
                                            }}
                                            placeholder="Confirm password"
                                            onKeyDown={this.handleEnter}
                                        />
                                    </div>
                                </div>
                                {/* <div className="col-md-6">
                                    <div className="form-group">
                                        <label>Change Profile Picture</label>
                                        <input type="file" accept="image/*" name="filename" />
                                    </div>
                                </div> */}
                                <div className="col-12">
                                <hr className="mt-2 mb-3"/>
                                <div className="d-flex flex-wrap justify-content-between align-items-center">
                                    <div className="custom-control custom-checkbox d-block">
                                    <input className="custom-control-input" type="checkbox" id="subscribe_me" checked/>
                                    <label className="custom-control-label" for="subscribe_me">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Subscribe me to Newsletter</label>
                                    </div>
                                    <button onClick={this.editUser} className="btn btn-primary margin-right-none" type="button" data-toast data-toast-position="topRight" data-toast-type="success" data-toast-icon="icon-circle-check" data-toast-title="Success!" data-toast-message="Your profile updated successfuly.">Update Profile</button>
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
 
export default MyProfile;
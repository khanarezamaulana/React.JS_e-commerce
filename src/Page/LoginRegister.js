import React from 'react';
import axios from 'axios';

class LoginRegister extends React.Component {

    constructor() {
        super();
        this.state = {
            email: "",
            password: "",
            dataUser: {
                firstname: "",
                lastname: "",
                email: "",
                username: "",
                phoneNumber: "",
                password: ""
            },
            confirmPassword: "",
            files: "",
            preview: ""
        }
    }

    signup = (e) => {
        e.preventDefault();
        
        // untuk konfirmasi password, jika password tidak sama maka signup gagal
        if(this.state.dataUser.password != this.state.confirmPassword){
            alert("Password dont match!")
        }
        else{
            axios.post('http://localhost:2018/signup', this.state.dataUser).then((x) => {
                console.log(x.data)
                if (x.data.status == "Failed") {
                    alert("Register failed!")
                }
                else if (x.data.status == "alreadyExist") {
                    alert("Akun sudah terdaftar!")
                }
                else {
                    alert("SignUp Successfully, you have to login!")
                    window.location.href = "/login"
                }

            }).catch(() => {
                alert('Failed SignUp!')
            })
        }
    }

    login = (e) => {
        e.preventDefault();

        axios.post('http://localhost:2018/login', {
            email: this.state.email,
            username: this.state.username,
            password: this.state.password
        }).then((x) => {
            console.log(x)
            if (x.data.status == "AkunBelumTerdaftar") {
                alert("Akun belum terdaftar!")
            }
            else if (x.data.status == "PasswordSalah") {
                alert("Password Salah!")
            }
            else {
                alert("Login Sukses!")
            // locStore
            localStorage.setItem("username", this.state.username);
            localStorage.setItem("userid", x.data.userID);
            // this.props.history.push("/shop")
            window.location.href = "/shop"
            }
        })
    }

    render() {
        return(

            <div style={{position: "relative", top: "120px", borderTop: "1px solid #e1e7ec"}}>
                {/* Page Title */}
                <div className="page-title">
                    <div className="container">
                        <div className="column">
                        <h1>Login / Register</h1>
                        </div>
                        <div className="column">
                        <ul className="breadcrumbs">
                            <li><a href="index.html">Home</a>
                            </li>
                            <li className="separator">&nbsp;</li>
                            <li><a href="account-orders.html">Account</a>
                            </li>
                            <li className="separator">&nbsp;</li>
                            <li>Login / Register</li>
                        </ul>
                        </div>
                    </div>
                </div>

                    {/* Page Content/Login */}
                    <div className="container padding-bottom-3x mb-2">
                    <div className="row" style={{paddingBottom: "80px"}}>
                        <div className="col-md-6">
                        <form className="login-box" method="post">
                            <div className="row margin-bottom-1x">
                            <div className="col-xl-4 col-md-6 col-sm-4"><a className="btn btn-sm btn-block facebook-btn" href=""><i className="socicon-facebook"></i>&nbsp;Facebook login</a></div>
                            <div className="col-xl-4 col-md-6 col-sm-4"><a className="btn btn-sm btn-block twitter-btn" href=""><i className="socicon-twitter"></i>&nbsp;Twitter login</a></div>
                            <div className="col-xl-4 col-md-6 col-sm-4"><a className="btn btn-sm btn-block google-btn" href=""><i className="socicon-googleplus"></i>&nbsp;Google+ login</a></div>
                            </div>
                            <h4 className="margin-bottom-1x">Or using form below</h4>
                            
                            <div className="form-group">
                            <input className="form-control" type="email" value={this.state.email} onChange={(e) => {this.setState({ email: e.target.value, username: e.target.value })}}
                            placeholder="Email / Username" required/><span className="input-group-addon"></span>
                            </div>

                            <div className="form-group">
                            <input className="form-control" type="password" value={this.state.password} onKeyDown={this.handleEnter} onChange={(e) => {this.setState({ password: e.target.value })}}
                            placeholder="Password" required/><span className="input-group-addon"></span>
                            </div>

                            <div className="d-flex flex-wrap justify-content-between padding-bottom-1x">
                            <div className="custom-control custom-checkbox">
                                <input className="custom-control-input" type="checkbox" id="remember_me"/>
                                <label className="custom-control-label" for="remember_me"> RRRemember me</label>
                            </div><a className="navi-link" href="account-password-recovery.html">Forgot password?</a>
                            </div>
                            <div className="text-center text-sm-right">
                            <button onClick={this.login} className="btn btn-primary margin-bottom-none" type="submit">Login</button>
                            </div>
                        </form>
                        </div>

                        {/* Register */}
                        <div className="col-md-6">
                        <div className="padding-top-3x hidden-md-up"></div>
                        <h3 className="margin-bottom-1x">No Account? Register</h3>
                        <p>Registration takes less than a minute but gives you full control over your orders.</p>
                        <form className="row" method="post">
                            {/* First name */}
                            <div className="col-sm-6">
                                <div className="form-group">
                                    <label for="reg-fn">First Name</label>
                                    <input className="form-control" type="text" id="reg-fn" 
                                        value={this.state.dataUser.firstname}
                                        onChange={(e) => {
                                            let data = this.state.dataUser;
                                            data.firstname = e.target.value;
                                            this.setState({
                                                dataUser: data
                                            })
                                        }}
                                    placeholder="First name" required/>
                                </div>
                            </div>
                            
                            {/* Last name */}
                            <div className="col-sm-6">
                                <div className="form-group">
                                    <label for="reg-ln">Last Name</label>
                                    <input className="form-control" type="text" id="reg-ln" 
                                        value={this.state.dataUser.lastname}
                                        onChange={(e) => {
                                            let data = this.state.dataUser;
                                            data.lastname = e.target.value;
                                            this.setState({
                                                dataUser: data
                                            })
                                        }}
                                    placeholder="Last name" required/>
                                </div>
                            </div>

                            {/* Email */}
                            <div className="col-sm-12">
                                <div className="form-group">
                                    <label for="reg-email">E-mail Address</label>
                                    <input className="form-control" type="email" id="reg-email" 
                                        value={this.state.dataUser.email}
                                        onChange={(e) => {
                                            let data = this.state.dataUser;
                                            data.email = e.target.value;
                                            this.setState({
                                                dataUser: data
                                            })
                                        }}
                                    placeholder="Email" required/>
                                </div>
                            </div>

                            {/* Username */}
                            <div className="col-sm-6">
                                <div className="form-group">
                                    <label for="reg-username">Username</label>
                                    <input className="form-control" type="username" id="reg-email" 
                                        value={this.state.dataUser.username}
                                        onChange={(e) => {
                                            let data = this.state.dataUser;
                                            data.username = e.target.value;
                                            this.setState({
                                                dataUser: data
                                            })
                                        }}
                                    placeholder="Username" required/>
                                </div>
                            </div>

                            {/* Phone number */}
                            <div className="col-sm-6">
                                <div className="form-group">
                                    <label for="reg-phone">Phone Number</label>
                                    <input className="form-control" type="text" id="reg-phone" 
                                        value={this.state.dataUser.phoneNumber}
                                        onChange={(e) => {
                                            let data = this.state.dataUser;
                                            data.phoneNumber = e.target.value;
                                            this.setState({
                                                dataUser: data
                                            })
                                        }}
                                    placeholder="Phone number" required/>
                                </div>
                            </div>

                            {/* Password */}
                            <div className="col-sm-6">
                                <div className="form-group">
                                    <label for="reg-pass">Password</label>
                                    <input className="form-control" type="password" id="reg-pass" 
                                        value={this.state.dataUser.password}
                                        onChange={(e) => {
                                            let data = this.state.dataUser;
                                            data.password = e.target.value;
                                            this.setState({
                                                dataUser: data
                                            })
                                        }}
                                    placeholder="password" required/>
                                </div>
                            </div>

                            {/* Confirm Password */}
                            <div className="col-sm-6">
                                <div className="form-group">
                                    <label for="reg-pass-confirm">Confirm Password</label>
                                    <input className="form-control" type="password" id="reg-pass-confirm" 
                                        value={this.state.confirmPassword}
                                        onChange={(e) => {
                                            this.setState({
                                                confirmPassword: e.target.value
                                            })
                                        }}
                                    placeholder="Confirm password" onKeyDown={this.handleEnter} required/>
                                </div>
                            </div>

                            {/* Button Register */}
                            <div className="col-12 text-center text-sm-right">
                            <button onClick={this.signup} className="btn btn-primary margin-bottom-none" type="submit">Register</button>
                            </div>
                        </form>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
export default LoginRegister;
import React from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

class addProduct extends React.Component {

    constructor() {
        super();
        this.state = {
            dataProduct: {
                productname: "",
                price: "",
                productdesc: "",
                size: "",
                color: "",
                stock: "",
                category: "",
                files: ""
            },
            preview: "",
        }
    }
    
    addProduct = (e) => {
        e.preventDefault();
        console.log(this.state.dataProduct.files)
        // console.log(this.state.files)
        
        // axios post data product dan axios upload picture Product
        axios.post('http://localhost:2018/products', this.state.dataProduct).then((x) => {
            console.log(x.data.productID);
            var formData = new FormData();

            formData.append("file", this.state.dataProduct.files);
            formData.append("productID", x.data.productID);
            console.log(this.state.dataProduct.files)

            var setting = {
                headers: {'Content-Type': 'multipart/form-data'}
            };

            axios.post('http://localhost:2018/productsupload', formData, setting).then((y) => {
                console.log(y);
                alert("Uplaod Success!")
            }).catch(() => {
                alert("Upload Failed!")
            })
            alert("Product Successfully Added !");
            
            window.location.href = "/dashboard"
            this.refreshData()
            // this.props.history.push("/dashboard");

        }).catch((x) => {
          alert("Failed Product Added !")
          console.log(x)
        })

    }

    refreshData = () => {
        axios.get('http://localhost:2018/products').then((x) => {
            this.setState({
                productData: x.data,
                isLoading: false
            })
        })
    }

    render() {
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
                                <li>addProduct</li>
                            </ul>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Content */}
                <form encType="multipart/form-data" className="col-lg-8 mx-auto" style={{marginTop: "150px"}}>
                    <div className="form-row">
                        <div className="form-group col-md-6">
                            <label for="inputEmail4">Product Name</label>
                            <input type="text" id="productname" className="form-control" 
                            onChange={(e) => {
                                let dataProductCopy = this.state.dataProduct;
                                dataProductCopy.productname = e.target.value;
                                this.setState({
                                    dataProduct: dataProductCopy
                                })
                              }}
                            placeholder="Product name"/>
                        </div>

                        <div className="form-group col-md-6">
                            <label for="price">Price</label>
                            <input type="text" id="price" className="form-control"
                            onChange={(e) => {
                                let dataProductCopy = this.state.dataProduct;
                                dataProductCopy.price = e.target.value;
                                this.setState({
                                    dataProduct: dataProductCopy
                                })
                              }}
                            placeholder="Price"/>
                        </div>
                    </div>
                    
                    <div className="form-row">
                        <div className="form-group col-md-6">
                            <label for="inputSize">Size</label>
                            <select id="size" className="form-control"
                            onChange={(e) => {
                                let dataProductCopy = this.state.dataProduct;
                                dataProductCopy.size = e.target.value;
                                this.setState({
                                    dataProduct: dataProductCopy
                                })
                              }}
                            >
                                <option selected>Choose...</option>
                                <option>38</option>
                                <option>39</option>
                                <option>40</option>
                                <option>41</option>
                                <option>42</option>
                                <option>43</option>
                                <option>44</option>
                                <option>S</option>
                                <option>M</option>
                                <option>L</option>
                                <option>XL</option>
                            </select>
                        </div>

                        <div className="form-group col-md-6">
                        <label for="color">Color</label>
                        <input type="text" id="color" className="form-control" id="inputPassword4" 
                        onChange={(e) => {
                            let dataProductCopy = this.state.dataProduct;
                            dataProductCopy.color = e.target.value;
                            this.setState({
                                dataProduct: dataProductCopy
                            })
                          }}
                        placeholder="Color"/>
                        </div>                        
                    </div>

                    <div className="form-row">
                        <div className="form-group col-md-6">
                            <label for="category">Category</label>
                            <select id="category" className="form-control"
                            onChange={(e) => {
                                let dataProductCopy = this.state.dataProduct;
                                dataProductCopy.category = e.target.value;
                                this.setState({
                                    dataProduct: dataProductCopy
                                })
                            }}
                            >
                                <option selected>Choose...</option>
                                <option>Shoes</option>
                                <option>Bag</option>
                                <option>Watch</option>
                                <option>Shirt</option>
                            </select>
                        </div>

                        <div className="form-group col-md-6">
                        <label for="stock">Stock</label>
                        <input type="text" id="stock" className="form-control" id="inputPassword4" 
                        onChange={(e) => {
                            let dataProductCopy = this.state.dataProduct;
                            dataProductCopy.stock = e.target.value;
                            this.setState({
                                dataProduct: dataProductCopy
                            })
                        }}
                        placeholder="Stock"/>
                        </div>                        
                    </div>

                    <div class="form-group">
                        <label for="exampleFormControlTextarea1">Description</label>
                        <textarea class="form-control" id="exampleFormControlTextarea1" rows="3"
                        onChange={(e) => {
                            let dataProductCopy = this.state.dataProduct;
                            dataProductCopy.productdesc = e.target.value;
                            this.setState({
                                dataProduct: dataProductCopy
                            })
                        }}
                        ></textarea>
                    </div>

                    
                    <div className="form-group custom-file">
                    <label for="customFile">Product Image</label><br/>
                    
                    {this.state.preview ? <img alt="ok" src={this.state.preview && this.state.preview} style={{width: 150, height: "auto"}} />
                    : <React.Fragment></React.Fragment> }
                    
                    <input type='file' accept="image/*" name='filename' 
                    onChange={(e) => {
                        let dataProductCopy = this.state.dataProduct;
                        dataProductCopy.files = e.target.files[0];
                        this.setState({
                            dataProduct: dataProductCopy,
                            preview: URL.createObjectURL(e.target.files[0])
                            // files: e.target.files[0]
                        })
                    }} 
                    />
                    </div>

                    {/* <div className="form-group">
                        <div className="form-check">
                        <input className="form-check-input" type="checkbox" id="gridCheck"/>
                        <label className="form-check-label" for="gridCheck">
                            Check me out
                        </label>
                        </div>
                    </div> */}
                    <div style={{marginTop: "80px"}}>
                        <button onClick={this.addProduct} type="submit" className="btn btn-primary">Add Product</button>
                        <Link to="/dashboard"><button type="button" className="btn btn-secondary">Back</button></Link>
                    </div>
                </form>
            </div>
        )
    }
}
export default addProduct;
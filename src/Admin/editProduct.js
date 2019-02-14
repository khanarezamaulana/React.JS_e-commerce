import React from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

class editProduct extends React.Component {

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
                picture: "",
                files: ""
            },
            preview: "",
        }
    }
    
    componentDidMount(){
        axios.get(`http://localhost:2018/products/${this.props.match.params.id}`).then((x) => {
            // console.log(x.data[0].productname)
            this.setState({
                dataProduct: x.data[0]
            })
        }).catch(() => {
            console.log("Failed")
        })
    }

    editProduct = () => {
        axios.put(`http://localhost:2018/products/${this.props.match.params.id}`, this.state.dataProduct).then((x) => {
            console.log(x.data)

            // update product picture
            var formData = new FormData();

            formData.append("file", this.state.dataProduct.files);
            formData.append("productID", x.data);
            console.log(this.state.dataProduct.files)

            var setting = {
                headers: {'Content-Type': 'multipart/form-data'}
            };

            axios.post('http://localhost:2018/productsupload', formData, setting).then((y) => {
                console.log(y);
                alert("Upload Success!")
            }).catch(() => { 
                // alert("Upload Failed!")
            })
            alert("Product Updated!")
            window.location.href = "/dashboard";
        }).catch(() => {
            console.log("Update Failed!")
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
                                let data = this.state.dataProduct;
                                data.productname = e.target.value;
                                this.setState({dataProduct: data})
                            }}
                            value={this.state.dataProduct.productname}
                            placeholder="Product name"/>
                        </div>

                        <div className="form-group col-md-6">
                            <label for="price">Price</label>
                            <input type="text" id="price" className="form-control"
                            onChange={(e) => {
                                let data = this.state.dataProduct;
                                data.price = e.target.value;
                                this.setState({dataProduct: data})
                            }}
                            value={this.state.dataProduct.price}
                            placeholder="Price"/>
                        </div>
                    </div>
                    
                    <div className="form-row">
                        <div className="form-group col-md-6">
                            <label for="inputSize">Size</label>
                            <select id="size" className="form-control"
                            onChange={(e) => {
                                let data = this.state.dataProduct;
                                data.size = e.target.value;
                                this.setState({dataProduct: data})
                            }}
                            value={this.state.dataProduct.size}
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
                            let data = this.state.dataProduct;
                            data.color = e.target.value;
                            this.setState({dataProduct: data})
                        }}
                        value={this.state.dataProduct.color}
                        placeholder="Color"/>
                        </div>                        
                    </div>

                    <div className="form-row">
                        <div className="form-group col-md-6">
                            <label for="category">Category</label>
                            <select id="category" className="form-control"
                            onChange={(e) => {
                                let data = this.state.dataProduct;
                                data.category = e.target.value;
                                this.setState({dataProduct: data})
                            }}
                            value={this.state.dataProduct.category}
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
                            let data = this.state.dataProduct;
                            data.stock = e.target.value;
                            this.setState({dataProduct: data})
                        }}
                        value={this.state.dataProduct.stock}
                        placeholder="Stock"/>
                        </div>                        
                    </div>

                    <div class="form-group">
                        <label for="exampleFormControlTextarea1">Description</label>
                        <textarea class="form-control" id="exampleFormControlTextarea1" rows="3"
                        onChange={(e) => {
                            let data = this.state.dataProduct;
                            data.productdesc = e.target.value;
                            this.setState({dataProduct: data})
                        }}
                        value={this.state.dataProduct.productdesc}
                        ></textarea>
                    </div>
                    

                    <div className="row">
                        <div className="col-md-6">
                            <div className="form-group">
                            <label for="inputZip">Product Image</label>
                                <td>
                                    {<img src={this.state.dataProduct.picture} style={{ width: 150, height: "auto" }} />} 
                                </td>
                            </div>
                        </div>
                        
                        <div className="col-md-6">
                            <div className="form-group custom-file">
                            <label for="customFile">Update Product Image</label><br/>
                            
                            {this.state.preview ? <img alt="ok" src={this.state.preview && this.state.preview} style={{width: 150, height: "auto"}} />
                            : <React.Fragment></React.Fragment> }
                            
                            <input type='file' accept="image/*" name='filename' 
                            onChange={(e) => {
                                let data = this.state.dataProduct;
                                data.files = e.target.files[0];
                                this.setState({
                                    dataProduct: data,
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
                    
                    <button onClick={this.editProduct} type="submit" className="btn btn-primary">Save</button>
                    <Link to="/dashboard"><button type="button" className="btn btn-secondary">Back</button></Link>
                </form>
            </div>
        )
    }
}
export default editProduct;
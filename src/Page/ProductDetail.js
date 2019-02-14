import React from 'react';
import axios from 'axios';

class ProductDetail extends React.Component {

    constructor(){
        super();
        this.state = {
            productData: {
                productname: "",
                price: "",
                productdesc: "",
                size: "",
                color: "",
                category: "",
                picture: ""
            },
            productData: [],
            isloading: false
        }
    }

    // SHOW DATA PRODUCT
    componentDidMount(){
        this.setState({isLoading: true})
        let productID = this.props.match.params.id;
        console.log(productID)
        axios.get(`http://localhost:2018/products/${productID}`).then((x) => {
            console.log(x.data[0])
            // console.log("tes doang")
            this.setState({
                productData: x.data[0],
                isLoading: false
            }) 
            console.log(this.state.productData)
        }).catch((x) => {
            console.log(x)
        })
    }

    render(){
        return(
                
            <div style={{position: "relative", top: "120px", borderTop: "1px solid #e1e7ec"}}>
                {/* Page Title */}
                <div className="page-title">
                    <div className="container">
                        <div className="column">
                            <h1>Product Detail</h1>
                        </div>
                        <div className="column">
                            <ul className="breadcrumbs">
                                <li><a href="index.html">Home</a>
                                </li>
                                <li className="separator">&nbsp;</li>
                                <li>Shop</li>
                                <li className="separator">&nbsp;</li>
                                <li>Product Detail</li>
                            </ul>
                        </div>
                    </div>
                </div>

                {/* Page Content */}
                <div className="container padding-bottom-3x mb-1">
                    <div className="row">

                    {/* Poduct Gallery */}
                    <div className="col-md-6">
                        <div className="product-gallery"><span className="product-badge text-danger">30% Off</span>
                        {/* <div className="gallery-wrapper">
                            <div className="gallery-item active"><a href="img/shop/single/01.jpg" data-hash="one" data-size="1000x667"></a></div>
                            <div className="gallery-item"><a href="img/shop/single/02.jpg" data-hash="two" data-size="1000x667"></a></div>
                            <div className="gallery-item"><a href="img/shop/single/03.jpg" data-hash="three" data-size="1000x667"></a></div>
                            <div className="gallery-item"><a href="img/shop/single/04.jpg" data-hash="four" data-size="1000x667"></a></div>
                            <div className="gallery-item"><a href="img/shop/single/05.jpg" data-hash="five" data-size="1000x667"></a></div>
                        </div> */}
                        <div className="product-carousel owl-carousel">
                            <div data-hash="one"><img src={this.state.productData.picture} alt="Product"/></div>
                            {/* <div data-hash="two"><img src="img/shop/single/02.jpg" alt="Product"/></div>
                            <div data-hash="three"><img src="img/shop/single/03.jpg" alt="Product"/></div>
                            <div data-hash="four"><img src="img/shop/single/04.jpg" alt="Product"/></div>
                            <div data-hash="five"><img src="img/shop/single/05.jpg" alt="Product"/></div> */}
                        </div>
                        <ul className="product-thumbnails">
                            <li className="active"><a href="#one"><img src="img/shop/single/th01.jpg" alt="Product"/></a></li>
                            <li><a href="#two"><img src="img/shop/single/th02.jpg" alt="Product"/></a></li>
                            <li><a href="#three"><img src="img/shop/single/th03.jpg" alt="Product"/></a></li>
                            <li><a href="#four"><img src="img/shop/single/th04.jpg" alt="Product"/></a></li>
                            <li><a href="#five"><img src="img/shop/single/th05.jpg" alt="Product"/></a></li>
                        </ul>
                        </div>
                    </div>
                    
                    {/* Product Info */}
                    <div className="col-md-6">
                        <div className="padding-top-2x mt-2 hidden-md-up"></div>
                        <div className="rating-stars"><i className="icon-star filled"></i><i className="icon-star filled"></i><i className="icon-star filled"></i><i className="icon-star filled"></i><i className="icon-star"></i>
                        </div><span className="text-muted align-middle">&nbsp;&nbsp;4.2 | 3 customer reviews</span>
                        <h2 className="padding-top-1x text-normal">{this.state.productData.productname}</h2><span className="h2 d-block">
                        <del className="text-muted text-normal"></del>Rp. {this.state.productData.price}</span>
                        <p>{this.state.productData.productdesc}</p>
                        <div className="row margin-top-1x">
                        <div className="col-sm-4">
                            <div className="form-group">
                            <label for="size">Men's size</label>
                            <select className="form-control" id="size" onChange={(e) => {
                                    let data = this.state.productData;
                                    data.size = e.target.value;
                                    this.setState({productData: data})
                            }}
                            value={this.state.productData.size}
                            >
                                <option>Chooze size</option>
                                <option value={38}>38</option>
                                <option value={39}>39</option>
                                <option value={40}>40</option>
                                <option value={41}>41</option>
                                <option value={42}>42</option>
                                <option value={43}>43</option>
                                <option value={44}>44</option>
                                <option value={45}>45</option>
                            </select>
                            </div>
                        </div>
                        <div className="col-sm-5">
                            <div className="form-group">
                            <label for="color">Choose color</label>
                            <select className="form-control" id="color" onChange={(e) => {
                                    let data = this.state.productData;
                                    data.color = e.target.value;
                                    this.setState({productData: data})
                            }}
                            value={this.state.productData.color}>
                                <option value={"Dark Choco"}>Dark Choco</option>
                                <option value={"Black"}>Black</option>
                                <option value={"Black-White"}>Black-White</option>
                                <option value={"Navy"}>Navy</option>
                            </select>
                            </div>
                        </div>
                        <div className="col-sm-3">
                            <div className="form-group">
                            <label for="quantity">Quantity</label>
                            <select className="form-control" id="quantity">
                                <option>1</option>
                                <option>2</option>
                                <option>3</option>
                                <option>4</option>
                                <option>5</option>
                            </select>
                            </div>
                        </div>
                        </div>
                        <div className="padding-bottom-1x mb-2"><span className="text-medium">Categories:&nbsp;</span><a className="navi-link" href="">{this.state.productData.category}</a></div>
                        <hr className="mb-3"/>
                        <div className="d-flex flex-wrap justify-content-between">
                        <div className="entry-share mt-2 mb-2"><span className="text-muted">Share:</span>
                            <div className="share-links"><a className="social-button shape-circle sb-facebook" href="" data-toggle="tooltip" data-placement="top" title="Facebook"><i className="socicon-facebook"></i></a><a className="social-button shape-circle sb-twitter" href="" data-toggle="tooltip" data-placement="top" title="Twitter"><i className="socicon-twitter"></i></a><a className="social-button shape-circle sb-instagram" href="" data-toggle="tooltip" data-placement="top" title="Instagram"><i className="socicon-instagram"></i></a><a className="social-button shape-circle sb-google-plus" href="" data-toggle="tooltip" data-placement="top" title="Google +"><i className="socicon-googleplus"></i></a></div>
                        </div>
                        <div className="sp-buttons mt-2 mb-2" style={{paddingBottom: "80px"}}>
                        <button className="btn btn-outline-secondary btn-sm btn-wishlist" data-toggle="tooltip" title="Whishlist"><i className="icon-heart"></i></button>
                        <button className="btn btn-primary" data-toast data-toast-type="success" data-toast-position="topRight" data-toast-icon="icon-circle-check" data-toast-title="Product" data-toast-message="successfuly added to cart!"><i className="icon-bag"></i> Add to Cart</button>
                        </div>
                        </div>
                    </div>
                </div>
            </div>
            </div>
        )
    }
}
export default ProductDetail;
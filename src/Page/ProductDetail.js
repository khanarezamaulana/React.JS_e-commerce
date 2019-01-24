import React from 'react';

class ProductDetail extends React.Component {
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
                        <div className="gallery-wrapper">
                            <div className="gallery-item active"><a href="img/shop/single/01.jpg" data-hash="one" data-size="1000x667"></a></div>
                            <div className="gallery-item"><a href="img/shop/single/02.jpg" data-hash="two" data-size="1000x667"></a></div>
                            <div className="gallery-item"><a href="img/shop/single/03.jpg" data-hash="three" data-size="1000x667"></a></div>
                            <div className="gallery-item"><a href="img/shop/single/04.jpg" data-hash="four" data-size="1000x667"></a></div>
                            <div className="gallery-item"><a href="img/shop/single/05.jpg" data-hash="five" data-size="1000x667"></a></div>
                        </div>
                        <div className="product-carousel owl-carousel">
                            <div data-hash="one"><img src="img/shop/single/01.jpg" alt="Product"/></div>
                            <div data-hash="two"><img src="img/shop/single/02.jpg" alt="Product"/></div>
                            <div data-hash="three"><img src="img/shop/single/03.jpg" alt="Product"/></div>
                            <div data-hash="four"><img src="img/shop/single/04.jpg" alt="Product"/></div>
                            <div data-hash="five"><img src="img/shop/single/05.jpg" alt="Product"/></div>
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
                        <h2 className="padding-top-1x text-normal">Reebok Royal CL Jogger 2</h2><span className="h2 d-block">
                        <del className="text-muted text-normal">IDR 680.000</del>&nbsp; IDR 470.000</span>
                        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dicta voluptatibus quos ea dolore rem, molestias laudantium et explicabo assumenda fugiat deserunt in, facilis laborum excepturi aliquid nobis ipsam deleniti aut? Aliquid sit hic id velit qui fuga nemo suscipit obcaecati. Officia nisi quaerat minus nulla saepe aperiam sint possimus magni veniam provident.</p>
                        <div className="row margin-top-1x">
                        <div className="col-sm-4">
                            <div className="form-group">
                            <label for="size">Men's size</label>
                            <select className="form-control" id="size">
                                <option>Chooze size</option>
                                <option>11.5</option>
                                <option>11</option>
                                <option>10.5</option>
                                <option>10</option>
                                <option>9.5</option>
                                <option>9</option>
                                <option>8.5</option>
                            </select>
                            </div>
                        </div>
                        <div className="col-sm-5">
                            <div className="form-group">
                            <label for="color">Choose color</label>
                            <select className="form-control" id="color">
                                <option>White/Red/Blue</option>
                                <option>Black/Orange/Green</option>
                                <option>Gray/Purple/White</option>
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
                        <div className="padding-bottom-1x mb-2"><span className="text-medium">Categories:&nbsp;</span><a className="navi-link" href="">Men’s shoes,</a><a className="navi-link" href=""> Snickers,</a><a className="navi-link" href=""> Sport shoes</a></div>
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
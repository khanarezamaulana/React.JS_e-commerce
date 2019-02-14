import React from 'react';
import axios from 'axios';

class Shop extends React.Component {

    constructor() {
        super();
        this.state = {
            productData: {
                productname: "",
                price: "",
                picture: ""
            },
            productData: [],
            isLoading: false
        }
    }

    // SHOW PRODUCT
    componentDidMount(){
        this.setState({isLoading: true})
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

    displayProduct(){
        return this.state.productData.map((val, index) => {
            return (
                <div className="grid-item">
                <div className="product-card">
                    {/* <div className="product-badge text-danger">50% Off</div> */}
                    <a className="product-thumb" href={`/shop/${val.productID}`} ><img src={val.picture} alt="Product"/></a>
                    <h3 className="product-title"><a href="">{val.productname}</a></h3>
                    <h4 className="product-price">
                    {/* <del>IDR 1,227,000</del> */}
                    Rp. {val.price}
                    </h4>
                    <div className="product-buttons">
                    <button className="btn btn-outline-secondary btn-sm btn-wishlist" data-toggle="tooltip" title="Whishlist"><i className="icon-heart"></i></button>
                    <button className="btn btn-outline-primary btn-sm" data-toast data-toast-type="success" data-toast-position="topRight" data-toast-icon="icon-circle-check" data-toast-title="Product" data-toast-message="successfuly added to cart!">Add to Cart</button>
                    </div>
                </div>
                </div>
            )
        })
    }

    render() {
        return(

            <div style={{position: "relative", top: "120px", borderTop: "1px solid #e1e7ec"}}>

                {/* Page Title */}
                <div className="page-title">
                    <div className="container">
                        <div className="column">
                            <h1>Shop</h1>
                        </div>
                        <div className="column">
                            <ul className="breadcrumbs">
                                <li><a href="index.html">Home</a>
                                </li>
                                <li className="separator">&nbsp;</li>
                                <li>Shop</li>
                            </ul>
                        </div>
                    </div>
                </div>

                    {/* Page Content */}
                    <div className="container padding-bottom-3x mb-1">
                    <div className="row">
                        {/* Products*/}
                        <div className="col-xl-9 col-lg-8 order-lg-2">
                        {/* Shop Toolbar */}
                        <div className="shop-toolbar padding-bottom-1x mb-2">
                            <div className="column">
                            <div className="shop-sorting">
                                <label for="sorting">Sort by:</label>
                                <select className="form-control" id="sorting">
                                <option>Popularity</option>
                                <option>Low - High Price</option>
                                <option>High - Low Price</option>
                                <option>Avarage Rating</option>
                                <option>A - Z Order</option>
                                <option>Z - A Order</option>
                                </select><span className="text-muted">Showing:&nbsp;</span><span>1 - 12 items</span>
                            </div>
                            </div>
                            <div className="column">
                            <div className="shop-view"><a className="grid-view active" href="shop-grid-ls.html"><span></span><span></span><span></span></a><a className="list-view" href="shop-list-ls.html"><span></span><span></span><span></span></a></div>
                            </div>
                        </div>

                        {/* Products Grid */}
                        <div className="isotope-grid cols-3 mb-2">
                            <div className="gutter-sizer"></div>
                            <div className="grid-sizer"></div>

                            {/* Product */}
                            {this.displayProduct()}

                        </div>
                        
                        {/* Pagination */}
                        <nav className="pagination" style={{paddingBottom: "80px"}}>
                            <div className="column">
                            <ul className="pages">
                                <li className="active"><a href="#">1</a></li>
                                <li><a href="#">2</a></li>
                                <li><a href="#">3</a></li>
                                <li><a href="#">4</a></li>
                                <li>...</li>
                                <li><a href="#">12</a></li>
                            </ul>
                            </div>
                            <div className="column text-right hidden-xs-down"><a className="btn btn-outline-secondary btn-sm" href="#">Next&nbsp;<i className="icon-arrow-right"></i></a></div>
                        </nav>
                        </div>

                        {/* Sidebar */}
                        <div className="col-xl-3 col-lg-4 order-lg-1">
                        <button className="sidebar-toggle position-left" data-toggle="modal" data-target="#modalShopFilters"><i className="icon-layout"></i></button>
                        <aside className="sidebar sidebar-offcanvas">

                            {/* Widget Categories */}
                            <section className="widget widget-categories">
                            <h3 className="widget-title">Shop Categories</h3>
                            <ul>
                                <li className="has-children expanded"><a href="#">Shoes</a><span>(1138)</span>
                                <ul>
                                    <li><a href="#">Women's</a><span>(508)</span>
                                    <ul>
                                        <li><a href="#">Sneakers</a></li>
                                        <li><a href="#">Heels</a></li>
                                        <li><a href="#">Loafers</a></li>
                                        <li><a href="#">Sandals</a></li>
                                    </ul>
                                    </li>
                                    <li><a href="#">Men's</a><span>(423)</span>
                                    <ul>
                                        <li><a href="#">Boots</a></li>
                                        <li><a href="#">Oxfords</a></li>
                                        <li><a href="#">Loafers</a></li>
                                        <li><a href="#">Sandals</a></li>
                                    </ul>
                                    </li>
                                    <li><a href="#">Boy's Shoes</a><span>(97)</span></li>
                                    <li><a href="#">Girl's Shoes</a><span>(110)</span></li>
                                </ul>
                                </li>
                                <li className="has-children"><a href="#">Clothing</a><span>(2356)</span>
                                <ul>
                                    <li><a href="#">Women's</a><span>(1032)</span>
                                    <ul>
                                        <li><a href="#">Dresses</a></li>
                                        <li><a href="#">Shirts &amp; Tops</a></li>
                                        <li><a href="#">Swimwear</a></li>
                                        <li><a href="#">Shorts</a></li>
                                    </ul>
                                    </li>
                                    <li><a href="#">Men's</a><span>(937)</span>
                                    <ul>
                                        <li><a href="#">Shirts &amp; Tops</a></li>
                                        <li><a href="#">Shorts</a></li>
                                        <li><a href="#">Swimwear</a></li>
                                        <li><a href="#">Pants</a></li>
                                    </ul>
                                    </li>
                                    <li><a href="#">Kid's Clothing</a><span>(386)</span></li>
                                </ul>
                                </li>
                                <li className="has-children"><a href="#">Bags</a><span>(420)</span>
                                <ul>
                                    <li><a href="#">Handbags</a><span>(180)</span></li>
                                    <li><a href="#">Backpacks</a><span>(132)</span></li>
                                    <li><a href="#">Wallets &amp; Accessories</a><span>(47)</span></li>
                                    <li><a href="#">Luggage</a><span>(61)</span></li>
                                </ul>
                                </li>
                                <li className="has-children"><a href="#">Accessories</a><span>(874)</span>
                                <ul>
                                    <li><a href="#">Sunglasses</a><span>(211)</span></li>
                                    <li><a href="#">Hats</a><span>(195)</span></li>
                                    <li><a href="#">Watches</a><span>(159)</span></li>
                                    <li><a href="#">Jewelry</a><span>(203)</span></li>
                                    <li><a href="#">Belts</a><span>(106)</span></li>
                                </ul>
                                </li>
                            </ul>
                            </section>

                            {/* Widget Price Range */}
                            <section className="widget widget-categories">
                            <h3 className="widget-title">Price Range</h3>
                            <form className="price-range-slider" method="post" data-start-min="250000" data-start-max="650000" data-min="0" data-max="5000000" data-step="1">
                                <div className="ui-range-slider"></div>
                                <footer className="ui-range-slider-footer">
                                <div className="column">
                                    <button className="btn btn-outline-primary btn-sm" type="submit">Filter</button>
                                </div>
                                <div className="column">
                                    <div className="ui-range-values">
                                    <div className="ui-range-value-min">IDR<span></span>
                                        <input type="hidden"/>
                                    </div>&nbsp;-&nbsp;
                                    <div className="ui-range-value-max">IDR<span></span>
                                        <input type="hidden"/>
                                    </div>
                                    </div>
                                </div>
                                </footer>
                            </form>
                            </section>

                            {/* Widget Brand Filter */}
                            <section className="widget">
                            <h3 className="widget-title">Filter by Brand</h3>
                            <div className="custom-control custom-checkbox">
                                <input className="custom-control-input" type="checkbox" id="adidas"/>
                                <label className="custom-control-label" for="adidas">Adidas&nbsp;<span className="text-muted">(254)</span></label>
                            </div>
                            <div className="custom-control custom-checkbox">
                                <input className="custom-control-input" type="checkbox" id="bilabong"/>
                                <label className="custom-control-label" for="bilabong">Bilabong&nbsp;<span className="text-muted">(39)</span></label>
                            </div>
                            <div className="custom-control custom-checkbox">
                                <input className="custom-control-input" type="checkbox" id="klein"/>
                                <label className="custom-control-label" for="klein">Calvin Klein&nbsp;<span className="text-muted">(128)</span></label>
                            </div>
                            <div className="custom-control custom-checkbox">
                                <input className="custom-control-input" type="checkbox" id="nike"/>
                                <label className="custom-control-label" for="nike">Nike&nbsp;<span className="text-muted">(310)</span></label>
                            </div>
                            <div className="custom-control custom-checkbox">
                                <input className="custom-control-input" type="checkbox" id="bahama"/>
                                <label className="custom-control-label" for="bahama">Tommy Bahama&nbsp;<span className="text-muted">(42)</span></label>
                            </div>
                            </section>

                            {/* Widget Size Filter */}
                            <section className="widget">
                            <h3 className="widget-title">Filter by Size</h3>
                            <div className="custom-control custom-checkbox">
                                <input className="custom-control-input" type="checkbox" id="xl"/>
                                <label className="custom-control-label" for="xl">XL&nbsp;<span className="text-muted">(208)</span></label>
                            </div>
                            <div className="custom-control custom-checkbox">
                                <input className="custom-control-input" type="checkbox" id="l"/>
                                <label className="custom-control-label" for="l">L&nbsp;<span className="text-muted">(311)</span></label>
                            </div>
                            <div className="custom-control custom-checkbox">
                                <input className="custom-control-input" type="checkbox" id="m"/>
                                <label className="custom-control-label" for="m">M&nbsp;<span className="text-muted">(485)</span></label>
                            </div>
                            <div className="custom-control custom-checkbox">
                                <input className="custom-control-input" type="checkbox" id="s"/>
                                <label className="custom-control-label" for="s">S&nbsp;<span className="text-muted">(213)</span></label>
                            </div>
                            </section>

                            {/* Promo Banner */}
                            <section className="promo-box" style={{backgroundImage: "url(img/banners/02.jpg)"}}>
                            {/* Choose between .overlay-dark (#000) or .overlay-light (#fff) with default opacity of 50%. You can overrride default color and opacity values via 'style' attribute.*/}<span className="overlay-dark" style={{opacity: ".45"}}></span>
                            <div className="promo-box-content text-center padding-top-3x padding-bottom-2x">
                                <h4 className="text-light text-thin text-shadow">New Collection of</h4>
                                <h3 className="text-bold text-light text-shadow">Sunglassess</h3><a className="btn btn-sm btn-primary" href="#">Shop Now</a>
                            </div>
                            </section>
                        </aside>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
export default Shop;
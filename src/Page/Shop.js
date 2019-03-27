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
            isLoading: false,
            quantity: 1,
            picture_sementara: "",
            productName_sementara: "",
            showProducts: "",
            currentPage: 1,
            productPage: 12,
            from: 0,
            limit: 12
        }
    }

    // load more products and sorting
    showMore = (sort) => {
        this.setState({
            from: 0,
            limit: 12
        });

        axios.get('http://localhost:2018/products').then((x) => {
            if (sort == 'lowPrice'){
                var hasil = x.data.sort((a, b) => {
                    return a.price - b.price
                })
                this.setState({
                    productData: hasil,
                    showProducts: hasil.slice(this.state.from, this.state.limit),
                    isLoading: false
                })
            }
            else if (sort == 'highPrice'){
                var hasil = x.data.sort((a, b) => {
                    return b.price - a.price
                })
                this.setState({
                    productData: hasil,
                    showProducts: hasil.slice(this.state.from, this.state.limit),
                    isLoading: false
                })
            }
            else if (sort == 'alphabet') {
                var hasil = x.data.sort((a, b) => {
                    if (a.name == b.name) {
                        return 0;
                    }
                    else if (a.name < b.name) {
                        return -1;
                    }
                    else {
                        return 1;
                    }
                });
                this.setState({
                    productData: hasil,
                    showProducts: hasil.slice(this.state.from, this.state.limit),
                    isLoading: false
                })
            }
            else {
                this.setState({
                    productData: x.data,
                    showProducts: x.data.slice(this.state.from, this.state.limit),
                    isLoading: false
                })
            }
        })
    }

    // pagenation
    handleClick(e) {
        e.preventDefault()
        this.setState({
          currentPage: Number(e.target.id)
        })
    }

    handleClickNext(e) {
        e.preventDefault()
        this.setState({
          currentPage: Number(this.state.currentPage + 1)
        })
    }
    
    // SHOW PRODUCT / get all product from data database
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

    // add data to carts
    addCart = (productID, price, picture, productname) => {
        if(localStorage.getItem("userid")){
        this.setState({
            picture_sementara: picture,
            productName_sementara: productname
        })
        var picture = picture;
        var productname = productname;
        axios.post('http://localhost:2018/cart', {
            userID: this.props.userID,
            productID: productID,
            price: price,
            quantity: this.state.quantity,
            totalPrice: this.state.quantity * price
        }).then((x) => {
            console.log(x)
        }).catch(() => {
            console.log("Failed Add to cart!")
        })
        // console.log(price)
        // console.log(this.props.userID)
        console.log(picture)
        console.log(productname)
    }
    else{
        alert("Anda harus Login!")
        window.location.href="/login"
    }
    }

    // menampilkan produk
    displayProduct(){
        return this.state.productData.map((val, index) => {
            return (
                <div className="grid-item">
                <div className="product-card">
                    {/* <div className="product-badge text-danger">50% Off</div> */}
                    <a className="product-thumb" data-toggle="tooltip" title="Click for details!" href={`/shop/${val.productID}`} ><img src={val.picture} alt="Product"/></a>
                    <h3 className="product-title"><a href="">{val.productname}</a></h3>
                    <h4 className="product-price">
                    {/* <del>IDR 1,227,000</del> */}
                    Rp. {val.price}
                    </h4>
                    <div className="product-buttons">
                    <button className="btn btn-outline-secondary btn-sm btn-wishlist" data-toggle="tooltip" title="Whishlist"><i className="icon-heart"></i></button>
                    <button onClick={() => {this.addCart(val.productID, val.price, val.picture, val.productname)}} className="btn btn-outline-primary btn-sm" data-toast data-toast-type="success" data-toast-position="topRight" data-toast-icon="icon-circle-check" data-toast-title="Product" data-toast-message="successfuly added to cart!" data-toggle="modal" data-target="#modalDefault">Add to Cart</button>
                    </div>
                </div>
                </div>
            )
        })
    }

    // modal view cart
    displayModal() {
        return (
            <div className="modal fade" id="modalDefault" tabindex="-1" role="dialog">
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                    <div className="modal-header">
                        <h4 className="modal-title" style={{marginLeft: "140px"}}>Berhasil Ditambahkan</h4>
                        <button className="close" type="button" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                    </div>
                    <div className="modal-body">
                        <div className="card">
                            <div className="row p-2"> 
                                <div className="col-lg-3">
                                    <img src={this.state.picture_sementara} style={{width: 60, height: 60}} />
                                </div>
                                <div className="col-lg-9 mt-3">
                                    {this.state.productName_sementara}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="modal-footer">
                        {/* <button class="btn btn-outline-secondary btn-sm" type="button" data-dismiss="modal">Close</button> */}
                        <button onClick={() => {window.location.href ='/cart'}} class="btn btn-primary btn-sm" type="button">View cart</button>
                    </div>
                    </div>
                </div>
            </div>
        )
    }

    render() {

        // looping page number supaya ketambah sesuai limit yg ditentukan per page
        // const pageNumbers = [];
        // for (let i = 1; i <= Math.ceil(products.length / productsPerPage); i++) {
        // pageNumbers.push(i);
        // }

        // const renderPageNumbers = pageNumbers.map((number, i) => {
        //     if(i==0){
        //         return (
        //             <li className="active"><a href="#" id={number} onClick={this.handleClick} data-toggle="tab">{number}</a></li>
        //         )
        //     }
        //     else{
        //         return (
        //             <li><a href="#" id={number} onClick={this.handleClick} data-toggle="tab">{number}</a></li>
        //         )
        //     }
        // });

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
                                <select className="form-control" id="sorting" onChange={(e) => {this.showMore(e.target.value)}}>
                                <option hidden>Choose</option>
                                <option value="lowPrice">Low - High Price</option>
                                <option value="highPrice">High - Low Price</option>
                                <option value="alphabet">A - Z Order</option>
                                </select><span className="text-muted">Showing:&nbsp;</span><span>1 - 12 items</span>
                            </div>
                            </div>
                            <div className="column">
                            <div className="shop-view"><a className="grid-view active" href="/cart"><span></span><span></span><span></span></a><a className="list-view" href="shop-list-ls.html"><span></span><span></span><span></span></a></div>
                            </div>
                        </div>

                        {/* Products Grid */}
                        <div className="isotope-grid cols-3 mb-2">
                            <div className="gutter-sizer"></div>
                            <div className="grid-sizer"></div>

                            {/* Product */}
                            {this.displayProduct()}
                            {this.displayModal()}
                        </div>
                        
                        {/* Pagination */}
                        <nav className="pagination" style={{paddingBottom: "80px"}}>
                            <div className="column">
                            <ul className="pages">
                                <li className="active"><a href="#">1</a></li>
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
                            <form className="price-range-slider" method="post" data-start-min="399000" data-start-max="650000" data-min="400000" data-max="5000000" data-step="1">
                                <div className="ui-range-slider"></div>
                                <footer className="ui-range-slider-footer">
                                <div className="column">
                                    <button className="btn btn-outline-primary btn-sm" type="submit">Filter</button>
                                </div>
                                <div className="column">
                                    <div className="ui-range-values">
                                    <div className="ui-range-value-min">Rp. <span></span>
                                        <input type="hidden"/>
                                    </div>&nbsp;-&nbsp;
                                    <div className="ui-range-value-max">Rp. <span></span>
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
                                <label className="custom-control-label" for="adidas">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Adidas<span className="text-muted"></span></label>
                            </div>
                            <div className="custom-control custom-checkbox">
                                <input className="custom-control-input" type="checkbox" id="bilabong"/>
                                <label className="custom-control-label" for="bilabong">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Nike<span className="text-muted"></span></label>
                            </div>
                            <div className="custom-control custom-checkbox">
                                <input className="custom-control-input" type="checkbox" id="klein"/>
                                <label className="custom-control-label" for="klein">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;New Balance<span className="text-muted"></span></label>
                            </div>
                            </section>

                            {/* Widget Size Filter */}
                            <section className="widget">
                            <h3 className="widget-title">Filter by Size</h3>
                            <div className="custom-control custom-checkbox">
                                <input className="custom-control-input" type="checkbox" id="39"/>
                                <label className="custom-control-label" for="xl">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;39<span className="text-muted">&nbsp;EUR</span></label>
                            </div>
                            <div className="custom-control custom-checkbox">
                                <input className="custom-control-input" type="checkbox" id="40"/>
                                <label className="custom-control-label" for="l">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;40<span className="text-muted">&nbsp;EUR</span></label>
                            </div>
                            <div className="custom-control custom-checkbox">
                                <input className="custom-control-input" type="checkbox" id="41"/>
                                <label className="custom-control-label" for="m">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;41<span className="text-muted">&nbsp;EUR</span></label>
                            </div>
                            <div className="custom-control custom-checkbox">
                                <input className="custom-control-input" type="checkbox" id="42"/>
                                <label className="custom-control-label" for="s">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;42<span className="text-muted">&nbsp;EUR</span></label>
                            </div>
                            <div className="custom-control custom-checkbox">
                                <input className="custom-control-input" type="checkbox" id="43"/>
                                <label className="custom-control-label" for="s">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;43<span className="text-muted">&nbsp;EUR</span></label>
                            </div>
                            <div className="custom-control custom-checkbox">
                                <input className="custom-control-input" type="checkbox" id="44"/>
                                <label className="custom-control-label" for="s">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;44<span className="text-muted">&nbsp;EUR</span></label>
                            </div>
                            </section>

                            {/* Promo Banner */}
                            {/* <section className="promo-box" style={{backgroundImage: "url(img/banners/02.jpg)"}}> */}
                            {/* Choose between .overlay-dark (#000) or .overlay-light (#fff) with default opacity of 50%. You can overrride default color and opacity values via 'style' attribute.*/}<span className="overlay-dark" style={{opacity: ".45"}}></span>
                            {/* <div className="promo-box-content text-center padding-top-3x padding-bottom-2x">
                                <h4 className="text-light text-thin text-shadow">New Collection of</h4>
                                <h3 className="text-bold text-light text-shadow">Sunglassess</h3><a className="btn btn-sm btn-primary" href="#">Shop Now</a>
                            </div> */}
                            {/* </section> */}
                        </aside>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
export default Shop;
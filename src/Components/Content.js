import React from 'react';

class Content extends React.Component {
    render() {
        return(

            
            <div style={{paddingTop: "100px"}}>
                {/* Top Categories*/}
                <section class="container padding-top-3x">
                    <h3 class="text-center mb-30">Top Categories</h3>
                    <div class="row">
                    <div class="col-md-4 col-sm-6">
                        <div class="card mb-30"><a class="card-img-tiles" href="shop-grid-ls.html">
                            <div class="inner">
                            <div class="main-img"><img src="img/shop/categories/01.jpg" alt="Category"/></div>
                            <div class="thumblist"><img src="img/shop/categories/02.jpg" alt="Category"/><img src="img/shop/categories/03.jpg" alt="Category"/></div>
                            </div></a>
                        <div class="card-body text-center">
                            <h4 class="card-title">Clothing</h4>
                            <p class="text-muted">Starting from IDR 500,000</p><a class="btn btn-outline-primary btn-sm" href="shop-grid-ls.html">View Products</a>
                        </div>
                        </div>
                    </div>
                    <div class="col-md-4 col-sm-6">
                        <div class="card mb-30"><a class="card-img-tiles" href="shop-grid-ls.html">
                            <div class="inner">
                            <div class="main-img"><img src="img/shop/categories/04.jpg" alt="Category"/></div>
                            <div class="thumblist"><img src="img/shop/categories/05.jpg" alt="Category"/><img src="img/shop/categories/06.jpg" alt="Category"/></div>
                            </div></a>
                        <div class="card-body text-center">
                            <h4 class="card-title">Shoes</h4>
                            <p class="text-muted">Starting from IDR 700,000</p><a class="btn btn-outline-primary btn-sm" href="shop-grid-ls.html">View Products</a>
                        </div>
                        </div>
                    </div>
                    <div class="col-md-4 col-sm-6">
                        <div class="card mb-30"><a class="card-img-tiles" href="shop-grid-ls.html">
                            <div class="inner">
                            <div class="main-img"><img src="img/shop/categories/07.jpg" alt="Category"/></div>
                            <div class="thumblist"><img src="img/shop/categories/08.jpg" alt="Category"/><img src="img/shop/categories/09.jpg" alt="Category"/></div>
                            </div></a>
                        <div class="card-body text-center">
                            <h4 class="card-title">Bags</h4>
                            <p class="text-muted">Starting from IDR 350,000</p><a class="btn btn-outline-primary btn-sm" href="shop-grid-ls.html">View Products</a>
                        </div>
                        </div>
                    </div>
                    </div>
                </section>
            
                
                {/* Popular Brands*/}
                <section class="bg-faded padding-top-3x padding-bottom-3x">
                    <div class="container">
                    <h3 class="text-center mb-30 pb-2">Popular Brands</h3>
                    <div class="owl-carousel" data-owl-carousel="{ &quot;nav&quot;: false, &quot;dots&quot;: false, &quot;loop&quot;: true, &quot;autoplay&quot;: true, &quot;autoplayTimeout&quot;: 4000, &quot;responsive&quot;: {&quot;0&quot;:{&quot;items&quot;:2}, &quot;470&quot;:{&quot;items&quot;:3},&quot;630&quot;:{&quot;items&quot;:4},&quot;991&quot;:{&quot;items&quot;:5},&quot;1200&quot;:{&quot;items&quot;:6}} }"><img class="d-block w-110 opacity-75 m-auto" src="img/brands/01.png" alt="Adidas"/><img class="d-block w-110 opacity-75 m-auto" src="img/brands/02.png" alt="Brooks"/><img class="d-block w-110 opacity-75 m-auto" src="img/brands/03.png" alt="Valentino"/><img class="d-block w-110 opacity-75 m-auto" src="img/brands/04.png" alt="Nike"/><img class="d-block w-110 opacity-75 m-auto" src="img/brands/05.png" alt="Puma"/><img class="d-block w-110 opacity-75 m-auto" src="img/brands/06.png" alt="New Balance"/><img class="d-block w-110 opacity-75 m-auto" src="img/brands/07.png" alt="Dior"/></div>
                    </div>
                </section>
                
                {/* Services*/}
                <section class="container padding-top-3x padding-bottom-2x">
                    <div class="row">
                    <div class="col-md-3 col-sm-6 text-center mb-30"><img class="d-block w-90 img-thumbnail rounded-circle mx-auto mb-3" src="img/services/01.png" alt="Shipping"/>
                        <h6>Free Worldwide Shipping</h6>
                        <p class="text-muted margin-bottom-none">Free shipping for all orders over <br/> IDR 1,000,000</p>
                    </div>
                    <div class="col-md-3 col-sm-6 text-center mb-30"><img class="d-block w-90 img-thumbnail rounded-circle mx-auto mb-3" src="img/services/02.png" alt="Money Back"/>
                        <h6>Money Back Guarantee</h6>
                        <p class="text-muted margin-bottom-none">We return money within 30 days</p>
                    </div>
                    <div class="col-md-3 col-sm-6 text-center mb-30"><img class="d-block w-90 img-thumbnail rounded-circle mx-auto mb-3" src="img/services/03.png" alt="Support"/>
                        <h6>24/7 Customer Support</h6>
                        <p class="text-muted margin-bottom-none">Friendly 24/7 customer support</p>
                    </div>
                    <div class="col-md-3 col-sm-6 text-center mb-30"><img class="d-block w-90 img-thumbnail rounded-circle mx-auto mb-3" src="img/services/04.png" alt="Payment"/>
                        <h6>Secure Online Payment</h6>
                        <p class="text-muted margin-bottom-none">We posess SSL / Secure Certificate</p>
                    </div>
                    </div>
                </section>
            </div>

        )
    }
}
export default Content;
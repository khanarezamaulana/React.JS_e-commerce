import React from 'react';

class Carousel extends React.Component {
    render() {
        return(

            <div style={{position: "relative", top: "120px", borderTop: "1px solid #e1e7ec"}}>
                {/* Main Slider */}
                <section className="hero-slider" style={{backgroundImage: "url(img/hero-slider/main-bg.jpg)"}}>
                    <div className="owl-carousel large-controls dots-inside" data-owl-carousel="{ &quot;nav&quot;: true, &quot;dots&quot;: true, &quot;loop&quot;: true, &quot;autoplay&quot;: true, &quot;autoplayTimeout&quot;: 7000 }">
                    <div className="item">
                        <div className="container padding-top-3x">
                        <div className="row justify-content-center align-items-center">
                            <div className="col-lg-5 col-md-6 padding-bottom-3x text-md-left text-center">
                            <div className="from-bottom"><img className="d-inline-block w-150 mb-4" src="img/hero-slider/04.png" alt="Nikelogo"/>
                                <div className="h2 text-body text-normal mb-2 pt-1">Nike Air VaporMax 2019</div>
                                <div className="h2 text-body text-normal mb-4 pb-1">starting at <span className="text-bold">IDR 2.500.000</span></div>
                            </div><a className="btn btn-primary scale-up delay-1" href="/shop">Shop Now</a>
                            </div>
                            <div className="col-md-6 padding-bottom-2x mb-3"><img className="d-block mx-auto" src="img/hero-slider/Nike01.png" alt="Nike"/></div>
                        </div>
                        </div>
                    </div>
                    <div className="item">
                        <div className="container padding-top-3x">
                        <div className="row justify-content-center align-items-center">
                            <div className="col-lg-5 col-md-6 padding-bottom-3x text-md-left text-center">
                            <div className="from-bottom"><img className="d-inline-block w-150 mb-0" src="img/hero-slider/05.png" alt="adiadaslogo"/>
                                <div className="h2 text-body text-normal mb-2 pt-1">Yeezy Boost 700 Mauve</div>
                                <div className="h2 text-body text-normal mb-4 pb-1">for only <span className="text-bold">IDR 2.245.000</span></div>
                            </div><a className="btn btn-primary scale-up delay-1" href="/shop">Shop Now</a>
                            </div>
                            <div className="col-md-6 padding-bottom-2x mb-3" style={{paddingTop: "35px"}}><img className="d-block mx-auto" src="img/hero-slider/adidas.png" alt="adidas"/></div>
                        </div>
                        </div>
                    </div>
                    <div className="item">
                        <div className="container padding-top-3x">
                        <div className="row justify-content-center align-items-center">
                            <div className="col-lg-5 col-md-6 padding-bottom-2x text-md-left text-center">
                            <div className="from-bottom"><img className="d-inline-block mb-4" src="img/hero-slider/06.png" style={{width: "125px"}} alt="newbalancelogo"/>
                                <div className="h2 text-body text-normal mb-2 pt-1">New Balance 247 Flavors</div>
                                <div className="h2 text-body text-normal mb-4 pb-1">for only <span className="text-bold">IDR 799.000</span></div>
                            </div><a className="btn btn-primary scale-up delay-1" href="/shop">Shop Now</a>
                            </div>
                            <div className="col-md-6 padding-bottom-2x mb-3"><img className="d-block mx-auto" src="img/hero-slider/newbalance01.png" alt="newbalance"/></div>
                        </div>
                        </div>
                    </div>
                    </div>
                </section>
            </div>
        )
    }
}
export default Carousel; 
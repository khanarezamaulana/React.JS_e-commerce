import React from 'react';

class Footer extends React.Component {
    render() {
        return(

            <div style={{marginTop: "150px"}}>
                {/* Site Footer*/}
                <footer class="site-footer">
                    <div class="container">
                        <div class="row">
                        <div class="col-lg-3 col-md-6">

                            {/* Contact Info*/}
                            <section class="widget widget-light-skin">
                            <h3 class="widget-title">Get In Touch With Us</h3>
                            <p class="text-white">Phone: +62 852 9611 6745</p>
                            <ul class="list-unstyled text-sm text-white">
                                <li><span class="opacity-50">Monday-Friday:</span> 9.00 am - 8.00 pm</li>
                                <li><span class="opacity-50">Saturday:</span> 10.00 am - 6.00 pm</li>
                            </ul>
                            <p><a class="navi-link-light" href="">promotion.id2018@gmail.com</a></p><a class="social-button shape-circle sb-facebook sb-light-skin" href=""><i class="socicon-facebook"></i></a><a class="social-button shape-circle sb-twitter sb-light-skin" href=""><i class="socicon-twitter"></i></a><a class="social-button shape-circle sb-instagram sb-light-skin" href=""><i class="socicon-instagram"></i></a><a class="social-button shape-circle sb-google-plus sb-light-skin" href=""><i class="socicon-googleplus"></i></a>
                            </section>
                        </div>
                        <div class="col-lg-3 col-md-6">
                            
                            {/* Mobile App Buttons*/}
                            <section class="widget widget-light-skin">
                            <h3 class="widget-title">Our Mobile App</h3><a class="market-button apple-button mb-light-skin" href=""><span class="mb-subtitle">Download on the</span><span class="mb-title">App Store</span></a><a class="market-button google-button mb-light-skin" href=""><span class="mb-subtitle">Download on the</span><span class="mb-title">Google Play</span></a><a class="market-button windows-button mb-light-skin" href=""><span class="mb-subtitle">Download on the</span><span class="mb-title">Windows Store</span></a>
                            </section>
                        </div>
                        <div class="col-lg-3 col-md-6">
                            
                            {/* About Us*/}
                            <section class="widget widget-links widget-light-skin">
                            <h3 class="widget-title">About Us</h3>
                            <ul>
                                <li><a href="">Careers</a></li>
                                <li><a href="">About Pro-Motion.id</a></li>
                                <li><a href="">Our Story</a></li>
                                <li><a href="">Services</a></li>
                                <li><a href="">Our Blog</a></li>
                            </ul>
                            </section>
                        </div>
                        <div class="col-lg-3 col-md-6">
                            
                            {/* Account / Shipping Info*/}
                            <section class="widget widget-links widget-light-skin">
                            <h3 class="widget-title">Account &amp; Shipping Info</h3>
                            <ul>
                                <li><a href="">Your Account</a></li>
                                <li><a href="">Shipping Rates & Policies</a></li>
                                <li><a href="">Refunds & Replacements</a></li>
                                <li><a href="">Delivery Info</a></li>
                                <li><a href="">Affiliate Program</a></li>
                            </ul>
                            </section>
                        </div>
                        </div>
                        <hr class="hr-light mt-2 margin-bottom-2x"/>
                        <div class="row">
                        <div class="col-md-7 padding-bottom-1x">
                            {/* Payment Methods*/}
                            <div class="margin-bottom-1x" style={{maxWidth: "615px"}}><img src="img/payment_methods.png" alt="Payment Methods"/>
                            </div>
                        </div>
                        <div class="col-md-5 padding-bottom-1x">
                            <div class="margin-top-1x hidden-md-up"></div>
                        </div>
                        </div>
                        
                        {/* Copyright*/}
                        <p class="footer-copyright">© All rights reserved. Made with &nbsp;<i class="icon-heart text-danger"></i><a href="http://rokaux.com/" target="_blank"> &nbsp;by Pro-motion.id</a></p>
                    </div>
                </footer>
                
                
                {/* Back To Top Button*/}
                <a class="scroll-to-top-btn" href=""><i class="icon-arrow-up"></i></a>
                
                {/* Backdrop*/}
                <div class="site-backdrop"></div>

            </div>

        )
    }
}
export default Footer;
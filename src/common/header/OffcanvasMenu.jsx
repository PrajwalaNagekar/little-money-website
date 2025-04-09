import React from 'react';
import { Link } from 'react-router-dom';
import Offcanvas from 'react-bootstrap/Offcanvas'
import { FaFacebookF, FaLinkedinIn, FaBehance, FaPhone, FaFax } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
const PUBLIC_URL = import.meta.env.VITE_API_URL;


const OffcanvasMenu = ({ offcanvasShow, offcanvasHide }) => {
    return (
        <Offcanvas show={offcanvasShow} onHide={offcanvasHide} placement="end" className="header-offcanvasmenu">
            <Offcanvas.Header closeButton></Offcanvas.Header>
            <Offcanvas.Body>
                <form action="#" className="side-nav-search-form">
                    {/* <div className="form-group">
                        <input type="text" className="search-field" name="search-field" placeholder="Search..." />
                        <button className="side-nav-search-btn"><i className="fas fa-search"></i></button>
                    </div> */}
                </form>
                <div className="row ">
                    <div className="col-lg-5 col-xl-6">
                        <h4>Services we offer</h4> <br />
                        <ul className="main-navigation list-unstyled">
                            {/* <h3>Services We Offer</h3> */}
                            <li><h5>Personal Loan</h5></li>
                            
                            <Link to='/personal-loan'><button className="axil-btn btn-fill-primary ">
                                Apply Now
                            </button></Link>
                            {/* <li><Link to={PUBLIC_URL + "/creative-agency"}>Business Loan </Link></li> */}
                            <li><h5>Business Loan</h5></li>
                            <Link to='/business-loan'><button className="axil-btn btn-fill-primary " id='btn-bl'>
                                Apply Now                            </button></Link>
                            <li><h5>BNPL</h5></li>
                            <Link to='/contact'><button className="axil-btn btn-fill-primary " id='btn-bl'>
                                Contact Us                           </button></Link>

                            {/* <li><Link to={PUBLIC_URL + "/personal-portfolio"}>Personal Portfolio</Link></li>
                            <li><Link to={PUBLIC_URL + "/home-startup"}>Home Startup</Link></li>
                            <li><Link to={PUBLIC_URL + "/corporate-agency"}>Corporate Agency</Link></li> */}
                        </ul>
                    </div>
                    <div className="col-lg-7 col-xl-6">
                        <div className="contact-info-wrap">
                            <div className="contact-inner">
                                <address className="address">
                                    <h4 >Contact Information</h4>
                                    <p>#30/1, 4th Cross Road, New Bank Colony, <br /> Konanakunte, 560062

                                        <br /> Bengaluru</p>
                                </address>
                                <address className="address">
                                    <span className="title">Call us at</span>
                                    <p className="tel"><FaPhone />+91 97399 06066</p>
                                    {/* <a href="tel:12125553333" className="tel"><FaFax /> (121) 255-53333</a> */}
                                </address>
                            </div>
                            <div className="contact-inner">
                                <h5 className="title">Find us here</h5>
                                <div className="contact-social-share">
                                    <ul className="social-share list-unstyled">
                                        {/* <li>
                                            <a href="https://facebook.com/"><FaFacebookF /></a>
                                        </li>

                                        <li>
                                            <a href="https://twitter.com/"><FaXTwitter /></a>
                                        </li> */}
                                        {/* <li>
                                            <a href="https://www.behance.net/"><FaBehance /></a>
                                        </li> */}
                                        <li>
                                            <a href="https://www.linkedin.com/company/little-money-technologies" target='_blank'><FaLinkedinIn /></a>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </Offcanvas.Body>
        </Offcanvas>
    )
}

export default OffcanvasMenu;

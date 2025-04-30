import React from 'react';
import { Link } from 'react-router-dom';
import { FaAngleDown } from "react-icons/fa";
const PUBLIC_URL = import.meta.env.VITE_API_URL;


const Nav = () => {
    return (
        <nav className="mainmenu-nav">
            <ul className="mainmenu">
                {/* <li className="menu-item-has-children">
                    <Link to="#">Home</Link>
                    <ul className="axil-submenu">
                        <li><Link to={PUBLIC_URL + "/digital-agency"}>Digital Agency</Link></li>
                        <li><Link to={PUBLIC_URL + "/creative-agency"}>Creative Agency</Link></li>
                        <li><Link to={PUBLIC_URL + "/personal-portfolio"}>Personal Portfolio</Link></li>
                        <li><Link to={PUBLIC_URL + "/home-startup"}>Home Startup</Link></li>
                        <li><Link to={PUBLIC_URL + "/corporate-agency"}>Corporate Agency</Link></li>
                        <li><a href="https://new.axilthemes.com/demo/react/abstrak-rtl/">RTL Demo</a></li>
                    </ul>
                </li> */}
                {/* <li className="menu-item-has-children">
                    <Link to="#">Services <FaAngleDown /></Link>

                    <ul className="axil-submenu">
                        <li><Link to={PUBLIC_URL + "/service-one"}>Service</Link></li>
                        <li><Link to={PUBLIC_URL + "/service-two"}>Service Two</Link></li>
                        <li><Link to={PUBLIC_URL + "/service-details/design"}>Service Details</Link></li>
                    </ul>
                </li> */}
                {/* <li className="menu-item-has-children">
                    <Link to="#">Portfolio <FaAngleDown /></Link>
                    <ul className="axil-submenu">
                        <li><Link to={PUBLIC_URL + "/project-grid-one"}>Two Column</Link></li>
                        <li><Link to={PUBLIC_URL + "/project-grid-two"}>Three Column</Link></li>
                        <li><Link to={PUBLIC_URL + "/project-grid-three"}>Four Column</Link></li>
                        <li><Link to={PUBLIC_URL + "/project-width-one"}>Three Column Width</Link></li>
                        <li><Link to={PUBLIC_URL + "/project-width-two"}>Four Column Width</Link></li>
                        <li><Link to={PUBLIC_URL + "/project-details/plan-management"}>Portfolio Details</Link></li>
                    </ul>
                </li> */}
                {/* <li className="menu-item-has-children">
                    <Link to="#">About Us </Link>
                    <ul className="axil-submenu">
                        <li><Link to={PUBLIC_URL + "/about-us"}>About Us</Link></li>
                        <li><Link to={PUBLIC_URL + "/our-office"}>Our Office</Link></li>
                        <li><Link to={PUBLIC_URL + "/case-study"}>Case Study</Link></li>
                        <li><Link to={PUBLIC_URL + "/case-details/whitehorse"}>Case Study Details</Link></li>
                        <li><Link to={PUBLIC_URL + "/team"}>Team</Link></li>
                        <li><Link to={PUBLIC_URL + "/team-details/jane-cooper"}>Team Details</Link></li>
                        <li><Link to={PUBLIC_URL + "/our-clients"}>Our Clients</Link></li>
                        <li><Link to={PUBLIC_URL + "/testimonials"}>Testimonial</Link></li>
                        <li><Link to={PUBLIC_URL + "/pricing-table"}>Pricing Table</Link></li>
                        <li><Link to={PUBLIC_URL + "/typography"}>Typography</Link></li>
                        <li><Link to={PUBLIC_URL + "/404"}>404 Page</Link></li>
                        <li><Link to={PUBLIC_URL + "/coming-soon"}>Coming Soon</Link></li>
                    </ul>
                </li> */}
                {/* <li className="menu-item-has-children"> */}
                {/* <Link to="#">Blog <FaAngleDown /></Link> */}
                {/* <ul className="axil-submenu"> */}
                {/* <li><Link to={PUBLIC_URL + "/blog-grid"}>Blog</Link></li> */}
                {/* <li><Link to={PUBLIC_URL + "/blog-details/1"}>Standard Post</Link></li> */}
                {/* <li><Link to={PUBLIC_URL + "/blog-details/2"}>Gallery Post</Link></li> */}
                {/* <li><Link to={PUBLIC_URL + "/blog-details/3"}>Video Post</Link></li> */}
                {/* <li><Link to={PUBLIC_URL + "#"}>Audio Post</Link></li>
                        <li><Link to={PUBLIC_URL + "#"}>Quote Post</Link></li> */}
                {/* </ul> */}
                {/* </li> */}
                <li><Link to={PUBLIC_URL + "/"}>Home</Link></li>

                <li><Link to={PUBLIC_URL + "/about-us"}>About Us</Link></li>

                <li><Link to={PUBLIC_URL + "/contact"}>Contact</Link></li>
                {/* <li><Link to={PUBLIC_URL + "/our-clients"}>Our Partners</Link></li> */}

                {/* <li><Link to={PUBLIC_URL + "/personal-loan"}>Personal Loan</Link></li> */}

                <ul className="list-unstyled ">
                    <li className="buy-btn"><Link to="/personal-loan" className="axil-btn btn-fill-primary">Personal Loan</Link></li>

                </ul>

                <ul className="list-unstyled me-2">
                    <li className="buy-btn"><Link to="/business-loan" className="axil-btn btn-fill-primary">Business Loan</Link></li>
                </ul>
            </ul>
        </nav>
    )
}

export default Nav;
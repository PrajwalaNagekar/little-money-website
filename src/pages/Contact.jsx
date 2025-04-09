import React from 'react';
import SEO from '../common/SEO';
import ColorSwitcher from '../elements/switcher/ColorSwitcher';
import FooterOne from '../common/footer/FooterOne';
import HeaderOne from '../common/header/HeaderOne';
import BreadCrumbOne from '../elements/breadcrumb/BreadCrumbOne';
import FormTwo from '../component/contact/FormTwo';
import SectionTitle from '../elements/section-title/SectionTitle';
import ContactLocation from '../component/contact/ContactLocation';
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";
import HeaderTwo from '../common/header/HeaderTwo';
import TopNavbar from './TopNavbar';
const PUBLIC_URL = import.meta.env.VITE_API_URL;



const Contact = () => {
    const mapContainerStyle = { width: "100%", height: "600px" };
    const location = { lat: 12.9532, lng: 77.6323 }
    return (
        <>
            <SEO title="Contact" />
            {/* <TopNavbar/> */}

            {/* <ColorSwitcher /> */}
            <main className="main-wrapper">
                <HeaderTwo />
                <BreadCrumbOne

                />

                <div className="section ">
                    <div className="container">
                        <div className="row">
                            <div className="col-xl-5 col-lg-6 mb-custom">
                                <div className="contact-info h-50 d-flex flex-column justify-content-between p-4">
                                    <h4 className="title">Phone</h4>
                                    <p>Our customer care is open from Mon-Fri, 10:00 am to 6:00 pm</p>
                                    <h4 className="phone-number"><a href="tel:+91 97399 06066"> +91 97399 06066</a></h4>
                                </div>

                                <div className="contact-info h-50 d-flex flex-column justify-content-between p-4 mt-4">
                                    <h4 className="title">Timings</h4>
                                    <p>Sunday Closed</p>
                                    <br></br>
                                    <h4 className="email"><a href="">
                                        Mon - Sat: 8AM - 5PM
                                    </a></h4>
                                </div>
                                {/* </div> */}
                            </div>
                            <br /> 
                            <div className="col-xl-5 col-lg-6 offset-xl-1 mb-custom">
                                <div className="contact-info  h-50 d-flex flex-column justify-content-between p-4">
                                    <h4 className="title">Email</h4>
                                    <p>Our support team will get back to in 48-h during standard business hours.</p>
                                    <h6 className="email"><a href="mailto:admin@littlemoney.co.in">admin@littlemoney.co.in
                                    </a></h6>                                </div>

                                <div className="contact-info h-50 d-flex flex-column justify-content-between p-4 mt-4">
                                    <h4 className="title">Location</h4>
                                    <p>#30/1, 4th Cross Road, New Bank Colony, Konanakunte, 560062

                                    </p>
                                    <h4 className="email"><a href="#">
                                        Bengaluru</a></h4>
                                </div>
                            </div>
                        </div>
                    </div>
<br />
                </div>

                {/* <div className="section section-padding bg-color-dark overflow-hidden">
                <div className="container">
                    <SectionTitle 
                        subtitle="Find Us"
                        title="Our office"
                        description=""
                        textAlignment="heading-light-left"
                        textColor=""
                    />
                    <div className="row">
                        <ContactLocation />
                    </div>
                </div>
                <ul className="shape-group-11 list-unstyled">
                    <li className="shape shape-1"><img src={PUBLIC_URL + "/images/others/line-6.png"} alt="line" /></li>
                    <li className="shape shape-2"><img src={PUBLIC_URL + "/images/others/circle-3.png"} alt="line" /></li>
                </ul>
            </div> */}
                <iframe
                    src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d243.08640681177388!2d77.56647428342009!3d12.883107851248651!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sen!2sin!4v1743052548996!5m2!1sen!2sin"
                    width="100%"
                    height="450"
                    style={{ border: 0 }}
                    allowFullScreen=""
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                ></iframe>

                <FooterOne parentClass=" pt_lg--100 pt_md--80 pt_sm--60" />
            </main>
        </>
    )
}

export default Contact;
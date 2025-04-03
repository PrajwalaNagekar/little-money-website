import React from 'react';
import { Link } from 'react-router-dom';
const PUBLIC_URL = import.meta.env.VITE_API_URL;


const AboutFive = () => {
    return (
        <div className="section-padding-equal">
            <div className="container">
                <div className="row align-items-center">
                    <div className="col-lg-7">
                        <div className="about-team">
                            {/* <div className="thumbnail"> */}
                                <img src={PUBLIC_URL + "/images/about/about-pl.jpeg"} alt="thumbnail" />
                            {/* </div> */}
                        </div>
                    </div>
                    <div className="col-lg-5">
                        <div className="about-team">
                            <div className="section-heading heading-left">
                                <span className="subtitle">Our Mission
                                </span>
                                <h2>Smart Lending for Financial Independence</h2>
                                <p>Our mission is to reduce dependency on traditional lending formats by providing technology-driven, customized lending solutions that meet the unique needs of each consumers we help foster financial independence for consumers while driving sustainable growth for merchants.</p>
                                {/* <Link to="#" className="axil-btn btn-large btn-fill-primary">Our Team</Link> */}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AboutFive;
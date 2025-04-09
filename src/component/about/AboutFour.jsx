import React from 'react';
import { Link } from 'react-router-dom';
import CountUp from 'react-countup';
import TrackVisibility from 'react-on-screen';
const PUBLIC_URL = import.meta.env.VITE_API_URL;


const AboutFour = () => {
    return (
        <div className="section case-study-featured-area">
            <div className="container">
                <br /><br />
                <div className="row">
                <span className="subtitle">Who we are</span>
                <h3 className="">Little Money: Empowering Lending with Technology</h3>
                    <div className="col-xl-7 col-lg-6 d-flex align-items-center justify-content-center">
                        <div className="case-study-featured-thumb">
                            <img src={PUBLIC_URL + "/images/others/AboutUs_01.jpg"} alt="travel" />
                        </div>
                    </div>
                    <div className="col-xl-5 col-lg-6  ">
                        <div className="case-study-featured">
                            <div className=" section-padding section-heading heading-left">
                                
                                <p className='text-justify '>Little Money Technologies is a leading provider of innovative tech solutions designed specifically for the lending industry. We focus on empowering merchants by redefining their lending experience with cutting-edge technology.</p>
                                <p className='text-justify'>Additionally, LittleMoney features a unique "Buy Now Pay Later" option, linking customers with local merchants. Here, shoppers can purchase a wide range of items using Low cost EMI, interest-free credits that are instantly available on the platform.</p>
                                <p className="axil-btn btn-fill-primary btn-large">CIN: U70200KA2025PTC196495</p>
                            </div>
                            <div className="case-study-counterup">
                                <div className="single-counterup">
                                    <h2 className="count-number">
                                        
                                    </h2>
                                </div>
                                
                            </div>
                        </div>
                    </div>
                </div>
                <br /><br />
            </div>
        </div>

    )
}

export default AboutFour;
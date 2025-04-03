import React from 'react';
import { Link } from 'react-router-dom';
import CountUp from 'react-countup';
import TrackVisibility from 'react-on-screen';
const PUBLIC_URL = import.meta.env.VITE_API_URL;


const AboutFour = () => {
    return (
            <div className="section section-padding case-study-featured-area">
                <div className="container">
                    <div className="row">
                    <div className="col-xl-7 col-lg-6">
                        <div className="case-study-featured-thumb text-start">
                        <img src={PUBLIC_URL + "/images/others/rupee.jpeg"} alt="travel" />
                        </div>
                    </div>
                    <div className="col-xl-5 col-lg-6">
                        <div className="case-study-featured">
                        <div className="section-heading heading-left">
                            <span className="subtitle">Who we are</span>
                            <h3 className="title">Little Money: Empowering Lending with Technology</h3>
                            <p>Little Money Technologies is a leading provider of innovative tech solutions designed specifically for the lending industry. We focus on empowering merchants by redefining their lending experience with cutting-edge technology.</p>
                            <p>Additionally, LittleMoney features a unique "Buy Now Pay Later" option, linking customers with local merchants. Here, shoppers can purchase a wide range of items using Low cost EMI, interest-free credits that are instantly available on the platform.</p>
                            <p  className="axil-btn btn-fill-primary btn-large">CIN: U70200KA2025PTC196495</p>
                        </div>
                        <div className="case-study-counterup">
                            <div className="single-counterup">
                            <h2 className="count-number">
                            {/* <TrackVisibility once>
                                {({isVisible}) => (
                                    <span className="number count">
                                        {isVisible ? <CountUp end="10" duration={1} /> : null}
                                    </span>
                                )}  
                            </TrackVisibility> */}
                            {/* <span className="symbol">+</span> */}
                            </h2>
                            {/* <span className="counter-title">Years on the market</span> */}
                            </div>
                            {/* <div className="single-counterup">
                            <h2 className="count-number">
                            <TrackVisibility once>
                                {({isVisible}) => (
                                    <span className="number count">
                                        {isVisible ? <CountUp end="1500" duration={1} /> : null}
                                    </span>
                                )}  
                            </TrackVisibility>
                            <span className="symbol">+</span>
                            </h2>
                            <span className="counter-title">Projects delivered so far</span>
                            </div> */}
                        </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    )
}

export default AboutFour;
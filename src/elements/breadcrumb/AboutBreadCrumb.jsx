import React from 'react'
import Tilty from 'react-tilty'
const PUBLIC_URL = import.meta.env.VITE_API_URL;

const AboutBreadCrumb = () => {
  return (
    <div>
        <div className="breadcrum-area breadcrumb-banner">
            <div className="container">
                <div className="section-heading heading-left">
                    <h4 className="title h2 " >Empowering Merchants with Innovative Tech Solutions</h4>
                    <h6
                        >Little Money Technologies revolutionizes the lending industry by empowering merchants with advanced, cutting-edge tech solutions.</h6>
                </div>

                <div className={`banner-thumbnail thumbnail-4`}>
                    <Tilty perspective={2000} reset={false}>
                        <img src={PUBLIC_URL + "/images/banner/about1.png"} alt="Illustration" />
                    </Tilty>
                </div>
            </div>
            <ul className="shape-group-8 list-unstyled">
                <li className="shape shape-1">
                    <img src={PUBLIC_URL + "/images/others/bubble-9.png"} alt="Bubble" />
                </li>
                <li className="shape shape-2">
                    <img src={PUBLIC_URL + "/images/others/bubble-21.png"} alt="Bubble" />
                </li>
                <li className="shape shape-3">
                    <img src={PUBLIC_URL + "/images/others/line-4.png"} alt="Line" />
                </li>
            </ul>
        </div>
    </div>
  )
}

export default AboutBreadCrumb
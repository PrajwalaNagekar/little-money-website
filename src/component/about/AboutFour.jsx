import React from "react";
import { Link } from "react-router-dom";
import CountUp from "react-countup";
import TrackVisibility from "react-on-screen";
const PUBLIC_URL = import.meta.env.VITE_API_URL;

const AboutFour = () => {
  return (
    <div className="section case-study-featured-area">
      <div className="container">
        <br />
        <br />
        <div className="row">
          <h3 className="">Little Money: Empowering Lending with Technology</h3>
          <div className="col-xl-7 col-lg-6 d-flex align-items-center justify-content-center">
            <div className="case-study-featured-thumb">
              <img
                src={PUBLIC_URL + "/images/others/AboutUs_01.jpg"}
                alt="travel"
              />
            </div>
          </div>
          <div className="col-xl-5 col-lg-6 d-flex align-items-center ">
            <div className="case-study-featured ">
              <div className=" section-heading heading-left">
                <div className="max-w-3xl mx-auto p-6 bg-white shadow-md rounded-2xl ">
                  <p className="text-justify text-gray-700 leading-relaxed tracking-wide">
                    <span className="font-semibold text-black">
                      Little Money Technologies
                    </span>{" "}
                    is a leading provider of innovative tech solutions designeda
                    specifically for the lending industry. We focus on
                    empowering merchants by redefining their lending experience
                    with cutting-edge technology.
                    <br />
                    <br />
                    Additionally,{" "}
                    <span className="font-semibold text-black">
                      LittleMoney
                    </span>{" "}
                    features a unique
                    <span className="italic"> "Buy Now Pay Later"</span> option,
                    linking customers with local merchants. Here, shoppers can
                    purchase a wide range of items using low-cost EMI and
                    interest-free credits that are instantly available on the
                    platform.
                  </p>
                </div>

                <p className="axil-btn btn-fill-primary btn-large text-center">
                  CIN: U70200KA2025PTC196495
                </p>
              </div>
              <div className="case-study-counterup">
                <div className="single-counterup">
                  <h2 className="count-number"></h2>
                </div>
              </div>
            </div>
          </div>
        </div>
        <br />
        <br />
      </div>
    </div>
  );
};

export default AboutFour;

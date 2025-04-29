import React from "react";
import { Link } from "react-router-dom";
const PUBLIC_URL = import.meta.env.VITE_API_URL;

const AboutFive = () => {
  return (
    <div className="section-padding">
      <div className="container">
        <div className="row align-items-center">
          <h3>Smart Lending for Financial Independence</h3>
          <div className="col-lg-7">
            <div className="about-team">
              {/* <div className="thumbnail"> */}
              <img
                src={PUBLIC_URL + "/images/others/AboutUs_02.jpg"}
                alt="thumbnail"
              />
              {/* </div> */}
            </div>
          </div>
          <div className="col-lg-5">
            <div className="about-team">
              <div className="section-heading heading-left">
                <div className="max-w-3xl mx-auto p-6 bg-white shadow-md rounded-2xl">
                  <span
                    className=""
                    style={{ fontFamily: 'Poppins, sans-serif', fontSize: '16px',fontWeight:'1px' }}
                  >                    Our mission is to reduce dependency on traditional lending
                    formats by providing technology-driven, customized lending
                    solutions that meet the unique needs of each consumers we
                    help foster financial independence for consumers while
                    driving sustainable growth for merchants.
                    <br />
                    <br />
                    At Little Money, we are dedicated to transforming the
                    financial landscape by offering personalized lending options
                    designed to meet the evolving needs of consumers and
                    businesses alike. Our solutions leverage cutting-edge
                    technology to ensure seamless experiences, reduce financial
                    dependency, and empower users to take control of their
                    financial journey.
                  </span>
                </div>
                {/*  */}
                {/* <Link to="#" className="axil-btn btn-large btn-fill-primary">Our Team</Link> */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutFive;

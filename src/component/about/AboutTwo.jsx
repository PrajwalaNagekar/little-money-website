import React from "react";
import FormOne from "../contact/FormOne";
import Accordion from "react-bootstrap/Accordion";
import { FaCompress, FaCode, FaGlobe } from "react-icons/fa";

const AboutTwo = ({ heading }) => {
  return (
    <div className="section-padding">
      <div className="container ">
        <div className="row d-flex justify-content-center">
          <div className="col-xl-7 col-lg-6">
            <div className="contact-form-box">
            {/* shadow-box */}
              <h4 className="text-center">Start Your Loan Application Below</h4>
              <FormOne />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutTwo;

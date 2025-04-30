import React from "react";
import Accordion from "react-bootstrap/Accordion";
import SectionTitle from "../../elements/section-title/SectionTitle";
import { FaCompress, FaCode, FaGlobe } from "react-icons/fa";
import { FaBusinessTime, FaRupeeSign } from "react-icons/fa";
import { MdOutlinePayment } from "react-icons/md";
import { BsGraphUpArrow } from "react-icons/bs";
import { Link } from "react-router-dom";

const PUBLIC_URL = import.meta.env.VITE_API_URL;
const WhyChooseThree = () => {
  return (
    <div className=" bg-color-light">
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            {/* <div className="why-choose-us"> */}
            <SectionTitle
              subtitle="About Us"
              title="Customer Benefits"
              description="Ut condimentum enim nec diam convallis mollis. Sed felis quam, semper dapibus purus sed, rhoncus ullamcorper lacus."
              textAlignment="heading-left"
              textColor=""
            />
            {/* </div> */}
          </div>
          <div className="col-lg-6">
            <div className="why-choose-us mb--30">
              <div className="why-choose-thumb">
                <img
                  src={PUBLIC_URL + "/images/about/CustomerBenifts.jpg"}
                  alt="Office"
                />
              </div>
            </div>
            {/* <Accordion >
                            <Accordion.Item eventKey="1">
                                <Accordion.Header><FaBusinessTime />
                                    Flexible Payment Options</Accordion.Header>
                                <Accordion.Body>
                                    Enjoy Personal Loans, Business Loans, and BNPL to make purchases more affordable.                            </Accordion.Body>
                            </Accordion.Item>
                            <Accordion.Item eventKey="2">
                                <Accordion.Header><FaRupeeSign /> Quick and Easy Access to Funds</Accordion.Header>
                                <Accordion.Body>
                                    Get loans approved through a fully digital process with no collateral required                            </Accordion.Body>
                            </Accordion.Item>
                            <Accordion.Item eventKey="3">
                                <Accordion.Header><MdOutlinePayment /> Low-Cost EMI</Accordion.Header>
                                <Accordion.Body>
                                    Opt for affordable monthly installments to pay off purchases without financial strain.                            </Accordion.Body>
                            </Accordion.Item>
                        </Accordion>
                        <br />
                        <div className="form-group">

                            <button className="axil-btn btn-fill-primary btn-primary"
                            >
                                Customer Login
                            </button>
                        </div> */}

            {/* <Link to='/merchant-login'><button className="axil-btn " id='btn-pl'>
                                    Merchant Login
                                </button></Link> */}
            {/* </div> */}
          </div>
          <div className="col-lg-6 d-flex align-items-center">
            <div className="why-choose-us ">
              {/* <div className="why-choose-us mb--30">
                            <div className="why-choose-thumb">
                                <img src={PUBLIC_URL + "/images/about/CustomerBenifts.jpg"} alt="Office" />                            </div>
                        </div> */}
              <Accordion>
                <Accordion.Item eventKey="1">
                  <Accordion.Header>
                    <FaBusinessTime />
                    Flexible Payment Options
                  </Accordion.Header>
                  <Accordion.Body>
                    Enjoy Personal Loans, Business Loans, and BNPL to make
                    purchases more affordable.{" "}
                  </Accordion.Body>
                </Accordion.Item>
                <Accordion.Item eventKey="2">
                  <Accordion.Header>
                    <FaRupeeSign /> Quick and Easy Access to Funds
                  </Accordion.Header>
                  <Accordion.Body>
                    Get loans approved through a fully digital process with no
                    collateral required{" "}
                  </Accordion.Body>
                </Accordion.Item>
                <Accordion.Item eventKey="3">
                  <Accordion.Header>
                    <MdOutlinePayment /> Low-Cost EMI
                  </Accordion.Header>
                  <Accordion.Body>
                    Opt for affordable monthly installments to pay off purchases
                    without financial strain.{" "}
                  </Accordion.Body>
                </Accordion.Item>
              </Accordion>
              <br />
              {/* <div className="form-group">
                <button className="axil-btn btn-fill-primary btn-primary">
                  Customer Login
                </button>
              </div> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WhyChooseThree;

import React from 'react';
import Accordion from 'react-bootstrap/Accordion';
import SectionTitle from '../../elements/section-title/SectionTitle';
import { FaCompress, FaCode, FaGlobe } from 'react-icons/fa';
const PUBLIC_URL = import.meta.env.VITE_API_URL;
import { BsGraphUpArrow } from "react-icons/bs";
import { BiSolidPurchaseTag } from "react-icons/bi";
import { FaRegHandshake } from "react-icons/fa";
import { Link } from 'react-router-dom';


const WhyChooseOne = () => {
    return (
        <div className="section-padding bg-color-light">
            <div className="container">
                <div className="row">
                    <div className="col-lg-6">
                        <div className="why-choose-us">
                            <SectionTitle
                                subtitle="About Us"
                                title="Merchant Benefits"
                                description="Ut condimentum enim nec diam convallis mollis. Sed felis quam, semper dapibus purus sed, rhoncus ullamcorper lacus."
                                textAlignment="heading-left"
                                textColor=""
                            />
                            <Accordion defaultActiveKey="1">
                                <Accordion.Item eventKey="1">
                                    <Accordion.Header><BsGraphUpArrow /> Increased Sales</Accordion.Header>
                                    <Accordion.Body>
                                        Access to a wide customer base, offering flexible financing options like Personal and Business Loans.                            </Accordion.Body>
                                </Accordion.Item>
                                <Accordion.Item eventKey="2">
                                    <Accordion.Header><BiSolidPurchaseTag /> Revenue Boost</Accordion.Header>
                                    <Accordion.Body>
                                        Enable customers to use Buy Now Pay Later (BNPL) services, encouraging larger purchases and increasing conversion rates                            </Accordion.Body>
                                </Accordion.Item>
                                <Accordion.Item eventKey="3">
                                    <Accordion.Header><FaRegHandshake /> Easy Loan Management</Accordion.Header>
                                    <Accordion.Body>
                                        Streamlined loan approval and repayment processes with a user-friendly platform.                            </Accordion.Body>
                                </Accordion.Item>
                            </Accordion>
                            <br />
                            <div className=''>
                                <Link to='/contact' className=''><button className="axil-btn btn-fill-primary btn-fluid btn-primary w-auto "  id='btn-verify'>
                                    Contact us to sign up
                                </button></Link>
                                <Link to='#'><button className="axil-btn btn-fill-primary btn-fluid btn-primary w-auto"  id='btn-verify'>
                                         Merchant Login
                                </button></Link>
                            </div>
                        </div>

                    </div>

                    <div className="col-xl-5 ">
                        <div className="why-choose-us mb--30">
                            <div className="why-choose-thumb">
                                <img src={PUBLIC_URL + "/images/about/m-benefits.jpeg"} alt="Office" />
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>

    )
}

export default WhyChooseOne;
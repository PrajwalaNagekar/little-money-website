import React, { useEffect, useState } from 'react';
import { AnimationOnScroll } from 'react-animation-on-scroll';
import { Link } from 'react-router-dom';
const PUBLIC_URL = import.meta.env.VITE_API_URL;
import { BsGraphUpArrow } from "react-icons/bs";
import { BiSolidPurchaseTag } from "react-icons/bi";
import { FaRegHandshake } from "react-icons/fa";
import { FaRegCreditCard, FaCheckCircle, FaMoneyBillWaveAlt, FaClock, FaFileContract, FaSyncAlt, FaWallet, FaRegCheckCircle, FaHandHoldingUsd } from "react-icons/fa";


const BannerTwo = () => {
    const slides = [
        { image: "/images/banner/carousel6.jpeg", title: "Personal Loans", icon1: <FaRegCreditCard style={{ color: "white" }} />, icon2: <FaCheckCircle style={{ color: "white" }} />, icon3: <FaMoneyBillWaveAlt style={{ color: "white" }} />, subtitle1: "Flexible Loan Options",link: "/project-grid-one", subtitle2: "Quick Approval Process", link: "/personal-loans", subtitle3: "Instant Fund Transfer", link: "/personal-loans", button: "Apply Now",statement:"Get quick and easy personal loans with flexible repayment terms." },
        { image: "/images/banner/carousel1.jpeg", title: "Business Loans", icon1: <FaClock style={{ color: "white" }}  />, icon2: <FaFileContract style={{ color: "white" }}  />, icon3: <FaSyncAlt style={{ color: "white" }}  />, subtitle1:"Instant Onboarding", subtitle2: "No Hidden Charges", subtitle3: "Flexible Repayments", link: "/business-loans", button: "Apply Now",statement:"Fast and flexible loans to help your business grow with tailored repayment plans."  },
        { image: "/images/banner/carousel4.jpeg", title: "Buy Now Pay Later", icon1: <FaWallet style={{ color: "white" }} />, icon2: <FaRegCheckCircle style={{ color: "white" }}  />, icon3: <FaHandHoldingUsd style={{ color: "white" }}  />, subtitle1: "Flexible Payment Plans ", subtitle2: "Easy Monthly Payments ", subtitle3: "Instant EMI Approval ", link: "/contact", button: "Contact us",statement:"Shop now and pay later with easy, low-cost installment options."  },
    ];
    const [currentIndex, setCurrentIndex] = useState(0);
    // const nextSlide = () => {
    //     setCurrentIndex((prevIndex) => (prevIndex + 1) % slides.length);
    // };

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentIndex((prevIndex) => (prevIndex + 1) % slides.length);
        }, 3000);

        return () => clearInterval(interval); // Cleanup on unmount
    }, []);

    // const prevSlide = () => {
    //     setCurrentIndex((prevIndex) => (prevIndex - 1 + slides.length) % slides.length);
    // };
    return (

        <div
  className="banner banner-style-2 responsive-banner"
  style={{
    backgroundImage: `url(${slides[currentIndex].image})`,
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
    backgroundPosition: "center",
  }}
>
  <div className="relative"></div>

  <div className="container-fluid">
    <div className="row align-items-center">
      <div className="col-lg-6">
        <div className="banner-content">
          <h1 className="title">{slides[currentIndex].title}</h1>
          <h4 style={{ color: "white" }}>{slides[currentIndex].statement}</h4>

          <div className="icon-carousel">
            <div className="icon1">
              <h4>{slides[currentIndex].icon1}</h4>
              <h6 style={{ color: "white" }}>{slides[currentIndex].subtitle1}</h6>
              
            </div>
            <div className="icon2">
              <h4>{slides[currentIndex].icon2}</h4>
              <h6 style={{ color: "white" }}>{slides[currentIndex].subtitle2}</h6>
            </div>
          </div>

          <Link to={slides[currentIndex].link} className="axil-btn btn-fill-white btn-large">
            {slides[currentIndex].button}
          </Link>
        </div>
      </div>
    </div>
  </div>
</div>

    )
}

export default BannerTwo; 
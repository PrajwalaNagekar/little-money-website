import React, { useEffect, useState } from "react";
import { Carousel } from "react-bootstrap";
import {
  FaRegCreditCard,
  FaCheckCircle,
  FaMoneyBillWaveAlt,
} from "react-icons/fa";
import "bootstrap/dist/css/bootstrap.min.css";
import { Link } from "react-router-dom";

// Define slides for different screen sizes with title, icons, subtitles, and links
const largeScreenSlides = [
  {
    image: "/images/banner/Banners_01.jpg",
    title: "Personal Loans",
    statement:
      "Get quick and easy personal loans with flexible repayment terms.",
    icon1: <FaRegCreditCard style={{ color: "white" }} />,
    icon2: <FaCheckCircle style={{ color: "white" }} />,
    icon3: <FaMoneyBillWaveAlt style={{ color: "white" }} />,
    subtitle1: "Multiple Loan Offers",
    subtitle2: "Quick Approval Process",
    subtitle3: "Instant Fund Transfer",
    statement:
      "Get quick and easy personal loans with flexible repayment terms.",

    button: "Apply Now",
    link: "/personal-loan",
  },
  {
    image: "/images/banner/Banners_02.jpg",
    title: "Business Loans",
    statement:
      "Fast and flexible loans to help your business grow with tailored repayment plans.",
    icon1: <FaRegCreditCard style={{ color: "white" }} />,
    icon2: <FaCheckCircle style={{ color: "white" }} />,
    icon3: <FaMoneyBillWaveAlt style={{ color: "white" }} />,
    subtitle1: "Instant Onboarding",
    subtitle2: "No Hidden Charges",
    subtitle3: "Flexible Repayments",
    statement:
      "Fast and flexible loans to help your business grow with tailored repayment plans.",

    button: "Apply Now",
    link: "/business-loan",
  },
  {
    image: "/images/banner/Banners_03.jpg",
    title: "Buy Now Pay Later",
    statement:
      "Shop now and pay later with easy, low-cost installment options.",
    icon1: <FaRegCreditCard style={{ color: "white" }} />,
    icon2: <FaCheckCircle style={{ color: "white" }} />,
    icon3: <FaMoneyBillWaveAlt style={{ color: "white" }} />,
    subtitle1: "Flexible Payment Plans",
    subtitle2: "Easy Monthly Payments",
    subtitle3: "Instant EMI Approval ",
    statement:
      "Shop now and pay later with easy, low-cost installment options.",

    button: "Contact Us",
    link: "/contact",
  },
];

const smallScreenSlides = [
  {
    image: "/images/banner/Banners_Mobile_01.jpg",

    title: "Personal Loans",
    icon1: <FaRegCreditCard style={{ color: "white" }} />,
    icon2: <FaCheckCircle style={{ color: "white" }} />,
    icon3: <FaMoneyBillWaveAlt style={{ color: "white" }} />,
    subtitle1: "Multiple Loan Offers",
    subtitle2: "Quick Approval Process",
    subtitle3: "Instant Fund Transfer",
    statement:
      "Get quick and easy personal loans with flexible repayment terms.",

    button: "Apply Now",
    link: "/personal-loan",
  },
  {
    image: "/images/banner/Banners_Mobile_02.jpg",
    title: "Business Loans",
    icon1: <FaRegCreditCard style={{ color: "white" }} />,
    icon2: <FaCheckCircle style={{ color: "white" }} />,
    icon3: <FaMoneyBillWaveAlt style={{ color: "white" }} />,
    subtitle1: "Instant Onboarding",
    subtitle2: "No Hidden Charges",
    subtitle3: "Flexible Repayments",
    statement:
      "Get quick and easy personal loans with flexible repayment terms.",

    button: "Apply Now",
    link: "/business-loan",
  },
  {
    image: "/images/banner/Banners_Mobile_03.jpeg",
    title: "Buy Now Pay Later",
    icon1: <FaRegCreditCard style={{ color: "white" }} />,
    icon2: <FaCheckCircle style={{ color: "white" }} />,
    icon3: <FaMoneyBillWaveAlt style={{ color: "white" }} />,
    subtitle1: "Flexible Payment Plans",
    subtitle2: "Easy Monthly Payments",
    subtitle3: "Instant EMI Approval",
    statement:
      "Get quick and easy personal loans with flexible repayment terms.",

    button: "Contact Us",
    link: "/contact",
  },
];

const BannerTwo = () => {
  const [slides, setSlides] = useState(largeScreenSlides);
  const [isSmallScreen, setIsSmallScreen] = useState(window.innerWidth < 769);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 769) {
        setSlides(smallScreenSlides);
        setIsSmallScreen(true);
      } else {
        setSlides(largeScreenSlides);
        setIsSmallScreen(false);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="w-100 section">
      <br />
      <br />
      {/* <br /> */}
      {/* <Carousel>
        {slides.map((slide, index) => (
          <Carousel.Item key={index}>
            <img
              // className="d-block w-100 vh-100 object-fit-cover"
              className='img-fluid w-100'
              src={slide.image}
              alt={`Slide ${index + 1}`}
            />
            <Carousel.Caption className={isSmallScreen ? "small-caption" : "large-caption"} >
              {slide.title && <h3 className="mb-3 text-white ">{slide.title}</h3>}
              <h6 className='text-white text-left'>{slide.statement}</h6>
              <div className="icon-subtitle mt-3">

                <div >
                  <h6>{slide.icon1}</h6> <h6 className="text-white">{slide.subtitle1}</h6>
                </div>
                <div>
                  <h6>{slide.icon2} </h6><h6 className="text-white">{slide.subtitle2}</h6>
                </div>
                <div>
                  <h6> {slide.icon3}</h6> <h6 className="text-white">{slide.subtitle3}</h6>
                </div>
                <div>
                  <Link to={slide.link}> <button className="axil-btn btn-fill-white">{slide.button} </button> </Link>
                </div>

              </div>
            </Carousel.Caption>
          </Carousel.Item>
        ))}
      </Carousel> */}
      <Carousel>
        {slides.map((slide, index) => (
          <Carousel.Item key={index}>
            <img
              className="img-fluid w-100 object-fit-cover"
              style={{ height: "80vh" }}
              src={slide.image}
              alt={`Slide ${index + 1}`}
            />
            <Carousel.Caption
              className={isSmallScreen ? "small-caption" : "large-caption"}
            >
              {/* {slide.title && (
                <h3 className="mb-3 text-white fw-bold display-6 display-md-4">
                  {slide.title}
                </h3>
              )} */}
              {slide.title && (
                <h3 className="mb-3 text-white fw-bold display-6 display-md-4 text-start text-md-start">
                  {slide.title}
                </h3>
              )}
              <h6 className="text-white mb-3 fs-6 fs-md-5 text-start">
                {slide.statement}
              </h6>

              <div className="icon-subtitle d-flex flex-column gap-2 mt-3">
                <div className="d-flex align-items-center gap-2">
                  <span className="fs-5">{slide.icon1}</span>
                  <span className="text-white">{slide.subtitle1}</span>
                </div>
                <div className="d-flex align-items-center gap-2">
                  <span className="fs-5">{slide.icon2}</span>
                  <span className="text-white">{slide.subtitle2}</span>
                </div>
                <div className="d-flex align-items-center gap-2">
                  <span className="fs-5">{slide.icon3}</span>
                  <span className="text-white">{slide.subtitle3}</span>
                </div>

                <Link to={slide.link}>
                  <button className="axil-btn btn-fill-white mt-3">
                    {slide.button}
                  </button>
                </Link>
              </div>
            </Carousel.Caption>
          </Carousel.Item>
        ))}
      </Carousel>
    </div>
  );
};

export default BannerTwo;

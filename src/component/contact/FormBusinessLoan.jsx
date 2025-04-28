import React, { useEffect, useRef, useState } from "react";
import emailjs from "@emailjs/browser";
import Alert from "react-bootstrap/Alert";
import { SlRefresh } from "react-icons/sl";
import { Link, useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import ReCAPTCHA from "react-google-recaptcha";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { FaPhoneAlt } from "react-icons/fa";
import { FaUser } from "react-icons/fa";
import '@fortawesome/fontawesome-free/css/all.min.css';
import { sendOtp } from "../../api/Website";
import * as Yup from "yup";
import FullScreenLoader from "../loader/FullScreenLoader";

// const siteKey = "6Lf-7QErAAAAADzjQav9bD3tYYWy6JZylKhMTiGu";
const Result = () => {
  return (
    <Alert variant="success" className="success-msg">
      OTP sent successfully.
    </Alert>
  );
};
const captchaResult = () => {
  return (
    <Alert variant="success" className="success-msg">
      please enter captcha
    </Alert>
  );
};

const FormBusinessLoan = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const { referralCode } = useParams();
  // console.log("referralCode from URL:", referralCode);

  const [captchaValue, setCaptchaValue] = useState(null);

  const handleCaptchaChange = (value) => {
    setCaptchaValue(value);
  };
  const finalReferralCode = referralCode || undefined; // Set to undefined if no referral code exists


  // You can store the referralCode in localStorage if it's found for future use

  const SubmittedForm = Yup.object().shape({
    mobileNumber: Yup.string()
      .required("Enter your Mobile Number")
      .matches(/^[6-9][0-9]{9}$/, "Enter a valid 10-digit mobile number"),
    firstName: Yup.string()
      .trim()
      .matches(/^[A-Za-z]+$/, "Only alphabets are allowed, no spaces")
      .required("Enter your First Name"),
    lastName: Yup.string()
      .trim()
      .matches(/^[A-Za-z]+$/, "Only alphabets are allowed, no spaces")
      .required("Enter your Last Name"),
    referal: Yup.string().notRequired(),
    option1: Yup.bool().oneOf([true], "You must agree before submitting."),
    option2: Yup.bool().oneOf([true], "You must agree before submitting."),
  });

  return (
    <>
      <Formik
        initialValues={{
          mobileNumber: "",
          firstName: "",
          lastName: "",
          option1: false,
          option2: false,
        }}
        validationSchema={SubmittedForm}
        onSubmit={async (values) => {
          try {
            // console.log(values)
            const data = {
              mobileNumber: values.mobileNumber,
              firstName: values.firstName,
              lastName: values.lastName,
              referal: localStorage.getItem("referralCode") || "",
            };
            setLoading(true);

            const response = await sendOtp({ mobileNumber: data.mobileNumber });
            // console.log(data.mobileNumber)

            if (response?.success) {

              // console.log("Form submitted with referral code:", finalReferralCode);

              if (finalReferralCode) {

                navigate(`/bl-verification/${finalReferralCode}`, {
                  state: data
                });
              } else {
                navigate(`/bl-verification`, {
                  state: data
                });

              }

            } else {
              console.error("SMS send failed:", response?.error);
            }

          } catch (error) {
            console.error("API Error:", error);
          }
          setLoading(false);

        }}


      >
        {({ errors, submitCount, touched }) => (
          <Form className="space-y-5">
            <div className="form-group">
              <label htmlFor="mobileNumber">Enter your Mobile Number</label>

              <div className="input-icon-container" style={{ position: "relative" }}>
                <i
                  className="fa fa-phone"
                  style={{
                    position: "absolute",
                    top: "50%",
                    left: "10px",
                    transform: "translateY(-50%)",
                    color: "#aaa",
                  }}
                />
                <Field
                  name="mobileNumber"
                  type="tel"
                  maxLength={10}
                  onInput={(e) => {
                    e.target.value = e.target.value.replace(/\D/g, "").slice(0, 10);
                  }}
                  id="mobileNumber"
                  placeholder="XXX-XXX-XXXX"
                  className="form-control"
                  style={{ paddingLeft: "35px" }} // adjust space for icon
                />
                {/* <ErrorMessage name="mobileNumber" component="div" className="text-danger" /> */}
              </div>
              {/* <Field
                name="mobileNumber"
                type="tel"
                id="mobileNumber"
                placeholder="XXX-XXX-XXXX"
                className="form-control"
              /> */}
              {submitCount > 0 && errors.mobileNumber && (
                <div className="text-danger mt-1">{errors.mobileNumber}</div>
              )}
            </div>
            <div className="form-group">
              <label htmlFor="firstName">First Name</label>
              <div style={{ position: "relative" }}>
                <i
                  className="fas fa-user"
                  style={{
                    position: "absolute",
                    top: "50%",
                    left: "10px",
                    transform: "translateY(-50%)",
                    color: "#aaa",
                    zIndex: 2,
                  }}
                />
                <Field
                  name="firstName"
                  type="text"
                  id="firstName"
                  className="form-control"
                  style={{ paddingLeft: "35px" }}
                  onKeyDown={(e) => {
                    const allowedKeys = [
                      "Backspace",
                      "ArrowLeft",
                      "ArrowRight",
                      "Tab",
                      "Delete",
                      "Shift",
                    ];
                    const regex = /^[a-zA-Z ]$/;
                    if (!regex.test(e.key) && !allowedKeys.includes(e.key)) {
                      e.preventDefault();
                    }
                  }}
                />
              </div>
              {submitCount > 0 && errors.firstName && (
                <div className="text-danger mt-1">{errors.firstName}</div>
              )}
            </div>

            <div className="form-group">
              <label htmlFor="lastName">Last Name</label>
              <div style={{ position: "relative" }}>
                <i
                  className="fas fa-user"
                  style={{
                    position: "absolute",
                    top: "50%",
                    left: "10px",
                    transform: "translateY(-50%)",
                    color: "#aaa",
                    zIndex: 2,
                  }}
                />
                <Field
                  name="lastName"
                  type="text"
                  id="lastName"
                  className="form-control"
                  style={{ paddingLeft: "35px" }}
                  onKeyDown={(e) => {
                    const allowedKeys = [
                      "Backspace",
                      "ArrowLeft",
                      "ArrowRight",
                      "Tab",
                      "Delete",
                      "Shift",
                    ];
                    const regex = /^[a-zA-Z ]$/;
                    if (!regex.test(e.key) && !allowedKeys.includes(e.key)) {
                      e.preventDefault();
                    }
                  }}
                />
              </div>
              {submitCount > 0 && errors.lastName && (
                <div className="text-danger mt-1">{errors.lastName}</div>
              )}
            </div>



            {/* <div className="form-group">
              <label htmlFor="referal">Referral Code</label>
              <Field
                name="referal"
                type="text"
                id="referal"
                placeholder="Enter Referral Code"
                className="form-control"
              />
              {submitCount > 0 && errors.referal && (
                <div className="text-danger mt-1">{errors.referal}</div>
              )}
            </div> */}

            <div class="form-group">
              <div className="checkbox-container">
                <Field
                  name="option1"
                  type="checkbox"
                  id="option1"
                  className="form-checkbox"
                />
                <label
                  htmlFor="option1"
                  className="text-white-dark font-semibold text-justify"
                  style={{ textAlign: "justify", display: "block" }}
                >
                  I have read, understood, and agreed to the{" "}
                  <Link to="/terms-use" target="_blank">Terms & Conditions</Link> and{" "}
                  <Link to="/privacy-policy" target="_blank">Privacy Policy</Link> of Little Money Technologies Pvt. Ltd.
                  {submitCount > 0 && errors.option1 && (
                    <div className="text-danger mt-1">{errors.option1}</div>
                  )}
                </label>
              </div>
              <div className="checkbox-container">
                <Field
                  name="option2"
                  type="checkbox"
                  id="option2"
                  className="form-checkbox"
                />
                <label
                  htmlFor="option2"
                  className="text-white-dark font-semibold"
                  style={{ textAlign: "justify", display: "block" }}
                >
                  I consent to Little Money communicating with me via email,
                  SMS, WhatsApp, RCS, or call; and also sharing promotional
                  offers.
                  {submitCount > 0 && errors.option2 && (
                    <div className="text-danger mt-1">{errors.option2}</div>
                  )}
                </label>
              </div>
            </div>
            {/* <ReCAPTCHA sitekey={siteKey} onChange={handleCaptchaChange} /> */}
            <div className="form-group">
              <button
                type="submit"
                className="axil-btn btn-fill-primary btn-fluid btn-primary "
                disabled={loading}
              >

                {loading ? (
                  <FullScreenLoader />
                ) : (
                  'Send OTP  '
                )}
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </>
  );
};

export default FormBusinessLoan
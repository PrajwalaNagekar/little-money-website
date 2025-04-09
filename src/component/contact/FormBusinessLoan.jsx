import React, { useRef, useState } from "react";
import emailjs from "@emailjs/browser";
import Alert from "react-bootstrap/Alert";
import { SlRefresh } from "react-icons/sl";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import ReCAPTCHA from "react-google-recaptcha";
import { Field, Form, Formik } from "formik";
import * as Yup from "yup";

const siteKey = "6Lf-7QErAAAAADzjQav9bD3tYYWy6JZylKhMTiGu";
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

  const [captchaValue, setCaptchaValue] = useState(null);

  const handleCaptchaChange = (value) => {
    setCaptchaValue(value);
  };

  const SubmittedForm = Yup.object().shape({
    mobileNumber: Yup.string()
      .required("Please fill the Field")
      .matches(/^[6-9][0-9]{9}$/, "Enter a valid 10-digit mobile number"),
     firstName: Yup.string()  .matches(/^[A-Za-z ]*$/, "Only alphabets and spaces are allowed"),
        lastName: Yup.string()  .matches(/^[A-Za-z ]*$/, "Only alphabets and spaces are allowed").
        required("Please fill the Field"),
    referal: Yup.string().notRequired(),
    option1: Yup.bool().oneOf([true], "You must agree before submitting."),
    option2: Yup.bool().oneOf([true], "You must agree before submitting."),
  });
  return (
    <>
      <div className="section-padding">
        <div className="container ">
          <div className="row d-flex justify-content-center">
            <div className="col-xl-7 col-lg-6">
              <div className="contact-form-box ">
                <h4 className=" text-center">Start Your Loan Application Below
                </h4>
                <Formik
                  initialValues={{
                    mobileNumber: "",
                    firstName: "",
                    lastName: "",
                    referal: "",
                    option1: false,
                    option2: false,
                  }}
                  validationSchema={SubmittedForm}
                  onSubmit={(values) => {


                    console.log(values.firstName);


                    setTimeout(() => {
                      navigate("/business-loan/verification"); // Redirect
                    }, 2000);
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
                            name="firstname"
                            type="text"
                            id="firstname"
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
              placeholder="Enter Referal Code"
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
                            className="text-white-dark font-semibold"
                            style={{ textAlign: "justify", display: "block" }}
                          >
                            I have read, understood, and agreed to the{" "}
                            <Link to="#">Terms of Service</Link> and{" "}
                            <Link to="#">Privacy Policy</Link> of Little Money.
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
                          className="axil-btn btn-fill-primary btn-fluid btn-primary"
                        >
                          Send OTP
                        </button>
                      </div>
                    </Form>
                  )}
                </Formik>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>)
}

export default FormBusinessLoan
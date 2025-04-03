import React, { useRef, useState } from 'react'
import { Navigate, useNavigate } from "react-router-dom";

const OtpVerify1 = () => {
  const navigate = useNavigate();

  const form = useRef();
  const STATIC_OTP = "555555"; 
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [message, setMessage] = useState("");
  const handleChange = (index, e) => {
    const value = e.target.value;
    if (isNaN(value)) return;

    let newOtp = [...otp];
    newOtp[index] = value.substring(value.length - 1);
    setOtp(newOtp);


    if (value && index < 6) {
      document.getElementById(`otp-${index + 1}`).focus();
    }

  };
  const handleVerify = (e) => {
    e.preventDefault();
    const enteredOtp = otp.join("");

    if (enteredOtp === STATIC_OTP) {
      setMessage("OTP Verified Successfully!");
      setTimeout(() => {
        navigate("/user-details"); // Redirect
      }, 2000);
    } else {
      setMessage("Incorrect OTP. Please try again.");

    }
  };
  return (

    <div className="section-padding">
      <div className="container">
        <div className="row d-flex justify-content-center">
          <div className="col-xl-7 col-lg-6">

            <div className="contact-form-box shadow-box mb--30">
              <form ref={form} className="" onSubmit={handleVerify}>
                <div className="form-group ">
                  <h5 >Enter your OTP for verification</h5>
                  <div className="otp-box">
                    {otp.map((digit, index) => (
                      <input
                        key={index}
                        id={`otp-${index}`}
                        type="text"
                        maxLength="1"
                        value={digit}
                        onChange={(e) => handleChange(index, e)}
                      />

                    ))}
                    {/* <button type="submit" className="btn btn-primary">Verify OTP</button> */}
                  </div>
                </div>
                <div className="container">
                  <button type="submit" className="btn btn-primary " id='btn-verify'>Verify OTP</button>
                </div>
                {message && <p className="message">{message}</p>}
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default OtpVerify1
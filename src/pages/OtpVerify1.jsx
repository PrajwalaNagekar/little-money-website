import React, { useRef, useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";

const OtpVerify1 = () => {
  const navigate = useNavigate();
  const form = useRef();
  const STATIC_OTP = "555555";

  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [resendEnabled, setResendEnabled] = useState(false);
  const [otpResent, setOtpResent] = useState(false);
  // const [phoneNumber] = useState("9876543210");

  const [countdown, setCountdown] = useState(); // 75 seconds countdown

  // Countdown timer logic
  useEffect(() => {
    let timer;
    if (countdown > 0) {
      setResendEnabled(false);
      timer = setInterval(() => {
        setCountdown(prev => prev - 1);
      }, 1000);
    } else {
      setResendEnabled(true);
    }
    return () => clearInterval(timer);
  }, [countdown]);

  const handleChange = (index, e) => {
    const value = e.target.value;
    if (isNaN(value)) return;

    let newOtp = [...otp];
    newOtp[index] = value.substring(value.length - 1);
    setOtp(newOtp);

    if (value && index < 5) {
      document.getElementById(`otp-${index + 1}`).focus();
    }
  };

  const handleVerify = (e) => {
    e.preventDefault();
    const enteredOtp = otp.join("");
    setLoading(true);
    setMessage("");

    setTimeout(() => {
      if (enteredOtp === STATIC_OTP) {
        setMessage("OTP Verified Successfully!");
        setLoading(false);

        // setTimeout(() => {
          navigate("/personal-loan/verification/user-details");
        // }, 2);
      } else {
        setMessage("Incorrect OTP. Please try again.");
        setLoading(false);
      }
    }, 1500);
  };

  const handleResendOtp = () => {
    setOtp(["", "", "", "", "", ""]);
    setOtpResent(true);
    setMessage(`OTP resent successfully `);
    setCountdown(5); // Restart timer
  };

  return (
    <div className="section-padding">
      <div className="container">
        <div className="row d-flex justify-content-center">
          <div className="col-xl-7 col-lg-6">
            <div className="contact-form-box">
              <form ref={form} onSubmit={handleVerify}>
                <div className="form-group">
                  <h5 className='text-center'>Enter your verification code</h5>
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
                  </div>
                </div>

                <div className="container text-center ">
                  <button
                    type="submit"
                    className="btn btn-primary text-center w-fixed"
                    id="btn-verify"
                    onClick={handleVerify}
                    disabled={loading}
                  >
                    {loading ? (
                      <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                    ) : (
                      'Verify OTP  '
                    )}
                  </button>
                </div>

                <br />
                {message && <p className="message text-center">{message}</p>}

                <div className="container text-center mt-2">
                  <button
                  type='button'
                    className="btn btn-primary text-center w-fixed"
                    onClick={handleResendOtp}
                    disabled={!resendEnabled}
                  >
                    {resendEnabled
                      ? "Resend OTP"
                      : `Resend OTP in ${String(Math.floor(countdown / 60)).padStart(1, '0')}:${String(countdown % 60).padStart(2, '0')}`}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OtpVerify1;

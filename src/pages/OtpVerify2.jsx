import React, { useRef, useState, useEffect } from 'react';
import { useNavigate, useParams } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { lead, verifyOtp } from '../api/Website/index'
import { sendOtp } from '../api/Website/index'
import { getOffersByLeadId } from '../api/Website/index'
import FullScreenLoader from '../component/loader/FullScreenLoader';

const OtpVerify2 = () => {
  const { referralCode } = useParams();

  const navigate = useNavigate();
  const location = useLocation();
  const data = location.state;
  // console.log("Received user data:", data);
  // console.log("Received user data:mobile number", data.mobileNumber);


  // const [referralCode, setReferralCode] = useState(null);
  // useEffect(() => {
  //   const code = localStorage.getItem("referral_code");
  //   setReferralCode(code);
  // }, []);

  const form = useRef();
  const STATIC_OTP = "555555";

  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [resendEnabled, setResendEnabled] = useState(false);
  const [otpResent, setOtpResent] = useState(false);
  // const [phoneNumber] = useState("9876543210");

  const [countdown, setCountdown] = useState(); // 75 seconds countdown


  useEffect(() => {
    setCountdown(75); // or 60 for 1 min
  }, []);

  useEffect(() => {
    let timer;
    if (countdown > 0) {
      setResendEnabled(false);
      timer = setInterval(() => {
        setCountdown((prev) => prev - 1);
      }, 1000);
    } else {
      setResendEnabled(true);
    }

    return () => clearInterval(timer); // cleanup
  }, [countdown]);


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

  const finalReferralCode = referralCode || localStorage.getItem("referralCode");
  // console.log(finalReferralCode);


  // useEffect(() => {
  //   if (finalReferralCode) {
  //     localStorage.setItem("referral_code", finalReferralCode);
  //   }
  // }, [finalReferralCode]);
  const handleVerify = async (e) => {
    e.preventDefault();
    const enteredOtp = otp.join("");
    setLoading(true);
    setMessage("");

    const result = await verifyOtp(data.mobileNumber, enteredOtp);
    // console.log("🚀 ~ handleVerify ~ enteredOtp:", enteredOtp)
    // console.log("🚀 ~ handleVerify ~ mobileNumber:", data.mobileNumber)
    // console.log("result from verify otp api", result)
    // console.log(result.createdAt);
    const createdAt = new Date(result.createdAt);
    const now = new Date();

    const daysSinceCreation = (now - createdAt) / (1000 * 60 * 60 * 24); // Difference in days
    // console.log("User created", daysSinceCreation.toFixed(1), "days ago");

    if (result.success) {
      if (daysSinceCreation > 30) {
        navigate(`/business-detail`, { state: data });
        return;
      }
      if (result.leadId) {
        const leadId = result.leadId;
        // console.log("leadId in otp verify2", leadId);
        localStorage.setItem("ExistingLeadInLocal", leadId)
        const ExistingLeadFromLocal = localStorage.getItem('ExistingLeadInLocal')
        // console.log("ExistingLeadFromLocal", ExistingLeadFromLocal);

        const offersResponse = await getOffersByLeadId(leadId);
        const offers = offersResponse.offers;
        // console.log("offersResponse", offers);
        if (finalReferralCode) {
          navigate(`/business-detail/offers/${finalReferralCode}`, {
            state: { ...data, offers, ExistingLeadFromLocal },
          });
        } else {
          navigate(`/business-detail/offers`, {
            state: { ...data, offers, ExistingLeadFromLocal },
          });
        }
      } else {
        // If no leadId but user is valid, go to user-details
        // console.log("this is else");

        if (finalReferralCode) {
          navigate(`/business-detail/${finalReferralCode}`, { state: data });
        } else {
          console.log("this is else");
          navigate(`/business-detail`, { state: data });
        }
      }
    } else {
      setMessage(result.message);
    }
    setLoading(false);
  };


  const handleResendOtp = async (e) => {
    console.log("gkjb")
    setOtpResent(true);
    setMessage(`OTP resent successfully `);
    setCountdown(2); // Restart timer

    // const result = await verfyOtp(data.mobileNumber, enteredOtp);

    try {
      console.log(data.mobileNumber);

      const result = await sendOtp({ mobileNumber: data.mobileNumber }); // Make sure you have sendOtp function

      if (!result.success) {
        setMessage(result.message || "Failed to resend OTP");
      }
    } catch (error) {
      console.error("Resend OTP error:", error);
      setMessage("Something went wrong while resending OTP");
    }
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
                  <p className='text-center'>    OTP sent to the Phone Number +91 {data.mobileNumber ? `******${data.mobileNumber.slice(-4)}` : 'Invalid number'}
                  </p>
                  <div className="otp-box">
                    {otp.map((digit, index) => (
                      <input
                        key={index}
                        id={`otp-${index}`}
                        type="tel"
                        maxLength="1"
                        value={digit}
                        onChange={(e) => handleChange(index, e)}
                      />
                    ))}
                  </div>
                </div>

                <div className="container text-center">
                  <button
                    type="submit"
                    className="axil-btn btn-fill-primary text-center w-fixed w-50"
                    id="btn-verify"
                    onClick={handleVerify}
                    disabled={loading}
                  >
                    {loading ? (
                      <FullScreenLoader />
                    ) : (
                      'Verify OTP  '
                    )}
                  </button>
                </div>

                <br />
                {message && <p className="message text-center">{message}</p>}

                <div className="container text-center mt-2">

                  <p>Didn't get the OTP?</p>
                  <button
                    type='button'
                    className="axil-btn btn-fill-primary text-center w-fixed w-50"
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

export default OtpVerify2
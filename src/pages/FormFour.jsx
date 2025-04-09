import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const FormFour = () => {
  const navigate = useNavigate();
  const [registrationType, setRegistrationType] = useState("");
  const [formData, setFormData] = useState({
    pan: "",
    email: "",
    pincode: "",
    city: "",
    residence: "",
    turnover: "",
    yearsInBusiness: "",
    currentAccount: "",
  });
  const [errors, setErrors] = useState({});
  const [hasCurrentAccount, setHasCurrentAccount] = useState("");
  const [showBusinessDetails, setShowBusinessDetails] = useState(false);
  const [isChecked, setIsChecked] = useState(false);
  const skipFieldsProofs = ["GST","Shop and Establishment", "Municipal Establishment",
    "Palika Gram Panchayat", "Udyog Aadhaar", "Drug License", "Other"]; // list all business proof types that skip extended validations



  const form = useRef();


  const handleRadioChange = (e) => {
    setHasCurrentAccount(e.target.value);
    setFormData((prev) => ({
      ...prev,
      currentAcc: e.target.value,
    }));
  };
  const registrationOptions = [
    "GST", "Shop and Establishment", "Municipal Establishment",
    "Palika Gram Panchayat", "Udyog Aadhaar", "Drug License", "Other", "No Business Proof"
  ];

  const showDetailsForm = registrationType && registrationType !== "No Business Proof";

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));

    if (name === "pan") {
      if (!value) {
        setErrors(prev => ({ ...prev, pan: "PAN is required." }));
      } else if (!validatePan(value)) {
        setErrors(prev => ({ ...prev, pan: "Invalid PAN format. Example: ABCPA1234A." }));
      } else {
        const { pan, ...rest } = errors;
        setErrors(rest);
      }
    }
    if (name === "income") {
      const incomeVal = parseInt(value);
      if (!value) {
        setErrors((prev) => ({ ...prev, income: "Monthly income is required." }));
      } else if (incomeVal <= 25000) {
        setErrors((prev) => ({ ...prev, income: "Income must be greater than ₹25,000." }));
      } else {
        setErrors((prev) => {
          const { income, ...rest } = prev;
          return rest;
        });
      }
    }
  };
  useEffect(() => {
    if (formData.employmentStatus === "self-employed") {
      if (
        formData.businessProof &&
        formData.businessProof !== "No Business Proof"
      ) {
        setShowBusinessDetails(true);
      } else {
        setShowBusinessDetails(false);
      }
    } else {
      setShowBusinessDetails(false);
    }
  }, [formData.employmentStatus, formData.businessProof, navigate]);

  const validatePan = (value) => {
    const panRegex = /^[A-Z]{3}[PFCHATLJGBE][A-Z][0-9]{4}[A-Z]$/;
    return panRegex.test(value);
  };
  const handleSubmit1 = (e) => {
    e.preventDefault();
    // Add your secondary form logic here
    console.log("Submitted business details form", formData);
  };

  const validateForm = () => {
    const newErrors = {};
    const year = parseInt(formData.year, 10);
    const day = parseInt(formData.day, 10);
  
    const isSalaried = formData.employmentStatus === "salaried";
    const isSelfEmployed = formData.employmentStatus === "self-employed";
    const businessProof = formData.businessProof;
    const skipFieldsProofs = ["GST", "Other"]; // Add all values that should skip extra validation
    const shouldSkipExtraFields = skipFieldsProofs.includes(businessProof);
    const noBusinessProof = businessProof === "No Business Proof";
    const isNoBusinessProof = formData.businessProof === "No Business Proof";

    // PAN
    if (!formData.pan || !/^[A-Z]{5}[0-9]{4}[A-Z]$/.test(formData.pan)) {
      newErrors.pan = "Enter valid PAN (ABCDE1234F)";
    }
  
    // DOB
    if (businessProof === "No Business Proof") {
      if (!formData.day || day < 1 || day > 31) {
        newErrors.date = "Enter valid birth day (1–31)";
      } else if (!formData.month) {
        newErrors.date = "Select month";
      } else if (!formData.year || year < 1900 || year > new Date().getFullYear()) {
        newErrors.date = "Enter valid year";
      }
    }
  
    // Email & Pincode
    if (!formData.email || !/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Enter valid email";
    }
    if (!formData.pincode || formData.pincode.length !== 6) {
      newErrors.pincode = "Enter valid 6-digit pincode";
    }
  
    // Employment Status
    if (isNoBusinessProof) {
      if (!formData.employmentStatus || formData.employmentStatus === "status") {
        newErrors.employmentStatus = "Select employment status";
      }
    }
  
    // Salaried
    if (isSalaried) {
      if (!formData.employerName) {
        newErrors.employerName = "Enter employer name";
      }
      if (!formData.officePincode || formData.officePincode.length !== 6) {
        newErrors.officePincode = "Enter valid 6-digit office pincode";
      }
      if (!formData.income) {
        newErrors.income = "Monthly income is required";
      } else if (parseInt(formData.income) <= 25000) {
        newErrors.income = "Income must be greater than ₹25,000";
      }
    }
  
    // Self-employed
    if (isSelfEmployed) {
      if (!businessProof) {
        newErrors.businessProof = "Select business proof";
      }
  
      if (!shouldSkipExtraFields && !noBusinessProof) {
        // Validate only if it's a business proof that requires extra info
        if (!formData.city) {
          newErrors.city = "City is required";
        }
        if (!formData.residence || formData.residence === "status") {
          newErrors.residence = "Select residence type";
        }
        if (!formData.turnover || formData.turnover === "status") {
          newErrors.turnover = "Select turnover";
        }
        if (!formData.years || formData.years === "status") {
          newErrors.years = "Select years in business";
        }
        if (!formData.currentAcc) {
          newErrors.currentAcc = "Select current account option";
        }
      }
  
      // Common income validation for all self-employed types
      if (!formData.income) {
        newErrors.income = "Monthly income is required";
      } else if (parseInt(formData.income) <= 25000) {
        newErrors.income = "Income must be greater than ₹25,000";
      }
    }
  
    // Consent
    if (isNoBusinessProof) {
      if (!isChecked) {
        newErrors.consent = "You must agree to continue";
      }
    }
  
    console.log("Validation Errors:", newErrors);
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  


  const handleSubmit = (e) => {
    e.preventDefault();

    const isValid = validateForm();
    console.log("Form Valid?", isValid);
    if (isValid) {
      console.log("Navigating...");
      navigate("/business-loan/verification/business-details/offers");
    }
  };
  const getButtonText = () => {
    if (formData.employmentStatus === "salaried") {
      return "Look for offers";
    }

    if (formData.employmentStatus === "self-employed") {
      if (formData.businessProof === "No Business Proof") {
        return "Look for offers";
      } else if (formData.businessProof) {
        return "Look for offers";
      }
    }
    return "Submit"; // default case
  };

  return (
    <div className="container mt-5">
      <h4 className="text-center mb-4">Business Registration Type</h4>

      <select
        className="form-select mb-3"
        onChange={(e) => setRegistrationType(e.target.value)}
      >
        <option value="">Select Registration Type</option>
        {registrationOptions.map(option => (
          <option key={option} value={option}>{option}</option>
        ))}
      </select>

      {showDetailsForm ? (
        <div className="mb-3">
          <div className="form-group">
            <label>PAN*</label>
            <input type="text" name="pan" className="form-control mb-2" placeholder="ABCDE1234F" value={formData.pan} onChange={handleChange} />
            {errors.pan && <div className="text-danger">{errors.pan}</div>}
          </div>

          <div className="form-group">
            <label>Email*</label>
            <input type="email" name="email" className="form-control mb-2" value={formData.email} onChange={handleChange} />
            {errors.email && <div className="text-danger">{errors.email}</div>}
          </div>

          <div className="form-group">
            <label>Pincode*</label>
            <input type="number" name="pincode" className="form-control mb-2" value={formData.pincode} onChange={handleChange} />
            {errors.pincode && <div className="text-danger">{errors.pincode}</div>}
          </div>

          <div className="form-group">
            <label>City*</label>
            <input type="text" name="city" className="form-control mb-2" value={formData.city} onChange={handleChange} />
            {errors.city && <div className="text-danger">{errors.city}</div>}
          </div>

          <div className="form-group">
            <label>Residence Type*</label>
            <select name="residence" className="form-control mb-2" value={formData.residence} onChange={handleChange}>
              <option value="">Select Type</option>
              <option value="owned">Owned</option>
              <option value="rented">Rented</option>
            </select>
            {errors.residence && <div className="text-danger">{errors.residence}</div>}
          </div>

          <div className="form-group">
            <label>Current TurnOver*</label>
            <select
              name="turnover"
              className="form-control"
              value={formData.turnover}
              onChange={handleChange}
            >
              <option value="status">Select Status</option>
              <option value="six">Upto 6 lacs</option>
              <option value="twelve">6-12 lacs</option>
              <option value="twenty">12-20 lacs</option>
              <option value="more">More than 20 lacs</option>
            </select>
            {errors.turnover && <p className="error-text">{errors.turnover}</p>}
          </div>

          <div className="form-group">
            <label>Years In Business*</label>
            <select
              name="years"
              className="form-control"
              value={formData.years}
              onChange={handleChange}
            >
              <option value="status">Select Status</option>
              <option value="less">Less than one year</option>
              <option value="one">1 to 2 years</option>
              <option value="more">More than 2 years</option>
            </select>
            {errors.years && <p className="error-text">{errors.years}</p>}
          </div>

          <div className="form-group">
            <div className="radio-container">
              <p>Do you have a Current Account in the name of Business?*</p>
              <label>
                <input
                  type="radio"
                  name="currentAcc"
                  value="yes"
                  checked={hasCurrentAccount === "yes"}
                  onChange={handleRadioChange}
                />
                Yes
              </label>
              <label>
                <input
                  type="radio"
                  name="currentAcc"
                  value="no"
                  checked={hasCurrentAccount === "no"}
                  onChange={handleRadioChange}
                />
                No
              </label>
            </div>
            {errors.currentAcc && <p className="error-text">{errors.currentAcc}</p>}
          </div>
        </div>
      ) : registrationType === "No Business Proof" ? (
        <div className="">
          <h5 >Personal Information</h5>
          <form ref={form} onSubmit={handleSubmit}>
            {/* PAN */}
            <div className="form-group">
              <label>PAN*</label>
              <input
                type="text"
                className="form-control"
                name="pan"
                placeholder="ABCDE1234F"
                value={formData.pan}
                onChange={handleChange}
              />
              {errors.pan && <p className="error-text">{errors.pan}</p>}
            </div>

            {/* Birth Date */}
            <div className="form-group">
              <label>Birth Date*</label>
              <div className="input-group-container">
                <input
                  type="number"
                  className="form-control"
                  placeholder="Day"
                  name="day"
                  min="1"
                  max="31"
                  value={formData.day}
                  onChange={handleChange}
                />
                <select
                  className="form-control"
                  name="month"
                  value={formData.month}
                  onChange={handleChange}
                >
                  <option value="">Month</option>
                  {[
                    "January", "February", "March", "April", "May", "June",
                    "July", "August", "September", "October", "November", "December"
                  ].map((month, index) => (
                    <option key={index} value={index + 1}>{month}</option>
                  ))}
                </select>
                <input
                  type="number"
                  className="form-control"
                  placeholder="Year"
                  name="year"
                  min="1900"
                  max={new Date().getFullYear()}
                  value={formData.year}
                  onChange={handleChange}
                />
              </div>
              {errors.date && <p className="error-text">{errors.date}</p>}
            </div>

            {/* Email */}
            <h5 >Contact Information</h5>
            <div className="form-group">
              <label>Email*</label>
              <input
                type="email"
                className="form-control"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="example@gmail.com"
              />
              {errors.email && <p className="error-text">{errors.email}</p>}
            </div>

            {/* Pincode */}
            <div className="form-group">
              <label>Pincode*</label>
              <input
                type="number"
                className="form-control"
                name="pincode"
                value={formData.pincode}
                onChange={handleChange}
                placeholder="123456"
              />
              {errors.pincode && <p className="error-text">{errors.pincode}</p>}
            </div>

            {/* Employment */}
            <h5 >Employment Details</h5>
            <div className="form-group">
              <label>Employment Status*</label>
              <select
                name="employmentStatus"
                className="form-control"
                value={formData.employmentStatus}
                onChange={handleChange}
              >
                <option value="status">Select Status</option>
                <option value="self-employed">Self-Employed</option>
                <option value="salaried">Salaried</option>
              </select>
              {errors.employmentStatus && <p className="error-text">{errors.employmentStatus}</p>}
            </div>

            {/* Salaried Fields */}
            {formData.employmentStatus === "salaried" && (
              <>
                <div className="form-group">
                  <label>Employer Name*</label>
                  <input
                    type="text"
                    className="form-control"
                    name="employerName"
                    value={formData.employerName}
                    onChange={handleChange}
                  />
                  {errors.employerName && <p className="error-text">{errors.employerName}</p>}
                </div>

                <div className="form-group">
                  <label>Office Pincode*</label>
                  <input
                    type="number"
                    className="form-control"
                    name="officePincode"
                    value={formData.officePincode}
                    onChange={handleChange}
                  />
                  {errors.officePincode && <p className="error-text">{errors.officePincode}</p>}
                </div>

                <div className="form-group">
                  <label>Monthly Income*</label>
                  <input
                    placeholder="₹"

                    type="number"
                    className="form-control"
                    name="income"
                    value={formData.income}
                    onChange={handleChange}
                  />
                  {errors.income && <p className="error-text">{errors.income}</p>}
                </div>
              </>
            )}

            {/* Self-Employed Business Proof */}
            {formData.employmentStatus === "self-employed" && (
              <>
                <div className="form-group">
                  <label>Business Proof*</label>
                  <select
                    name="businessProof"
                    className="form-control"
                    value={formData.businessProof}
                    onChange={handleChange}
                  >
                    <option value="">Select Proof</option>
                    <option value="GST">GST</option>
                    <option value="Shop and Establishment">Shop and Establishment</option>
                    <option value="Municipal Establishment">Municipal Establishment</option>
                    <option value="Palika Gram Panchayat">Palika Gram Panchayat</option>
                    <option value="Udyog Aadhaar">Udyog Aadhaar</option>
                    <option value="Drug License">Drug License</option>
                    <option value="Other">Other</option>
                    <option value="No Business Proof">No Business Proof</option>
                  </select>
                  {errors.businessProof && <p className="error-text">{errors.businessProof}</p>}
                </div>
                <div className="form-group">
                  <label>Monthly Income*</label>
                  <input
                    placeholder="₹"

                    type="number"
                    className="form-control"
                    name="income"
                    value={formData.income}
                    onChange={handleChange}
                  />
                  {errors.income && <p className="error-text">{errors.income}</p>}
                </div>
              </>
            )}
            {showBusinessDetails && (

              <form ref={form} onSubmit={handleSubmit}>
                <div className="form-group">
                  <label>Residence Type*</label>
                  <select
                    name="residence"
                    className="form-control"
                    value={formData.residence}
                    onChange={handleChange}
                  >
                    <option value="status">Select Type</option>
                    <option value="owned">Owned</option>
                    <option value="rented">Rented</option>
                  </select>
                  {errors.residence && <p className="error-text">{errors.residence}</p>}
                </div>

                <div className="form-group">
                  <label>Current TurnOver*</label>
                  <select
                    name="turnover"
                    className="form-control"
                    value={formData.turnover}
                    onChange={handleChange}
                  >
                    <option value="status">Select Status</option>
                    <option value="six">Upto 6 lacs</option>
                    <option value="twelve">6-12 lacs</option>
                    <option value="twenty">12-20 lacs</option>
                    <option value="more">More than 20 lacs</option>
                  </select>
                  {errors.turnover && <p className="error-text">{errors.turnover}</p>}
                </div>

                <div className="form-group">
                  <label>Years In Business*</label>
                  <select
                    name="years"
                    className="form-control"
                    value={formData.years}
                    onChange={handleChange}
                  >
                    <option value="status">Select Status</option>
                    <option value="less">Less than one year</option>
                    <option value="one">1 to 2 years</option>
                    <option value="more">More than 2 years</option>
                  </select>
                  {errors.years && <p className="error-text">{errors.years}</p>}
                </div>

                <div className="form-group">
                  <div className="radio-container">
                    <p>Do you have a Current Account in the name of Business?*</p>
                    <label>
                      <input
                        type="radio"
                        name="currentAcc"
                        value="yes"
                        checked={hasCurrentAccount === "yes"}
                        onChange={handleRadioChange}
                      />
                      Yes
                    </label>
                    <label>
                      <input
                        type="radio"
                        name="currentAcc"
                        value="no"
                        checked={hasCurrentAccount === "no"}
                        onChange={handleRadioChange}
                      />
                      No
                    </label>
                  </div>
                  {errors.currentAcc && <p className="error-text">{errors.currentAcc}</p>}
                </div>


              </form>

            )}
            {/* Consent Checkbox */}
            <div className="form-group">
              <div className="checkbox-container">
                <input
                  type="checkbox"
                  id='terms'
                  checked={isChecked}
                  onChange={() => setIsChecked(!isChecked)}
                />
                <label htmlFor="terms" style={{ textAlign: "justify", display: "block" }}>
                  In addition to any consent you may give pursuant to the Privacy Policy, you hereby consent to (a) Lenders retrieving your credit score from third party providers for the purpose of evaluating your eligibility for a Credit Facility; (b) Lenders sharing your credit score with Little Money; (c) Little Money sharing the Transaction information with its affiliates and Lenders. For the avoidance of doubt, Creditlinks does not retrieve your credit score from any source.                </label>
              </div>
              {errors.consent && <p className="error-text ">{errors.consent}</p>}
            </div>

            {/* <button type="submit" className="axil-btn btn-fill-primary btn-fluid btn-primary">
              {getButtonText()}
            </button> */}
          </form>
        </div>
      ) : null}

      <button
        className="axil-btn btn-fill-primary btn-fluid btn-primary"
        disabled={!registrationType}
        onClick={handleSubmit}
      >
        {getButtonText()}
      </button>
    </div>
  );
};

export default FormFour;

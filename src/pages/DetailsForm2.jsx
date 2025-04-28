import React, { useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom';

const DetailsForm2 = () => {
    const navigate = useNavigate();
    const form = useRef();
    const [showBusinessDetails, setShowBusinessDetails] = useState(false);

    const [formData, setFormData] = useState({
        pan: "",
        birthDate: "",
        email: "",
        pincode: "",
        employmentStatus: "",
        income: "",
        employerName: "",
        officePincode: "",
        businessProof: "",
    });
    const [formData1, setFormData1] = useState({
        turnover: "",
        years: ""
    });

    const [hasCurrentAccount, setHasCurrentAccount] = useState(""); // Track radio selection
    const handleRadioChange = (e) => {
        setHasCurrentAccount(e.target.value);
    };
    const [errors, setErrors] = useState({});
    const [isChecked, setIsChecked] = useState(false);

    const validatePan = (value) => {
        const panRegex = /^[A-Z]{3}[PFCHATLJGBE][A-Z][0-9]{4}[A-Z]$/;
        return panRegex.test(value);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;

        // Update the form state
        setFormData((prev) => ({ ...prev, [name]: value }));

        // Validate PAN dynamically
        if (name === "pan") {
            if (!value) {
                setErrors((prevErrors) => ({ ...prevErrors, pan: "PAN is required." }));
            } else if (!validatePan(value)) {
                setErrors((prevErrors) => ({ ...prevErrors, pan: "Invalid PAN format. Example: ABCPA1234A." }));
            } else {
                // Clear the error when valid
                setErrors((prevErrors) => {
                    const { pan, ...rest } = prevErrors;
                    return rest;
                });
            }
        }
        if (name === "income") {
            if (value && Number(value) < 25000) {
                setErrors((prevErrors) => ({ ...prevErrors, income: "Monthly income should be greater than ₹25,000." }));
            } else {
                setErrors((prevErrors) => {
                    const { income, ...rest } = prevErrors;
                    return rest;
                });
            }
        }
    };


    const validateForm = () => {
        let newErrors = {};
        if (formData.income && Number(formData.income) < 25000) {
            newErrors.income = "Monthly income should be greater than ₹25,000.";
        }
        // Validate PAN
        if (!formData.pan) {
            newErrors.pan = "PAN is required.";
        } else if (!validatePan(formData.pan)) {
            newErrors.pan = "Invalid PAN format. Example: ABCPA1234A.";
        }

        // Validate birthdate, email, pincode
        if (
            !formData.day ||
            !formData.month ||
            !formData.year ||
            (formData.year && (formData.year < 1900 || formData.year > new Date().getFullYear()))
        ) {
            newErrors.date = "Please enter a valid date (Day, Month, Year)";
        }
        if (!formData.email) newErrors.email = "Email is required.";
        if (!formData.pincode) newErrors.pincode = "Pincode is required.";

        // Validate Employment Status
        if (!formData.employmentStatus || formData.employmentStatus === "status") {
            newErrors.employmentStatus = "Employment status is required.";
        }

        // Validate income based on employment status
        if (formData.employmentStatus === "salaried") {
            if (!formData.employerName) newErrors.employerName = "Employer Name is required.";
            if (!formData.officePincode) newErrors.officePincode = "Office Pincode is required.";
            if (!formData.income) newErrors.income = "Monthly income is required.";
        }

        if (formData.employmentStatus === "self-employed") {
            if (!formData.businessProof) newErrors.businessProof = "Business proof is required.";
            if (["GST", "Shop and Establishment", "Municipal Establishment", "Palika Gram Panchayat", "Udyog Aadhaar", "Drug License", "Other", "No Business Proof"].includes(formData.businessProof) && !formData.income) {
                newErrors.income = "Monthly income is required.";
            }
        }

        // Validate consent
        if (!isChecked) newErrors.consent = "You must agree to the terms.";

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };
    const validateForm1 = () => {
        let newErrors = {};
        if (!formData.residence || formData.residence == "status") newErrors.residence = "residence type is required.";
        if (!formData.turnover || formData.turnover === "status") newErrors.turnover = "Employment status is required.";
        if (!formData.years || formData.years === "status") newErrors.turnover = "Employment status is required.";
        if (!hasCurrentAccount) newErrors.currentAcc = "Please select an option.";

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        if (validateForm()) {
            if (formData.employmentStatus === "salaried") {
                // Salaried users go directly to offers
                // console.log("Form Submitted!", formData);
                navigate("/personal-loan/verification/user-details/offers");
            } else if (formData.employmentStatus === "self-employed") {
                if (formData.businessProof === "No Business Proof") {
                    // Self-employed with no proof still go to offers
                    // console.log("Form Submitted!", formData);
                    navigate("/personal-loan/verification/user-details/offers");
                } else {
                    // Self-employed with valid business proof: show additional business fields
                    setShowBusinessDetails(true);
                }
            }
        }


    };
    const handleSubmit1 = (e) => {
        e.preventDefault();
        if (validateForm1()) {
            // console.log("Form Submitted!", formData);
            navigate("/personal-loan/verification/user-details/offers");
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
                return "Next";
            }
        }

        return "Submit"; // default case
    };
    return (
        <div>
            <div className="section-padding">
                <div className="row d-flex justify-content-center">
                    <div className="col-xl-7 col-lg-6">
                        <div className="contact-form-box ">
                            <h4 className="title">Personal Information</h4>
                            <form ref={form} onSubmit={handleSubmit}>
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


                                <div className="form-group">
                                    <label>Birth Date*</label>
                                    <div className="input-group-container">
                                        {/* Day Input */}
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

                                        {/* Month Dropdown */}
                                        <select
                                            className="form-control"
                                            name="month"
                                            value={formData.month}
                                            onChange={handleChange}
                                        >
                                            <option value="">Month</option>
                                            <option value="1">January</option>
                                            <option value="2">February</option>
                                            <option value="3">March</option>
                                            <option value="4">April</option>
                                            <option value="5">May</option>
                                            <option value="6">June</option>
                                            <option value="7">July</option>
                                            <option value="8">August</option>
                                            <option value="9">September</option>
                                            <option value="10">October</option>
                                            <option value="11">November</option>
                                            <option value="12">December</option>
                                        </select>

                                        {/* Year Input */}
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

                                    {/* Unified Error Message */}
                                    {errors.date && <p className="error-text">{errors.date}</p>}
                                </div>

                                <h4 className="title">Contact Information</h4>
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

                                <div className="form-group">
                                    <label>Pincode*</label>
                                    <input
                                        type="text" // use "text" instead of "number" to control input better
                                        className="form-control"
                                        name="pincode"
                                        value={formData.pincode}
                                        onChange={(e) => {
                                            const value = e.target.value;
                                            // Allow only digits and restrict to 6 characters
                                            if (/^\d{0,6}$/.test(value)) {
                                                handleChange(e); // your existing handler
                                            }
                                        }}
                                        placeholder="560001"
                                    />
                                    {errors.pincode && <p className="error-text">{errors.pincode}</p>}
                                </div>

                                <h4 className="title">Employment Details</h4>
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
                                            <label>Office Pincode*
                                            </label>
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

                                        {["GST", "Shop and Establishment", "Municipal Establishment", "Palika Gram Panchayat", "Udyog Aadhaar", "Drug License", "Other", "No Business Proof"].includes(formData.businessProof) && (
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
                                        )}
                                    </>
                                )}

                                <div className="form-group">
                                    <div className="checkbox-container">


                                        <input
                                            type="checkbox"
                                            id='terms'
                                            checked={isChecked}
                                            onChange={() => setIsChecked(!isChecked)}
                                        />
                                        <label htmlFor="terms" style={{ textAlign: "justify", display: "block" }}>
                                            In addition to any consent you may give pursuant to the Privacy Policy, you hereby consent to (a) Lenders retrieving your credit score from third party providers for the purpose of evaluating your eligibility for a Credit Facility; (b) Lenders sharing your credit score with Little Money; (c) Little Money sharing the Transaction information with its affiliates and Lenders. For the avoidance of doubt, Little Money Technologies does not retrieve your credit score from any source.
                                        </label>
                                    </div>
                                    {errors.consent && <p className="error-text ">{errors.consent}</p>}

                                </div>

                                <button type="submit" className="axil-btn btn-fill-primary btn-fluid btn-primary">
                                    {getButtonText()}
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>

            {showBusinessDetails && (
                <>
                    <div className="section-padding">
                        <div className="row d-flex justify-content-center">
                            <div className="col-xl-7 col-lg-6">
                                <div className="contact-form-box ">
                                    <form ref={form} onSubmit={handleSubmit1}>

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

                                        <div className="form-group">
                                            <button
                                                type="submit"
                                                className="axil-btn btn-fill-primary btn-fluid btn-primary"
                                            >
                                                Look for Offers
                                            </button>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </>
            )}

        </div>
    )
}

export default DetailsForm2
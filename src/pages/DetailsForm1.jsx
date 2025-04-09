import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const DetailsForm1 = () => {
    const [formData, setFormData] = useState({
        pan: "",
        day: "",
        month: "",
        year: "",
        email: "",
        pincode: "",
        employmentStatus: "status",
        employerName: "",
        officePincode: "",
        income: "",
        businessProof: "",
        residence: "status",
        turnover: "status",
        years: "status",
        currentAcc: "",
    });

    const [errors, setErrors] = useState({});
    const [isChecked, setIsChecked] = useState(false);
    const [hasCurrentAccount, setHasCurrentAccount] = useState("");
    const [showBusinessDetails, setShowBusinessDetails] = useState(false);

    const form = useRef();
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
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

    const handleRadioChange = (e) => {
        setHasCurrentAccount(e.target.value);
        setFormData((prev) => ({
            ...prev,
            currentAcc: e.target.value,
        }));
    };

    // Redirect or show fields based on businessProof logic
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
    const validateForm = () => {
        const newErrors = {};

        // PAN Validation
        if (!formData.pan || !/^[A-Z]{5}[0-9]{4}[A-Z]$/.test(formData.pan)) {
            newErrors.pan = "Enter valid PAN (ABCDE1234F)";
        }


        // Date Validation
        const day = parseInt(formData.day, 10);
        const year = parseInt(formData.year, 10);
        if (!formData.day || day < 1 || day > 31) {
            newErrors.date = "Enter valid birth day (1-31)";
        }
        if (!formData.month) {
            newErrors.date = "Select month";
        }
        if (!formData.year || year < 1900 || year > new Date().getFullYear()) {
            newErrors.date = "Enter valid year";
        }

        // Email
        if (!formData.email || !/\S+@\S+\.\S+/.test(formData.email)) {
            newErrors.email = "Enter valid email";
        }

        // Pincode
        if (!formData.pincode || formData.pincode.length !== 6) {
            newErrors.pincode = "Enter valid 6-digit pincode";
        }

        // Employment
        if (formData.employmentStatus === "status") {
            newErrors.employmentStatus = "Select employment status";
        }

        if (formData.employmentStatus === "salaried") {
            if (!formData.employerName) {
                newErrors.employerName = "Enter employer name";
            }
            if (!formData.officePincode || formData.officePincode.length !== 6) {
                newErrors.officePincode = "Enter valid 6-digit office pincode";
            }
            if (!formData.income) {
                newErrors.income = "Monthly income is required.";
            } else if (parseInt(formData.income) <= 25000) {
                newErrors.income = "Income must be greater than ₹25,000.";
            }
        }

        if (formData.employmentStatus === "self-employed") {
            if (!formData.businessProof) {
                newErrors.businessProof = "Select business proof";
            }

            if (formData.businessProof !== "No Business Proof") {
                if (formData.residence === "status") {
                    newErrors.residence = "Select residence type";
                }
                if (formData.turnover === "status") {
                    newErrors.turnover = "Select turnover";
                }
                if (formData.years === "status") {
                    newErrors.years = "Select years in business";
                }
                if (!formData.currentAcc) {
                    newErrors.currentAcc = "Select current account option";
                }

                if (!formData.income) {
                    newErrors.income = "Monthly income is required.";
                } else if (parseInt(formData.income) <= 25000) {
                    newErrors.income = "Income must be greater than ₹25,000.";
                }
            }
        }

        // Consent checkbox
        if (!isChecked) {
            newErrors.consent = "You must agree to continue";
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (validateForm()) {
            console.log("Submitted main form", formData);
            navigate("/personal-loan/verification/user-details/offers")
            // Redirect logic based on employment + businessProof
            // if (formData.employmentStatus === "self-employed" && formData.businessProof === "No Business Proof") {
            //     navigate("/personal-loans/verification/user-details/offers");
            // } else if (formData.employmentStatus === "salaried") {
            //     navigate("/personal-loans/verification/user-details/offers");
            // } else if (formData.employmentStatus === "self-employed" && formData.businessProof !== "No Business Proof") {
            //     console.log("Business details will be handled in separate step/form");
            // }
        }
    };

    const handleSubmit1 = (e) => {
        e.preventDefault();
        // Add your secondary form logic here
        console.log("Submitted business details form", formData);
    };

    // navigate("/personal-loans/verification/user-details/offers");

    const getButtonText = () => {
        if (formData.employmentStatus === "salaried") {
            return "Look for offers";
        }

        if (formData.employmentStatus === "self-employed") {
            if (formData.businessProof === "No Business Proof") {
                return "Look for offers";
            } else if (formData.businessProof) {
                return "Submit";
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

                                {/* Pincode */}
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

                                {/* Employment */}
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
                                                type="number"
                                                className="form-control"
                                                name="income"
                                                value={formData.income}
                                                onChange={handleChange}
                                                placeholder="₹"
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
                                                type="number"
                                                className="form-control"
                                                name="income"
                                                value={formData.income}
                                                onChange={handleChange}
                                                placeholder="₹"

                                            />
                                            {errors.income && <p className="error-text">{errors.income}</p>}
                                        </div>
                                    </>

                                )}
                                {showBusinessDetails && (

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
                                            In addition to any consent you may give pursuant to the Privacy Policy, you hereby consent to (a) Lenders retrieving your credit score from third party providers for the purpose of evaluating your eligibility for a Credit Facility; (b) Lenders sharing your credit score with Little Money; (c) Little Money sharing the Transaction information with its affiliates and Lenders. For the avoidance of doubt, Creditlinks does not retrieve your credit score from any source.
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

        </div>
    );
};

export default DetailsForm1;
import React, { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const DetailsForm1 = () => {
    const navigate = useNavigate();
    const form = useRef();

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
        if (!formData.birthDate) newErrors.birthDate = "Birth Date is required.";
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

    const handleSubmit = (e) => {
        e.preventDefault();
        if (validateForm()) {
            console.log("Form Submitted!", formData);

            // Check employment status and business proof conditions
            if (formData.employmentStatus === "salaried") {
                // Navigate to the offer page for salaried employees
                navigate("/offers");
            } else if (formData.employmentStatus === "self-employed") {
                // Check business proof selection for self-employed users
                if (formData.businessProof === "No Business Proof") {
                    // Navigate to details-form2 if No Business Proof is selected
                    navigate("/offers");a
                } else {
                    // Navigate to turn-over page for other business proofs
                    navigate("/personal-loans/verification/user-details/turn-over");
                }
            }
        }
    };

    return (
        <div>
            <div className="section-padding">
                <div className="row d-flex justify-content-center">
                    <div className="col-xl-7 col-lg-6">
                        <div className="contact-form-box shadow-box mb--30">
                            <h4 className="title">Personal Information</h4>
                            <form ref={form} onSubmit={handleSubmit}>
                                <div className="form-group">
                                    <label>PAN</label>
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
                                    <label>Birth Date</label>
                                    <input
                                        type="date"
                                        className="form-control"
                                        name="birthDate"
                                        value={formData.birthDate}
                                        onChange={handleChange}
                                    />
                                    {errors.birthDate && <p className="error-text">{errors.birthDate}</p>}
                                </div>

                                <h4 className="title">Contact Information</h4>
                                <div className="form-group">
                                    <label>Email</label>
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
                                    <label>Pincode</label>
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

                                <h4 className="title">Employment Details</h4>
                                <div className="form-group">
                                    <label>Employment Status</label>
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
                                            <label>Employer Name</label>
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
                                            <label>Office Pincode</label>
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
                                            <label>Monthly Income</label>
                                            <input
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
                                            <label>Business Proof</label>
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
                                                <label>Monthly Income</label>
                                                <input
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

                                        <label>
                                            <input
                                                type="checkbox"
                                                id='terms'
                                                checked={isChecked}
                                                onChange={() => setIsChecked(!isChecked)}
                                            />
                                           In addition to any consent you may give pursuant to the Privacy Policy, you hereby consent to (a) Lenders retrieving your credit score from third party providers for the purpose of evaluating your eligibility for a Credit Facility; (b) Lenders sharing your credit score with Little Money; (c) Little Money sharing the Transaction information with its affiliates and Lenders. For the avoidance of doubt, Creditlinks does not retrieve your credit score from any source.
                                        </label>
                                        {errors.consent && <p className="error-text">{errors.consent}</p>}
                                    </div>
                                </div>

                                <button type="submit" className="axil-btn btn-fill-primary btn-fluid btn-primary">
                                    Submit
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

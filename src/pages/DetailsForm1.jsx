import React, { useEffect, useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useLocation, useParams } from "react-router-dom";
import { useNavigate } from 'react-router-dom'
import { lead } from '../api/Website/index'
import { getOffersByLeadId } from "../api/Website/index";
import logout from '../utils/logout.jsx'
import { Button, Modal } from "react-bootstrap";
import useAutoLogout from "../hooks/useAutoLogout.jsx";
import FullScreenLoader from "../component/loader/FullScreenLoader.jsx";
const currentYear = new Date().getFullYear();



const validationSchema = Yup.object({

    pan: Yup.string()
        .matches(/^[A-Z]{5}[0-9]{4}[A-Z]$/, "required PAN format(ABCDE1234F)")
        .required("PAN is required"),
    day: Yup.number()
        .nullable()
        .test("complete-dob", "Birth Date (Day, Month, and Year) is required", function (value) {
            const { month, year } = this.parent;
            return value && month && year;
        })
        .test("valid-age", "Age must be between 22 and 55", function (day) {
            const { month, year } = this.parent;
            if (!day || !month || !year) return false;

            const birthDate = new Date(year, month - 1, day);
            const today = new Date();

            let age = today.getFullYear() - birthDate.getFullYear();
            const m = today.getMonth() - birthDate.getMonth();
            if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
                age--;
            }

            return age >= 22 && age <= 55;
        }),

    month: Yup.number().nullable(),
    year: Yup.number().nullable(),
    email: Yup.string().email("Invalid email").required("Email is required"),
    pincode: Yup.string()
        .matches(/^\d{6}$/, "Pincode must be 6 digits")
        .required("Pincode is required"),
    employmentStatus: Yup.string().required("Employment status is required"),
    employerName: Yup.string().when("employmentStatus", {
        is: "1",
        then: (schema) => schema.required("Employer name is required"),
    }),
    officePincode: Yup.string().when("employmentStatus", {
        is: "1",
        then: (schema) =>
            schema
                .matches(/^\d{6}$/, "Office Pincode must be 6 digits")
                .required("Office Pincode is required"),
    }),
    income: Yup.number()
        .required("Monthly Income is required")
        .moreThan(25000, "Income must be greater than ₹25,000"),
    businessProof: Yup.string().when("employmentStatus", {
        is: "2",
        then: (schema) => schema.required("Business Proof is required"),
    }),
    residence: Yup.string().when("showBusinessDetails", {
        is: true,
        then: (schema) => schema.required("Residence Type is required"),
    }),
    turnover: Yup.string().when("showBusinessDetails", {
        is: true,
        then: (schema) => schema.required("Turnover is required"),
    }),
    years: Yup.string().when("showBusinessDetails", {
        is: true,
        then: (schema) => schema.required("Years in business is required"),
    }),
    currentAcc: Yup.string().when("showBusinessDetails", {
        is: true,
        then: (schema) => schema.required("Current account status is required"),
    }),
    consent: Yup.boolean().oneOf([true], "Consent is required"),
});

const initialValues = {
    pan: "",
    day: "",
    month: "",
    year: "",
    email: "",
    pincode: "",
    employmentStatus: "",
    employerName: "",
    officePincode: "",
    income: "",
    businessProof: "",
    residence: "",
    turnover: "",
    years: "",
    currentAcc: "",
    consent: false,
};

const saveFormData = (formData) => {
    localStorage.setItem('formData', JSON.stringify(formData));
};

// Function to load form data from localStorage
const loadFormData = () => {

    const formData = localStorage.getItem('formData');

    if (formData) {
        const parsedData = JSON.parse(formData);
        setFormValues(parsedData); // Pre-fill the form with saved data
    }
};
export default function FormikForm() {

    const { userId, } = useParams();
    const location = useLocation();
    const data = location.state;
    const location2=useLocation()
    const data2=location2.state;
    console.log("Received user data:", data);
    console.log("Received user data2:", data2);
    const { referralCode } = useParams();


    // const data = location.state || {};
    // console.log(data);


    // useEffect(() => {
    //     if (!mobileNumber || !firstName || !lastName) {
    //         console.warn("Missing user data from previous form.");
    //         // Optionally redirect or show an error
    //     }
    // }, []);
    const finalReferralCode = referralCode || localStorage.getItem("referral_code");
    console.log(finalReferralCode);
    useEffect(() => {
        if (finalReferralCode) {
            localStorage.setItem("referral_code", finalReferralCode);
        }
    }, [finalReferralCode]);
    const navigate = useNavigate()
    const [loading, setLoading] = useState(false);

    const [showBusinessDetails, setShowBusinessDetails] = useState(false);

    const handleBusinessProofChange = (e, setFieldValue) => {
        const selected = e.target.value;
        setFieldValue("businessProof", selected);
        setShowBusinessDetails(selected !== "8" && selected !== "");
        const currentValues = JSON.parse(localStorage.getItem("formData")) || {};
        saveFormData({
            ...currentValues,
            businessProof: value,
            showBusinessDetails: validProofs.includes(value),
        });
    };
    useEffect(() => {
        const token = localStorage.getItem("token");
        // const leadId = localStorage.getItem("leadId");

        if (!token) {
            navigate("/personal-loan/:referralCode?"); // or show an error
        }
    }, []);

    const { showModal, countdown } = useAutoLogout(60 * 30 * 1000); // 30 min

    return (
        <div className="section section-padding">
            <div className="row d-flex justify-content-center">
                <div className="col-xl-7 col-lg-6">
                    <Formik
                        initialValues={{ ...initialValues, showBusinessDetails }}
                        validationSchema={validationSchema}
                        onSubmit={async (values) => {
                            console.log("Submitted values:", values);
                            const isSalaried = Number(values.employmentStatus) === 1;
                            const isSelfEmployed = Number(values.employmentStatus) === 2;
                            const hasValidBusinessProof = Number(values.businessProof) >= 1 && Number(values.businessProof) <= 7;
                            const personaLLoanFormData = {
                                // ...location.state,
                                mobileNumber: location.state?.mobileNumber,
                                firstName: location.state?.firstName,
                                lastName: location.state?.lastName,
                                referal: finalReferralCode,
                                pan: values.pan,
                                dob: `${values.year}-${String(values.month).padStart(2, "0")}-${String(values.day).padStart(2, "0")}`,
                                email: values.email,
                                pincode: values.pincode,
                                employmentStatus: Number(values.employmentStatus),
                                monthlyIncome: Number(values.income),
                                consumerConsentDate: new Date().toISOString(),
                                consumerConsentIp: "0.0.0.0",
                                ...(isSalaried && {
                                    employerName: values.employerName,
                                    officePincode: values.officePincode,
                                }),
                                ...(isSelfEmployed && hasValidBusinessProof && {
                                    businessRegistrationType: Number(values.businessProof),
                                    residenceType: Number(values.residence),
                                    businessCurrentTurnover: Number(values.turnover),
                                    businessYears: Number(values.years),
                                    businessAccount: Number(values.currentAcc),

                                }),
                                ...(location.state?.referal && location.state.referal.trim() !== '' && {
                                    referal: location.state.referal.trim(),
                                }),
                            };
                            saveFormData(loadFormData);

                            console.log(typeof personaLLoanFormData.employmentStatus)
                            // console.log(personaLLoanFormData);
                            try {
                                setLoading(true);
                                // API call to submit form data
                                const response = await lead(personaLLoanFormData);
                                console.log(response);

                                if (response.success === true) {

                                    const leadId = response.leadId;
                                    console.log(leadId);

                                    const offersResponse = await getOffersByLeadId(leadId);
                                    localStorage.setItem("leadId", leadId); // or mobileNumber

                                    console.log("Offers response:", offersResponse);

                                    // navigate(`/personal-loan/verification/user-details/${userId}/offers/${leadId}`);
                                    if (finalReferralCode) {

                                        navigate(`/user-detail/offers/${leadId}/${referralCode}`, {
                                            state: { offers: offersResponse.offers ,    ...data,}
                                        });
                                    } else {
                                        navigate(`/user-detail/offers`, {
                                            state: { offers: offersResponse.offers ,...data,}
                                        });
                                    }
                                } else {
                                    console.error('Lead creation failed:', response.message);
                                }

                            } catch (error) {
                                console.error('Error occurred during lead creation:', error);
                            }
                            setLoading(false);
                        }
                        }
                    >
                        {({ values, setFieldValue }) => (
                            <Form className="contact-form-box">
                                <h5>Personal Information</h5>
                                {/* <Button onClick={logout} variant="primary"
                                    className="mt-auto axil-btn btn-fill-primary">Logout</Button> */}
                                {/* PAN */}
                                <div className="form-group">
                                    <label>PAN*</label>
                                    <Field name="pan">
                                        {({ field, form }) => (
                                            <input
                                                {...field}
                                                className="form-control"
                                                placeholder="ABCDE1234F"
                                                onChange={(e) => {
                                                    const uppercased = e.target.value.toUpperCase();
                                                    form.setFieldValue('pan', uppercased); // use formik's context
                                                }}
                                            />
                                        )}
                                    </Field>
                                    <ErrorMessage name="pan" component="p" className="error-text" />
                                </div>

                                {/* Birth Date */}
                                <div className="form-group">
                                    <label>Birth Date*</label>
                                    <div className="input-group-container d-flex gap-2">
                                        <Field name="day" type="number" className="form-control" placeholder="Day" />
                                        <Field as="select" name="month" className="form-control">
                                            <option value="">Month</option>
                                            {[
                                                "January", "February", "March", "April", "May", "June",
                                                "July", "August", "September", "October", "November", "December",
                                            ].map((month, index) => (
                                                <option key={index} value={index + 1}>{month}</option>
                                            ))}
                                        </Field>
                                        <Field name="year" type="number" className="form-control" placeholder="Year" />
                                    </div>
                                    <ErrorMessage name="day" component="p" className="error-text" />

                                </div>

                                {/* Contact Info */}
                                <h5>Contact Information</h5>

                                <div className="form-group">
                                    <label>Email*</label>
                                    <Field name="email" type="email" className="form-control" />
                                    <ErrorMessage name="email" component="p" className="error-text" />
                                </div>

                                <div className="form-group">
                                    <label>Pincode*</label>
                                    <Field name="pincode" className="form-control" />
                                    <ErrorMessage name="pincode" component="p" className="error-text" />
                                </div>

                                {/* Employment */}
                                <h5>Employment Details</h5>

                                <div className="form-group">
                                    <label>Employment Status*</label>
                                    <Field as="select" name="employmentStatus" className="form-control">
                                        <option value="">Select Status</option>
                                        <option value="1">Salaried</option>
                                        <option value="2">Self-Employed</option>
                                    </Field>
                                    <ErrorMessage name="employmentStatus" component="p" className="error-text" />
                                </div>

                                {/* Salaried Fields */}
                                {values.employmentStatus === "1" && (
                                    <>
                                        <div className="form-group">
                                            <label>Employer Name*</label>
                                            <Field name="employerName" className="form-control" />
                                            <ErrorMessage name="employerName" component="p" className="error-text" />
                                        </div>

                                        <div className="form-group">
                                            <label>Office Pincode*</label>
                                            <Field name="officePincode" className="form-control" />
                                            <ErrorMessage name="officePincode" component="p" className="error-text" />
                                        </div>

                                        <div className="form-group">
                                            <label>Monthly Income*</label>
                                            <Field name="income" type="number" className="form-control" placeholder="₹" />
                                            <ErrorMessage name="income" component="p" className="error-text" />
                                        </div>
                                    </>
                                )}

                                {/* Self-employed Fields */}
                                {values.employmentStatus === "2" && (
                                    <>
                                        <div className="form-group">
                                            <label>Business Proof*</label>
                                            <Field
                                                as="select"
                                                name="businessProof"
                                                className="form-control"
                                                onChange={(e) => handleBusinessProofChange(e, setFieldValue)}
                                            >
                                                <option value="">Select Proof</option>
                                                <option value="1">GST</option>
                                                <option value="2">Shop and Establishment</option>
                                                <option value="3">Municipal Establishment</option>
                                                <option value="4">Palika Gram Panchayat</option>
                                                <option value="5">Udyog Aadhaar</option>
                                                <option value="6">Drug License</option>
                                                <option value="7">Other</option>
                                                <option value="8">No Business Proof</option>
                                            </Field>
                                            <ErrorMessage name="businessProof" component="p" className="error-text" />
                                        </div>

                                        <div className="form-group">
                                            <label>Monthly Income*</label>
                                            <Field name="income" type="number" className="form-control" placeholder="₹" />
                                            <ErrorMessage name="income" component="p" className="error-text" />
                                        </div>
                                    </>
                                )}

                                {/* Additional Details */}
                                {showBusinessDetails && (
                                    <>
                                        <div className="form-group">
                                            <label>Residence Type*</label>
                                            <Field as="select" name="residence" className="form-control">
                                                <option value="">Select Type</option>
                                                <option value="1">Rented</option>
                                                <option value="2">Owned</option>
                                            </Field>
                                            <ErrorMessage name="residence" component="p" className="error-text" />
                                        </div>

                                        <div className="form-group">
                                            <label>Current Turnover*</label>
                                            <Field as="select" name="turnover" className="form-control">
                                                <option value="">Select</option>
                                                <option value="1">Upto 6 lacs</option>
                                                <option value="2">6-12 lacs</option>
                                                <option value="3">12-20 lacs</option>
                                                <option value="4">More than 20 lacs</option>
                                            </Field>
                                            <ErrorMessage name="turnover" component="p" className="error-text" />
                                        </div>

                                        <div className="form-group">
                                            <label>Years In Business*</label>
                                            <Field as="select" name="years" className="form-control">
                                                <option value="">Select</option>
                                                <option value="1">Less than one year</option>
                                                <option value="2">1 to 2 years</option>
                                                <option value="3">More than 2 years</option>
                                            </Field>
                                            <ErrorMessage name="years" component="p" className="error-text" />
                                        </div>

                                        <div className="form-group">
                                            <label>Do you have a Current Account in the name of Business?*</label>
                                            <div>
                                                <label>
                                                    <Field type="radio" name="currentAcc" value="1" /> Yes
                                                </label>
                                                <label className="ms-3">
                                                    <Field type="radio" name="currentAcc" value="2" /> No
                                                </label>
                                            </div>
                                            <ErrorMessage name="currentAcc" component="p" className="error-text" />
                                        </div>
                                    </>
                                )}

                                {/* Consent */}
                                <div className="form-group">
                                    <label htmlFor="consent" style={{ textAlign: "justify", display: "block" }}>
                                        <Field type="checkbox" name="consent" id="consent" />
                                        &nbsp;  In addition to any consent you may give pursuant to the Privacy Policy, you hereby consent to (a) Lenders retrieving your credit score from third party providers for the purpose of evaluating your eligibility for a Credit Facility; (b) Lenders sharing your credit score with Little Money; (c) Little Money sharing the Transaction information with its affiliates and Lenders. For the avoidance of doubt, Creditlinks does not retrieve your credit score from any source.

                                    </label>
                                    <ErrorMessage name="consent" component="p" className="error-text" />
                                </div>

                                {/* Submit */}
                                <button type="submit" className="axil-btn btn-fill-primary btn-fluid btn-primary" disabled={loading}
                                >
                                    {loading ? (
                                        <FullScreenLoader/>
                                    ) : (
                                        'Submit'
                                    )}
                                </button>
                            </Form>
                        )}

                    </Formik>
                    <Modal show={showModal} centered className="border-2 bg-blend-color-burn">
                        <Modal.Body className="text-center">
                            <p className="mb-4">
                                <i className="fas fa-exclamation-circle fa-3x text-danger "></i>
                            </p>
                            <p className="font-weight-bold">
                                Our system has detected more than 30 minutes of inactivity. For security reasons, you will be logged out in{" "}
                                <span className="font-weight-bolder">{countdown}</span> seconds.
                            </p>
                        </Modal.Body>
                    </Modal>

                </div>
            </div>
        </div>
    );
}
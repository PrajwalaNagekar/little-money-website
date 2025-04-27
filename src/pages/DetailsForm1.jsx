"use client"

import { useEffect, useState } from "react"
import { Formik, Form, Field, ErrorMessage } from "formik"
import * as Yup from "yup"
import { useLocation, useParams } from "react-router-dom"
import { useNavigate } from "react-router-dom"
import { getPersonalLoanDetailsByLeadId, lead } from "../api/Website/index"
import { getOffersByLeadId } from "../api/Website/index"
import { Modal } from "react-bootstrap"
import useAutoLogout from "../hooks/useAutoLogout.jsx"
import FullScreenLoader from "../component/loader/FullScreenLoader.jsx"

const currentYear = new Date().getFullYear()

const validationSchema = Yup.object({
    pan: Yup.string()
        .matches(/^[A-Z]{5}[0-9]{4}[A-Z]$/, "required PAN format(ABCDE1234F)")
        .required("PAN is required"),
    day: Yup.number()
        .nullable()
        .test("complete-dob", "Birth Date (Day, Month, and Year) is required", function (value) {
            const { month, year } = this.parent
            return value && month && year
        })
        .test("valid-age", "Age must be between 22 and 55", function (day) {
            const { month, year } = this.parent
            if (!day || !month || !year) return false

            const birthDate = new Date(year, month - 1, day)
            const today = new Date()

            let age = today.getFullYear() - birthDate.getFullYear()
            const m = today.getMonth() - birthDate.getMonth()
            if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
                age--
            }

            return age >= 22 && age <= 55
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
            schema.matches(/^\d{6}$/, "Office Pincode must be 6 digits").required("Office Pincode is required"),
    }),
    income: Yup.number()
        .typeError("Income must be a number")
        .required("Monthly Income is required")
        .when('employmentStatus', {
            is: '2',
            then: (schema) =>
                schema.min(25000, "Income must be at least ₹25,000 for self-employed"),
            otherwise: (schema) =>
                schema.min(15000, "Income must be at least ₹15,000 for salaried"),
        }),
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
})

// Default initial values
const defaultInitialValues = {
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
    showBusinessDetails: false,
}

// Function to save form data to localStorage
// const saveFormData = (formData) => {
//     localStorage.setItem("formData", JSON.stringify(formData))
// }

export default function FormikForm() {
    const { userId } = useParams()
    const location = useLocation()
    const data = location.state
    // console.log("data from otp page",data);

    const { userData, edit, sentLeadFromOtp } = location.state || {}
    console.log("🚀 ~ FormikForm ~ userData:", userData)
    console.log("🚀 ~ FormikForm ~ edit:", edit)
    console.log("🚀 ~ FormikForm ~ leadFromOtp:", sentLeadFromOtp)

    const { leadId, mobileNumber, firstName, lastName } = userData || {}
    // localStorage.setItem("mobileNumber",mobileNumber)
    // localStorage.setItem("firstName",firstName)
    // localStorage.setItem("lastName",lastName)
    // const ph=localStorage.getItem("mobileNumber")
    // const fn=localStorage.getItem("firstName")
    // const ln=localStorage.getItem("lastName")

    const ph = localStorage.getItem("mobileNumber");
    const fn = localStorage.getItem("firstName");
    const ln = localStorage.getItem("lastName");


    console.log(mobileNumber, firstName, lastName);
    const navigate = useNavigate()
    const [leadIdLocal, setLeadIdLocal] = useState(() => {
        return localStorage.getItem('leadId') || '';
    });
    console.log("🚀 ~ const[leadIdLocal,setLeadIdLocal]=useState ~ leadIdLocal:", localStorage.getItem('leadId'))


    const [loading, setLoading] = useState(false)
    const [isDataLoading, setIsDataLoading] = useState(true)
    const [showBusinessDetails, setShowBusinessDetails] = useState(false)
    const [initialValues, setInitialValues] = useState(defaultInitialValues)

    const { referralCode } = useParams()
    const finalReferralCode = referralCode || localStorage.getItem("referral_code")

    // Parse date string into day, month, year
    const parseDateString = (dateString) => {
        if (!dateString) return { day: "", month: "", year: "" }

        try {
            const date = new Date(dateString)
            return {
                day: date.getDate(),
                month: date.getMonth() + 1,
                year: date.getFullYear(),
            }
        } catch (error) {
            console.error("Error parsing date:", error)
            return { day: "", month: "", year: "" }
        }
    }

    const fetchPersonalData = async () => {

        try {
            setIsDataLoading(true)
            console.log("before response")
            const response = await getPersonalLoanDetailsByLeadId(leadIdLocal || sentLeadFromOtp)
            console.log("🚀 ~ fetchPersonalData ~ response:", response)
            const data = response.data || response // Handle different response formats
            console.log("Fetched Personal Loan Data:", data)

            // Check if business details should be shown
            const businessProofValue = data.businessRegistrationType?.toString() || ""
            const shouldShowBusinessDetails =
                data.employmentStatus === 2 &&
                businessProofValue &&
                Number.parseInt(businessProofValue) >= 1 &&
                Number.parseInt(businessProofValue) <= 7

            setShowBusinessDetails(shouldShowBusinessDetails)

            // Parse date components if dob exists
            const dateComponents = parseDateString(data.dob)

            // Update initial values with fetched data
            setInitialValues({
                mobileNumber: ph,
                firstName: fn,
                lastName: ln,
                pan: data.pan || "",
                day: dateComponents.day,
                month: dateComponents.month,
                year: dateComponents.year,
                email: data.email || "",
                pincode: data.pincode || "",
                employmentStatus: data.employmentStatus?.toString() || "",
                employerName: data.employerName || "",
                officePincode: data.officePincode || "",
                income: data.monthlyIncome?.toString() || "",
                businessProof: businessProofValue,
                residence: data.residenceType?.toString() || "",
                turnover: data.businessCurrentTurnover?.toString() || "",
                years: data.businessYears?.toString() || "",
                currentAcc: data.businessAccount?.toString() || "",
                consent: false,
                showBusinessDetails: shouldShowBusinessDetails,
            })
        } catch (error) {
            console.error("Failed to fetch personal loan data:", error)
        } finally {
            setIsDataLoading(false)
        }
    }


    // Fetch personal data when component mounts
    useEffect(() => {
        fetchPersonalData()
    }, [leadIdLocal])

    // Save referral code to localStorage
    useEffect(() => {
        if (finalReferralCode) {
            localStorage.setItem("referral_code", finalReferralCode)
        }
        fetchPersonalData()
    }, [finalReferralCode])

    // Check for token and redirect if not present
    useEffect(() => {
        const token = localStorage.getItem("token")
        if (!token) {
            navigate("/personal-loan/:referralCode?")
        }
    }, [navigate])

    const handleBusinessProofChange = (e, setFieldValue) => {
        const selected = e.target.value
        setFieldValue("businessProof", selected)

        const shouldShowDetails = selected !== "8" && selected !== ""
        setShowBusinessDetails(shouldShowDetails)
        setFieldValue("showBusinessDetails", shouldShowDetails)

        // Save to localStorage
        // const currentValues = JSON.parse(localStorage.getItem("formData")) || {}
        // saveFormData({
        //     ...currentValues,
        //     businessProof: selected,
        //     showBusinessDetails: shouldShowDetails,
        // })
    }

    const { showModal, countdown } = useAutoLogout(60 * 30 * 1000) // 30 min

    // Show loading state while fetching data
    if (isDataLoading) {
        return (
            <div className="section section-padding">
                <div className="row d-flex justify-content-center">
                    <div className="col-xl-7 col-lg-6">
                        <div className="text-center">
                            <FullScreenLoader />
                            <p>Loading your information...</p>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    return (
        <div className="section section-padding">
            <div className="row d-flex justify-content-center">
                <div className="col-xl-7 col-lg-6">
                    <Formik
                        initialValues={initialValues}
                        validationSchema={validationSchema}
                        enableReinitialize={true}
                        onSubmit={async (values) => {
                            console.log("Submitted values:", values)
                            const isSalaried = Number(values.employmentStatus) === 1
                            const isSelfEmployed = Number(values.employmentStatus) === 2
                            const hasValidBusinessProof = Number(values.businessProof) >= 1 && Number(values.businessProof) <= 7
                            const personaLLoanFormData = {
                                mobileNumber: location.state?.mobileNumber || ph,
                                firstName: location.state?.firstName || fn,
                                lastName: location.state?.lastName || ln,
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
                                ...(isSelfEmployed &&
                                    hasValidBusinessProof && {
                                    businessRegistrationType: Number(values.businessProof),
                                    residenceType: Number(values.residence),
                                    businessCurrentTurnover: Number(values.turnover),
                                    businessYears: Number(values.years),
                                    businessAccount: Number(values.currentAcc),
                                }),
                                ...(location.state?.referal &&
                                    location.state.referal.trim() !== "" && {
                                    referal: location.state.referal.trim(),
                                }),
                            }

                            // Save form data to localStorage
                            // saveFormData(values)
                            // localStorage.removeItem("formData")


                            try {
                                setLoading(true)
                                // API call to submit form data
                                const response = await lead(personaLLoanFormData)
                                console.log(response)
                                if (response.success === true) {
                                    const leadId = response.leadId
                                    console.log(leadId)
                                    const offersResponse = await getOffersByLeadId(leadId)
                                    localStorage.setItem("leadId", leadId)
                                    console.log("Offers response:", offersResponse)

                                    if (finalReferralCode) {
                                        navigate(`/user-detail/offers/${referralCode}`, {
                                            state: { offers: offersResponse.offers, ...data },
                                        })
                                    } else {
                                        navigate(`/user-detail/offers`, {
                                            state: { offers: offersResponse.offers, ...data },
                                        })
                                    }
                                } else {
                                    console.error("Lead creation failed:", response.message)
                                }
                            } catch (error) {
                                console.error("Error occurred during lead creation:", error)
                            }
                            setLoading(false)
                        }}
                    >
                        {({ values, setFieldValue }) => (
                            <Form className="contact-form-box">
                                <h5>Personal Information</h5>

                                {/* PAN */}
                                <div className="form-group">
                                    <label>PAN*</label>
                                    <Field name="pan">
                                        {({ field, form }) => (
                                            <input
                                                {...field}
                                                className="form-control"
                                                placeholder="Ex. ABCDE1234F"
                                                onChange={(e) => {
                                                    const uppercased = e.target.value.toUpperCase()
                                                    form.setFieldValue("pan", uppercased)
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
                                                "January",
                                                "February",
                                                "March",
                                                "April",
                                                "May",
                                                "June",
                                                "July",
                                                "August",
                                                "September",
                                                "October",
                                                "November",
                                                "December",
                                            ].map((month, index) => (
                                                <option key={index} value={index + 1}>
                                                    {month}
                                                </option>
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
                                    <Field name="pincode" className="form-control" type="text"
                                        maxLength={6}
                                        inputMode="numeric" />
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
                                {values.showBusinessDetails && (
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
                                        &nbsp; In addition to any consent you may give pursuant to the Privacy Policy, you hereby consent to
                                        (a) Lenders retrieving your credit score from third party providers for the purpose of evaluating
                                        your eligibility for a Credit Facility; (b) Lenders sharing your credit score with Little Money; (c)
                                        Little Money sharing the Transaction information with its affiliates and Lenders. For the avoidance
                                        of doubt, Creditlinks does not retrieve your credit score from any source.
                                    </label>
                                    <ErrorMessage name="consent" component="p" className="error-text" />
                                </div>

                                {/* Submit */}
                                <button type="submit" className="axil-btn btn-fill-primary btn-fluid btn-primary" disabled={loading}>
                                    {loading ? <FullScreenLoader /> : "Look For Offers"}
                                </button>
                            </Form>
                        )}
                    </Formik>

                    <Modal show={showModal} centered className="border-2 bg-blend-color-burn">
                        <Modal.Body className="text-center">
                            <p className="mb-4">
                                <i className="fas fa-exclamation-circle fa-3x text-danger"></i>
                            </p>
                            <p className="font-weight-bold">
                                Our system has detected more than 30 minutes of inactivity. For security reasons, you will be logged out
                                in <span className="font-weight-bolder">{countdown}</span> seconds.
                            </p>
                        </Modal.Body>
                    </Modal>
                </div>
            </div>
        </div>
    )
}

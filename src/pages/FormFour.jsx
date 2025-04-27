import React, { useEffect, useState } from "react"
import { useLocation, useNavigate, useParams } from "react-router-dom"
import { getBusinessDetailsByLeadId, getOffersByLeadId, leadApiBusinessLoan } from "../api/Website"
import useAutoLogout from "../hooks/useAutoLogout.jsx"
import { Modal } from "react-bootstrap"

const FormFour = () => {
  const [formData, setFormData] = useState({
    businessProof: "",
    employmentStatus: "",
    nestedBusinessProof: "",
    agreed: false,
    monthlyIncome: "",
    day: "",
    month: "",
    year: "",
    pan: "",
    email: "",
    pincode: "",
    // city: '',
    residenceType: "",
    turnover: "",
    yearsInBusiness: "",
    hasCurrentAccount: "",
    employerName: "",
    officePincode: "",

  })

  const businessProofOptions = [
    "GST",
    "Shop and Establishment",
    "Municipal Establishment",
    "Palika Gram Panchayat",
    "Udyog Aadhaar",
    "Drug License",
    "Other",
    "No Business Proof",
  ]

  const { showModal, countdown } = useAutoLogout(60 * 30 * 1000) // 30 min

  ///To get referal code
  const { referralCode } = useParams()

  const finalReferralCode = referralCode || localStorage.getItem("referral_code")
  console.log(finalReferralCode)
  useEffect(() => {
    if (finalReferralCode) {
      localStorage.setItem("referral_code", finalReferralCode)
    }
  }, [finalReferralCode])

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    })
    if (name === 'monthlyIncome') {
      if (!value) {
        setErrors(prevErrors => ({
          ...prevErrors,
          monthlyIncome: 'Monthly Income is required',
        }));
      } else if (Number(value) < 25000) {
        setErrors(prevErrors => ({
          ...prevErrors,
          monthlyIncome: 'Monthly Income must be at least 25000',
        }));
      } else {
        setErrors(prevErrors => ({
          ...prevErrors,
          monthlyIncome: '',
        }));
      }
    }
    // Clear error for this field when user makes a change
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: "",
      })
    }
  }

  ///to get the token
  useEffect(() => {
    const token = localStorage.getItem("token")
    // const leadId = localStorage.getItem("leadId");

    if (!token) {
      navigate("/business-loan/:referralCode?") // or show an error
    }
  }, [])

  const navigate = useNavigate()
  const location = useLocation()
  const { edit, userData, sentLeadFromOtp } = location.state || {}
  console.log("userdata", userData)
  const { mobileNumber, firstName, lastName } = userData || {}
  console.log(mobileNumber, firstName, lastName)

  const data = location.state
  console.log("Received user data:", data)
  const isFirstSeven = (value) => ["1", "2", "3", "4", "5", "6", "7"].includes(value)
  const isNoProof = (value) => value === "8"

  const showBusinessFields = isFirstSeven(formData.businessProof)
  const showNoBusinessProofFields = isNoProof(formData.businessProof)
  const showNestedBusinessFields = isFirstSeven(formData.nestedBusinessProof)

  const isSalaried = formData.employmentStatus === "1"
  const isSelfEmployed = formData.employmentStatus === "2"
  const [errors, setErrors] = React.useState({})
  const [formSubmitted, setFormSubmitted] = useState(false)

  const validatePan = (value) => {
    const panRegex = /^[A-Z]{3}[PFCHATLJGBE][A-Z][0-9]{4}[A-Z]$/
    return panRegex.test(value)
  }

  const isValidDOB = (day, month, year) => {
    // Check if the month is valid (1-12)
    if (month < 1 || month > 12) return false

    // Create a Date object with the provided day, month (adjusted for 0-based index), and year
    const birthDate = new Date(year, month - 1, day) // Month is 0-based in JavaScript Date
    const today = new Date()

    // Calculate age
    const age = today.getFullYear() - birthDate.getFullYear()
    const monthDiff = today.getMonth() - birthDate.getMonth()
    const dayDiff = today.getDate() - birthDate.getDate()

    // Validate the day, month, and year from the Date object
    if (
      birthDate.getDate() !== Number(day) ||
      birthDate.getMonth() !== month - 1 || // Adjust for zero-based month
      birthDate.getFullYear() !== Number(year)
    )
      return false

    // Check if the age is between 22 and 55
    if (
      age > 55 ||
      age < 22 ||
      (age === 55 && (monthDiff > 0 || (monthDiff === 0 && dayDiff > 0))) ||
      (age === 22 && (monthDiff < 0 || (monthDiff === 0 && dayDiff < 0)))
    )
      return false

    return true
  }

  //for fetching the data
  const [leadIdLocal, setLeadIdLocal] = useState(() => {
    return localStorage.getItem('leadId') || '';
  });
  useEffect(() => {
    const fetchBusinessLoanData = async () => {
      try {
        if (edit) {
          const response = await getBusinessDetailsByLeadId(leadIdLocal)
          console.log("get details by leadid", response)
          console.log("businessProof", response.businessProof)
          console.log("turn", response.businessCurrentTurnover)
          console.log("b reg type", response.businessRegistrationType)

          // businessProofOptions[(response.businessRegistrationType || 1) - 1] || "",
          const dob = response.dob || "";
          let day = "", month = "", year = "";

          if (dob) {
            const parts = dob.split("-");
            if (parts.length === 3) {
              year = parts[0];
              month = parseInt(parts[1]); // Ensure month is 1-12 as number
              day = parts[2];
            }
          }

          setFormData({
            mobileNumber,
            firstName,
            lastName,
            businessRegistrationType: response.businessRegistrationType || "",
            businessProof: response.businessRegistrationType || "",
            employmentStatus: response.employmentStatus || "",
            monthlyIncome: response.monthlyIncome || "",
            dob: response.dob || "",
            day, // Resetting day to empty, ensure it's updated later
            month, // Resetting month to empty, ensure it's updated later
            year, // Resetting year to empty, ensure it's updated later
            pan: "", // Resetting PAN to empty, ensure it's updated later
            email: response.email || "",
            pincode: response.pincode || "",
            residenceType: response.residenceType || "",
            turnover: response.businessCurrentTurnover || "",
            yearsInBusiness: response.businessYears || "",
            hasCurrentAccount: String(response.businessAccount || ""),
            referal: finalReferralCode,

          })
        }
      } catch (error) {
        console.log(error)
      }
    }
    fetchBusinessLoanData()
  }, [edit])

  const validateForm = () => {
    const newErrors = {}

    // Validate business proof
    if (!formData.businessProof) {
      newErrors.businessProof = "Business Registration Type is required"
    }

    // Validate PAN
    if (!formData.pan) {
      newErrors.pan = "PAN is required"
    } else if (!validatePan(formData.pan)) {
      newErrors.pan = "Invalid PAN format (e.g., ABCPA1234K)"
    }

    // Validate Email
    if (!formData.email) {
      newErrors.email = "Email is required"
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Invalid email format"
    }

    // Validate Pincode
    if (!formData.pincode) {
      newErrors.pincode = "Pincode is required"
    } else if (!/^\d{6}$/.test(formData.pincode)) {
      newErrors.pincode = "Pincode must be 6 digits"
    }

    // Validate DOB
    if (!formData.day || !formData.month || !formData.year) {
      newErrors.dob = "Complete birth date is required"
    } else if (!isValidDOB(formData.day, formData.month, formData.year)) {
      newErrors.dob = "Invalid DOB or Age not between 22 and 55"
    }

    // Validate fields based on business proof type
    if (showBusinessFields || showNoBusinessProofFields) {
      // Validate residence type
      if (!formData.residenceType) {
        newErrors.residenceType = "Residence Type is required"
      }

      // Validate turnover
      if (!formData.turnover) {
        newErrors.turnover = "Current Turnover is required"
      }

      // Validate years in business
      if (!formData.yearsInBusiness) {
        newErrors.yearsInBusiness = "Years in Business is required"
      }

      // Validate current account
      if (!formData.hasCurrentAccount) {
        newErrors.hasCurrentAccount = "Please select Yes or No"
      }

      // Validate monthly income
      if (!formData.monthlyIncome) {
        newErrors.monthlyIncome = "Monthly Income is required"
      } else if (Number(formData.monthlyIncome) < 25000) {
        newErrors.monthlyIncome = "Monthly Income must be at least ₹25,000"
      }
    }

    // Validate consent
    if (!formData.agreed) {
      newErrors.agreed = "You must agree to the terms to proceed"
    }

    return newErrors
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setFormSubmitted(true)

    const validationErrors = validateForm()

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors)
      // Scroll to the first error
      const firstErrorField = Object.keys(validationErrors)[0]
      const element = document.getElementsByName(firstErrorField)[0]
      if (element) {
        element.scrollIntoView({ behavior: "smooth", block: "center" })
      }
      return
    }

    // Clear errors if validation passes
    setErrors({})

    const payload = {
      mobileNumber: location.state?.mobileNumber || mobileNumber,
      firstName: location.state?.firstName || firstName,
      lastName: location.state?.lastName || lastName,
      email: formData.email,
      pincode: formData.pincode,
      pan: formData.pan,
      dob: `${formData.year}-${String(formData.month).padStart(2, "0")}-${String(formData.day).padStart(2, "0")}`,
      consumerConsentDate: new Date().toISOString().split("T")[0], // Example
      consumerConsentIp: "127.0.0.1", // Replace with real IP
      businessRegistrationType: Number(formData.businessProof),
      employmentStatus:
        formData.employmentStatus === "1" || formData.employmentStatus === "2"
          ? Number(formData.employmentStatus)
          : "2",
      monthlyIncome: Number(formData.monthlyIncome),
      leadId: formData.leadId || undefined,
    }

    // Conditionally add fields based on businessRegistrationType & employmentStatus
    if (payload.businessRegistrationType !== 8) {
      if (formData.city) payload.city = formData.city
      if (formData.businessProof) payload.businessProof = Number(formData.businessProof)

      // Handle valid businessCurrentTurnover
      const validTurnovers = [1, 2, 3, 4]
      if (validTurnovers.includes(Number(formData.turnover))) {
        payload.businessCurrentTurnover = Number(formData.turnover)
      }

      // Handle valid businessYears
      const validYears = [1, 2]
      if (validYears.includes(Number(formData.yearsInBusiness))) {
        payload.businessYears = Number(formData.yearsInBusiness)
      }

      // Handle valid businessAccount
      const validAccounts = [1, 2]
      if (validAccounts.includes(Number(formData.hasCurrentAccount))) {
        payload.businessAccount = Number(formData.hasCurrentAccount)
      }

      if (formData.residenceType) payload.residenceType = Number(formData.residenceType)
    } else if (payload.employmentStatus === 2) {
      if (formData.businessProof) payload.businessProof = Number(formData.businessProof)
      // Same checks for businessCurrentTurnover, businessYears, businessAccount, residenceType
    }

    if (payload.employmentStatus === 1) {
      payload.employerName = formData.employerName
      payload.officePincode = formData.officePincode
    }

    try {
      const response = await leadApiBusinessLoan(payload)
      console.log("response from bl lead ", response)
      if (response.success === true) {
        const leadId = response.leadId
        console.log(leadId)
        const offersResponse = await getOffersByLeadId(leadId || sentLeadFromOtp)
        localStorage.setItem("leadId", leadId) // or mobileNumber
        console.log("Offers response:", offersResponse)

        if (finalReferralCode) {
          navigate(`/business-detail/offers/${referralCode}`, {
            state: { offers: offersResponse.offers, ...data },
          })
        } else {
          navigate(`/business-detail/offers`, {
            state: { offers: offersResponse.offers, ...data },
          })
        }
      } else {
        console.error("Lead creation failed:", response.message)
        setErrors({ api: response.message || "Lead creation failed. Please try again." })
      }
    } catch (error) {
      console.log(error)
      setErrors({ api: "An error occurred. Please try again." })
    }
  }

  return (
    <div className="container mt-5">
      <form onSubmit={handleSubmit} noValidate>
        {/* <h5 className="text-center mb-4">Business Registration Form</h5> */}

        {/* Business Proof Dropdown */}
        <div className="form-group mb-3">
          <label className="form-label">Business Registration Type*</label>
          <select
            className={`form-select ${formSubmitted && errors.businessProof ? "is-invalid" : ""}`}
            name="businessProof"
            value={formData.businessProof}
            onChange={handleChange}
          >
            <option value="">Select Type</option>
            {businessProofOptions.map((item, index) => (
              <option value={index + 1} key={index}>
                {item}
              </option>
            ))}
          </select>
          {formSubmitted && errors.businessProof && (
            <div className="invalid-feedback d-block text-danger">{errors.businessProof}</div>
          )}
        </div>

        {/* Fields for First 7 Business Proofs */}
        {showBusinessFields && (
          <>
            <div className="form-group mb-3">
              <h5>Personal Information</h5>
              <label className="form-label">PAN*</label>
              <input
                type="text"
                name="pan"
                placeholder="PAN"
                value={formData.pan}
                onChange={handleChange}
                className={`form-control ${formSubmitted && errors.pan ? "is-invalid" : ""}`}
                onInput={(e) => (e.target.value = e.target.value.toUpperCase())}
              />
              {formSubmitted && errors.pan && <div className="invalid-feedback d-block text-danger">{errors.pan}</div>}
            </div>

            <div className="form-group mb-3">
              <label className="form-label">Email*</label>
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
                className={`form-control ${formSubmitted && errors.email ? "is-invalid" : ""}`}
              />
              {formSubmitted && errors.email && (
                <div className="invalid-feedback d-block text-danger">{errors.email}</div>
              )}
            </div>

            <div className="form-group mb-3">
              <label className="form-label">Pincode*</label>
              <input
                type="text"
                name="pincode"
                placeholder="Pincode"
                value={formData.pincode}
                maxLength={6}
                onChange={handleChange}
                inputMode="numeric"
                className={`form-control ${formSubmitted && errors.pincode ? "is-invalid" : ""}`}
              />
              {formSubmitted && errors.pincode && (
                <div className="invalid-feedback d-block text-danger">{errors.pincode}</div>
              )}
            </div>

            <div className="form-group">
              <label>Birth Date*</label>
              <div className="input-group-container d-flex gap-2">

                <input type="number" name="day" placeholder="Day" onChange={handleChange} required className="form-control" value={formData.day}

                />

                <select name="month" onChange={handleChange} required className="form-control" value={formData.month}
                >
                  <option value="" >Month</option>
                  {["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"].map((m, i) => (
                    <option value={i + 1} key={i}>{m}</option>
                  ))}
                </select>
                <input type="number" name="year" placeholder="Year" onChange={handleChange} required className="form-control" value={formData.year}

                />
              </div>
              {errors.dob && <div className="text-danger">{errors.dob}</div>}

            </div>

            <div className="form-group mb-3">
              <h5>Business Information</h5>
              <label className="form-label">Residence Type*</label>
              <select
                name="residenceType"
                value={formData.residenceType}
                onChange={handleChange}
                className={`form-select ${formSubmitted && errors.residenceType ? "is-invalid" : ""}`}
              >
                <option value="">Residence Type</option>
                <option value="1">Rented</option>
                <option value="2">Owned</option>
              </select>
              {formSubmitted && errors.residenceType && (
                <div className="invalid-feedback d-block text-danger">{errors.residenceType}</div>
              )}
            </div>

            <div className="form-group mb-3">
              <label className="form-label">Current TurnOver*</label>
              <select
                name="turnover"
                value={formData.turnover}
                onChange={handleChange}
                className={`form-select ${formSubmitted && errors.turnover ? "is-invalid" : ""}`}
              >
                <option value="">Current Turnover</option>
                <option value="1">Up to 6 Lacs</option>
                <option value="2">6 - 12 Lacs</option>
                <option value="3">12 - 20 Lacs</option>
                <option value="4">More than 20 Lacs</option>
              </select>
              {formSubmitted && errors.turnover && (
                <div className="invalid-feedback d-block text-danger">{errors.turnover}</div>
              )}
            </div>

            <div className="form-group mb-3">
              <label className="form-label">Years In Business*</label>
              <select
                name="yearsInBusiness"
                value={formData.yearsInBusiness}
                onChange={handleChange}
                className={`form-select ${formSubmitted && errors.yearsInBusiness ? "is-invalid" : ""}`}
              >
                <option value="">Years in Business</option>
                <option value="1">Less than 1 year</option>
                <option value="2">1 - 2 years</option>
                <option value="3">More than 2 years</option>
              </select>
              {formSubmitted && errors.yearsInBusiness && (
                <div className="invalid-feedback d-block text-danger">{errors.yearsInBusiness}</div>
              )}
            </div>

            <div className="form-group mb-3">
              <label className="form-label d-block">Current Account in Business Name?*</label>
              <div className="form-check form-check-inline">
                <input
                  type="radio"
                  className={`form-check-input ${formSubmitted && errors.hasCurrentAccount ? "is-invalid" : ""}`}
                  name="hasCurrentAccount"
                  id="hasCurrentAccount-yes"
                  value="1"
                  checked={formData.hasCurrentAccount === "1"}
                  onChange={handleChange}
                />
                <label className="form-check-label" htmlFor="hasCurrentAccount-yes">
                  Yes
                </label>
              </div>
              <div className="form-check form-check-inline">
                <input
                  type="radio"
                  className={`form-check-input ${formSubmitted && errors.hasCurrentAccount ? "is-invalid" : ""}`}
                  name="hasCurrentAccount"
                  id="hasCurrentAccount-no"
                  value="2"

                  checked={formData.hasCurrentAccount === "2"}
                  onChange={handleChange}
                />
                <label className="form-check-label" htmlFor="hasCurrentAccount-no">
                  No
                </label>
              </div>
              {formSubmitted && errors.hasCurrentAccount && (
                <div className="invalid-feedback d-block text-danger">{errors.hasCurrentAccount}</div>
              )}
            </div>

            <div className="form-group mb-3">
              <label className="form-label">Monthly Income*</label>
              <input
                type="number"
                name="monthlyIncome"
                placeholder="Monthly Income"
                value={formData.monthlyIncome}
                min="25000"
                onChange={handleChange}
                className={`form-control ${errors.monthlyIncome ? "is-invalid" : ""}`}
              />
              {errors.monthlyIncome && (
                <div className="invalid-feedback d-block text-danger">{errors.monthlyIncome}</div>
              )}
            </div>
          </>
        )}

        {/* Fields for No Business Proof */}
        {showNoBusinessProofFields && (
          <>
            <h5>Personal Information</h5>
            <div className="form-group mb-3">
              <label className="form-label">PAN*</label>
              <input
                type="text"
                name="pan"
                placeholder="PAN"
                value={formData.pan}
                onChange={handleChange}
                className={`form-control ${formSubmitted && errors.pan ? "is-invalid" : ""}`}
                onInput={(e) => (e.target.value = e.target.value.toUpperCase())}
              />
              {formSubmitted && errors.pan && <div className="invalid-feedback d-block text-danger">{errors.pan}</div>}
            </div>

            <div className="form-group mb-3">
              <label className="form-label">Email*</label>
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
                className={`form-control ${formSubmitted && errors.email ? "is-invalid" : ""}`}
              />
              {formSubmitted && errors.email && (
                <div className="invalid-feedback d-block text-danger">{errors.email}</div>
              )}
            </div>

            <div className="form-group mb-3">
              <label className="form-label">Pincode*</label>
              <input
                type="number"
                name="pincode"
                placeholder="Pincode"
                value={formData.pincode}
                maxLength={6}
                onChange={handleChange}
                className={`form-control ${formSubmitted && errors.pincode ? "is-invalid" : ""}`}
              />
              {formSubmitted && errors.pincode && (
                <div className="invalid-feedback d-block text-danger">{errors.pincode}</div>
              )}
            </div>

            <div className="form-group">
              <label>Birth Date*</label>
              <div className="input-group-container d-flex gap-2">

                <input type="number" name="day" placeholder="Day" onChange={handleChange} required className="form-control"
                />

                <select name="month" onChange={handleChange} required className="form-control" >
                  <option value="" >Month</option>
                  {["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"].map((m, i) => (
                    <option value={i + 1} key={i}>{m}</option>
                  ))}
                </select>
                <input type="number" name="year" placeholder="Year" onChange={handleChange} required className="form-control"
                />
              </div>
              {errors.dob && <div className="text-danger">{errors.dob}</div>}

            </div>


            <h5>Business Information</h5>
            <div className="form-group mb-3">
              <label className="form-label">Employment Status*</label>
              <select
                name="employmentStatus"
                value={formData.employmentStatus}
                onChange={handleChange}
                className={`form-select ${formSubmitted && errors.employmentStatus ? "is-invalid" : ""}`}
              >
                <option value="2">Self Employed</option>
              </select>
              {formSubmitted && errors.employmentStatus && (
                <div className="invalid-feedback d-block text-danger">{errors.employmentStatus}</div>
              )}
            </div>

            <div className="form-group mb-3">
              <label className="form-label">Monthly Income*</label>
              <input
                type="number"
                name="monthlyIncome"
                placeholder="Monthly Income"
                value={formData.monthlyIncome}
                min="25001"
                onChange={handleChange}
                className={`form-control ${formSubmitted && errors.monthlyIncome ? "is-invalid" : ""}`}
              />
              {formSubmitted && errors.monthlyIncome && (
                <div className="invalid-feedback d-block text-danger">{errors.monthlyIncome}</div>
              )}
            </div>

            <div className="form-group mb-3">
              <label className="form-label">Residence Type*</label>
              <select
                name="residenceType"
                value={formData.residenceType}
                onChange={handleChange}
                className={`form-select ${formSubmitted && errors.residenceType ? "is-invalid" : ""}`}
              >
                <option value="">Select</option>
                <option value="1">Rented</option>
                <option value="2">Owned</option>
              </select>
              {formSubmitted && errors.residenceType && (
                <div className="invalid-feedback d-block text-danger">{errors.residenceType}</div>
              )}
            </div>

            <div className="form-group mb-3">
              <label className="form-label">Current Turnover*</label>
              <select
                name="turnover"
                value={formData.turnover}
                onChange={handleChange}
                className={`form-select ${formSubmitted && errors.turnover ? "is-invalid" : ""}`}
              >
                <option value="">Select</option>
                <option value="1">Up to 6 Lacs</option>
                <option value="2">6 - 12 Lacs</option>
                <option value="3">12 - 20 Lacs</option>
                <option value="4">More than 20 Lacs</option>
              </select>
              {formSubmitted && errors.turnover && (
                <div className="invalid-feedback d-block text-danger">{errors.turnover}</div>
              )}
            </div>

            <div className="form-group mb-3">
              <label className="form-label">Years in business*</label>
              <select
                name="yearsInBusiness"
                value={formData.yearsInBusiness}
                onChange={handleChange}
                className={`form-select ${formSubmitted && errors.yearsInBusiness ? "is-invalid" : ""}`}
              >
                <option value="">Select</option>
                <option value="1">Less than 1 year</option>
                <option value="2">1 - 2 years</option>
                <option value="3">More than 2 years</option>
              </select>
              {formSubmitted && errors.yearsInBusiness && (
                <div className="invalid-feedback d-block text-danger">{errors.yearsInBusiness}</div>
              )}
            </div>

            <div className="form-group mb-3">
              <label className="form-label d-block">Current Account in Business Name?*</label>
              <div className="form-check form-check-inline">
                <input
                  type="radio"
                  className={`form-check-input ${formSubmitted && errors.hasCurrentAccount ? "is-invalid" : ""}`}
                  name="hasCurrentAccount"
                  id="hasCurrentAccount-yes"
                  value="yes"
                  checked={formData.hasCurrentAccount === "yes"}
                  onChange={handleChange}
                />
                <label className="form-check-label" htmlFor="hasCurrentAccount-yes">
                  Yes
                </label>
              </div>
              <div className="form-check form-check-inline">
                <input
                  type="radio"
                  className={`form-check-input ${formSubmitted && errors.hasCurrentAccount ? "is-invalid" : ""}`}
                  name="hasCurrentAccount"
                  id="hasCurrentAccount-no"
                  value="no"
                  checked={formData.hasCurrentAccount === "no"}
                  onChange={handleChange}
                />
                <label className="form-check-label" htmlFor="hasCurrentAccount-no">
                  No
                </label>
              </div>
              {formSubmitted && errors.hasCurrentAccount && (
                <div className="invalid-feedback d-block text-danger">{errors.hasCurrentAccount}</div>
              )}
            </div>
          </>
        )}

        <div className="form-group mb-3">
          <div className="form-check">
            <input
              type="checkbox"
              className={`form-check-input ${formSubmitted && errors.agreed ? "is-invalid" : ""}`}
              name="agreed"
              id="agreed"
              checked={formData.agreed}
              onChange={handleChange}
            />
            <label className="form-check-label" htmlFor="agreed" style={{ textAlign: "justify", display: "block" }}>
              In addition to any consent you may give pursuant to the Privacy Policy, you hereby consent to (a) Lenders
              retrieving your credit score from third party providers for the purpose of evaluating your eligibility for
              a Credit Facility; (b) Lenders sharing your credit score with Little Money; (c) Little Money sharing the
              Transaction information with its affiliates and Lenders. For the avoidance of doubt, Little Money does not
              retrieve your credit score from any source.
            </label>
          </div>
          {formSubmitted && errors.agreed && (
            <div className="invalid-feedback d-block text-danger">{errors.agreed}</div>
          )}
        </div>

        {/* API Error Message */}
        {formSubmitted && errors.api && (
          <div className="alert alert-danger" role="alert">
            {errors.api}
          </div>
        )}

        <button type="submit" className="axil-btn btn-fill-primary btn-fluid btn-primary">
          Look For Offers
        </button>
      </form>
      <Modal show={showModal} centered className="border-2 bg-blend-color-burn">
        <Modal.Body.Body className="text-center">
          <p className="mb-4">
            <i className="fas fa-exclamation-circle fa-3x text-danger"></i>
          </p>
          <p className="font-weight-bold">
            Our system has detected more than 30 minutes of inactivity. For security reasons, you will be logged out
            in <span className="font-weight-bolder">{countdown}</span> seconds.
          </p>
        </Modal.Body.Body>

      </Modal>
    </div>
  )
}

export default FormFour

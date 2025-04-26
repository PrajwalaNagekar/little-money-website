import { Formik } from 'formik';
import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { getBusinessDetailsByLeadId, getOffersByLeadId, leadApiBusinessLoan } from '../api/Website';

const FormFour = () => {
  const [formData, setFormData] = useState({
    businessProof: '',
    employmentStatus: '',
    nestedBusinessProof: '',
    agreed: false,
    monthlyIncome: '',
    day: '',
    month: '',
    year: '',
    pan: '',
    email: '',
    pincode: '',
    // city: '',
    residenceType: '',
    turnover: '',
    yearsInBusiness: '',
    hasCurrentAccount: '',
    employerName: '',
    officePincode: '',
  });

  const businessProofOptions = [
    'GST',
    'Shop and Establishment',
    'Municipal Establishment',
    'Palika Gram Panchayat',
    'Udyog Aadhaar',
    'Drug License',
    'Other',
    'No Business Proof'
  ];

  ///To get referal code
  const { referralCode } = useParams();

  const finalReferralCode = referralCode || localStorage.getItem("referral_code");
  console.log(finalReferralCode);
  useEffect(() => {
    if (finalReferralCode) {
      localStorage.setItem("referral_code", finalReferralCode);
    }
  }, [finalReferralCode]);



  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
  };



  ///to get the token
  useEffect(() => {
    const token = localStorage.getItem("token");
    // const leadId = localStorage.getItem("leadId");

    if (!token) {
      navigate("/business-loan/:referralCode?"); // or show an error
    }
  }, []);



  const navigate = useNavigate();
  const location = useLocation();
  const { edit } = location.state || {};
  const data = location.state;
  console.log("Received user data:", data);
  const isFirstSeven = (value) => ['1', '2', '3', '4', '5', '6', '7'].includes(value);
  const isNoProof = (value) => value === '8';

  const showBusinessFields = isFirstSeven(formData.businessProof);
  const showNoBusinessProofFields = isNoProof(formData.businessProof);
  const showNestedBusinessFields = isFirstSeven(formData.nestedBusinessProof);

  const isSalaried = formData.employmentStatus === '1';
  const isSelfEmployed = formData.employmentStatus === '2';
  const [errors, setErrors] = React.useState({});

  const validatePan = (value) => {
    const panRegex = /^[A-Z]{3}[PFCHATLJGBE][A-Z][0-9]{4}[A-Z]$/;
    return panRegex.test(value);
  };

  const isValidDOB = (day, month, year) => {
    // Check if the month is valid (1-12)
    if (month < 1 || month > 12) return false;

    // Create a Date object with the provided day, month (adjusted for 0-based index), and year
    const birthDate = new Date(year, month - 1, day);  // Month is 0-based in JavaScript Date
    const today = new Date();

    // Calculate age
    const age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    const dayDiff = today.getDate() - birthDate.getDate();

    // Validate the day, month, and year from the Date object
    if (
      birthDate.getDate() !== Number(day) ||
      birthDate.getMonth() !== (month - 1) ||  // Adjust for zero-based month
      birthDate.getFullYear() !== Number(year)
    ) return false;

    // Check if the age is between 22 and 55
    if (
      age > 55 || age < 22 ||
      (age === 55 && (monthDiff > 0 || (monthDiff === 0 && dayDiff > 0))) ||
      (age === 22 && (monthDiff < 0 || (monthDiff === 0 && dayDiff < 0)))
    ) return false;

    return true;
  };

  //for fetching the data
  // const [businessLoanData, setBusinessLoanData] = useState(null);
  const leadId = localStorage.getItem("leadId");

  // useEffect(() => {

  //   const fetchBusinessLoanData = async () => {
  //     try {
  //       const response = await getBusinessDetailsByLeadId(leadId)
  //       console.log("bl details",response);

  //       setBusinessLoanData(response.data);
  //     } catch (error) {
  //       console.error('Error fetching business loan data:', error);
  //     }
  //   };

  //   if (leadId) {
  //     fetchBusinessLoanData();
  //   }
  // }, [leadId]);


  useEffect(() => {
    const fetchBusinessLoanData = async () => {
      try {
        if (edit) {
          const response = await getBusinessDetailsByLeadId(leadId)
          console.log("get details by leadid", response);
          console.log("businessProof", response.businessProof);


          setFormData({
            businessProof: response.businessProof,
            employmentStatus: response.employmentStatus,
            // nestedBusinessProof: response.nestedBusinessProof,
            agreed: false,
            monthlyIncome: response.monthlyIncome,
            day: '',
            month: '',
            year: '',
            pan: '',
            email: response.email,
            pincode: response.pincode,
            // city: '',
            residenceType: response.residenceType,
            turnover: response.businessCurrentTurnover,
            yearsInBusiness: response.yearsInBusiness,
            hasCurrentAccount: response.hasCurrentAccount,
            // employerName: '',
            // officePincode: '',
          })
        }
      } catch (error) {
        console.log(error);

      }
    }
    fetchBusinessLoanData()
  }, [edit]);


  const handleSubmit = async (e) => {
    e.preventDefault();

    const validationErrors = {};
    const {
      pan, day, month, year,
    } = formData;

    if (!formData.agreed) {
      setErrors((prev) => ({
        ...prev,
        agreed: 'You must agree to the terms to proceed.',
      }));
      return;
    }
    if (!validatePan(pan)) {
      validationErrors.pan = 'Invalid PAN format (e.g., ABCPA1234K)';
    }

    if (!isValidDOB(day, month, year)) {
      validationErrors.dob = 'Invalid DOB or Age not between 22 and 55';
    }

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
    } else {
      setErrors({});
      console.log(formData);

      const payload = {
        mobileNumber: location.state?.mobileNumber,
        firstName: location.state?.firstName,
        lastName: location.state?.lastName,
        email: formData.email,
        pincode: formData.pincode,
        pan: formData.pan,
        dob: `${formData.year}-${String(formData.month).padStart(2, '0')}-${String(formData.day).padStart(2, '0')}`,
        consumerConsentDate: new Date().toISOString().split('T')[0], // Example
        consumerConsentIp: '127.0.0.1', // Replace with real IP
        businessRegistrationType: Number(formData.businessProof),
        employmentStatus: formData.employmentStatus === "1" || formData.employmentStatus === "2"
          ? Number(formData.employmentStatus)
          : "2",
        monthlyIncome: Number(formData.monthlyIncome),
        leadId: formData.leadId || undefined,
      };

      // Conditionally add fields based on businessRegistrationType & employmentStatus
      if (payload.businessRegistrationType !== 8) {
        if (formData.city) payload.city = formData.city;
        if (formData.businessProof) payload.businessProof = Number(formData.businessProof);

        // Handle valid businessCurrentTurnover
        const validTurnovers = [1, 2, 3, 4];
        if (validTurnovers.includes(Number(formData.turnover))) {
          payload.businessCurrentTurnover = Number(formData.turnover);
        }

        // Handle valid businessYears
        const validYears = [1, 2];
        if (validYears.includes(Number(formData.yearsInBusiness))) {
          payload.businessYears = Number(formData.yearsInBusiness);
        }

        // Handle valid businessAccount
        const validAccounts = [1, 2];
        if (validAccounts.includes(Number(formData.hasCurrentAccount))) {
          payload.businessAccount = Number(formData.hasCurrentAccount);
        }

        if (formData.residenceType) payload.residenceType = Number(formData.residenceType);
      } else if (payload.employmentStatus === 2) {
        if (formData.businessProof) payload.businessProof = Number(formData.businessProof);
        // Same checks for businessCurrentTurnover, businessYears, businessAccount, residenceType
      }

      // if (formData.businessProof === 8 && formData.employmentStatus === 2) {
      //   payload.businessCurrentTurnover = Number(formData.turnover)
      //   payload.businessYears = Number(formData.yearsInBusiness);
      //   payload.businessAccount = Number(formData.hasCurrentAccount);
      // }

      if (payload.employmentStatus === 1) {
        payload.employerName = formData.employerName;
        payload.officePincode = formData.officePincode;
      }
      try {
        const response = await leadApiBusinessLoan(payload);
        console.log(response);
        if (response.success === true) {
          const leadId = response.leadId;
          console.log(leadId);
          const offersResponse = await getOffersByLeadId(leadId);
          localStorage.setItem("leadId", leadId); // or mobileNumber
          console.log("Offers response:", offersResponse);
          // navigate(`/personal-loan/verification/user-details/${userId}/offers/${leadId}`);
          if (finalReferralCode) {
            navigate(`/business-detail/offers/${referralCode}`, {
              state: { offers: offersResponse.offers, ...data, }
            });
          } else {
            navigate(`/business-detail/offers`, {
              state: { offers: offersResponse.offers, ...data, }
            });
          }
        } else {
          console.error('Lead creation failed:', response.message);
        }
      } catch (error) {
        console.log(error);
      }
    }

  };
  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   if (!formData.agreed) {
  //     alert('You must agree to the terms and conditions.');
  //     return;
  //   }
  //   console.log("form submitted", formData);

  // };

  return (
    <div className="container mt-5">

      <form onSubmit={handleSubmit}>
        <h5 className='text-center mb-4'>Business Registration Form</h5>

        {/* Business Proof Dropdown */}
        <label className="text-center mb-4">Business Registration Type*</label>
        <select className="form-select mb-3" name="businessProof" value={formData.businessProof} onChange={handleChange} required>
          <option value="">Select Type</option>
          {businessProofOptions.map((item, index) => (
            <option value={index + 1} key={index}>{item}</option>
          ))}
        </select>

        {/* Fields for First 7 Business Proofs */}
        {showBusinessFields && (
          <>

            <div className="form-group">
              <h5>Personal Information</h5>
              <label>PAN*</label>
              <input type="text" name="pan" placeholder="PAN" onChange={handleChange} className="form-control mb-2" required onInput={(e) => e.target.value = e.target.value.toUpperCase()} />
              {errors.pan && <div className="text-danger">{errors.pan}</div>}

            </div>
            <div className="form-group">

              <label>Email*</label>
              <input type="email" name="email" placeholder="Email*" value={formData.email} onChange={handleChange} required className="form-control mb-2" />
            </div>
            <div className="form-group">

              <label>Pincode*</label>

              <input type="text" name="pincode" placeholder="Pincode*" value={formData.pincode} maxLength={6} onChange={handleChange} required className="form-control mb-2" />
            </div>
            <div className="form-group">
              <label>Birth Date*</label>
              <div className="input-group-container">

                <input type="number" name="day" placeholder="Day" onChange={handleChange} required className="form-control"
                />

                <select name="month" onChange={handleChange} required>
                  <option value="" className="form-control"
                  >Month</option>
                  {["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"].map((m, i) => (
                    <option value={i + 1} key={i}>{m}</option>
                  ))}
                </select>
                <input type="number" name="year" placeholder="Year" onChange={handleChange} required className="form-control"
                />
              </div>
              {errors.dob && <div className="text-danger">{errors.dob}</div>}

            </div>
            {/* <div className="form-group">
              <label>City*</label>

              <input type="text" name="city" placeholder="City*" onChange={handleChange} required className="form-control mb-2" />
            </div> */}
            <div className="form-group">
              <h5>Business Information</h5>

              <label>Residence Type*</label>

              <select name="residenceType" onChange={handleChange} required className="form-control mb-2" value={formData.residenceType}>

                <option value="">Residence Type</option>
                <option value="1">Rented</option>
                <option value="2">Owned</option>
              </select>
            </div>
            <div className="form-group">
              <label>Current TurnOver*</label>

              <select name="turnover" onChange={handleChange} required className="form-control mb-2" value={formData.turnover}>

                <option value="">Current Turnover</option>
                <option value="1">Up to 6 Lacs</option>
                <option value="2">6 - 12 Lacs</option>
                <option value="3">12 - 20 Lacs</option>
                <option value="4">More than 20 Lacs</option>
              </select>

            </div>
            <div className="form-group">
              <label>Years In Business*</label>

              <select name="yearsInBusiness" onChange={handleChange} required className="form-control mb-2" value={formData.yearsInBusiness}>
                <option value="">Years in Business</option>
                <option value="1">Less than 1 year</option>
                <option value="2">1 - 2 years</option>
                <option value="3">More than 2 years</option>
              </select>
            </div>
            <div className="form-group">
              <label>Current Account in Business Name?</label>
              <label><input type="radio" name="hasCurrentAccount" value="1" onChange={handleChange} required /> Yes</label>
              <label><input type="radio" name="hasCurrentAccount" value="2" onChange={handleChange} required /> No</label>
            </div>
            <div className="form-group">
              <label>Monthly Income*</label>

              <input type="number" name="monthlyIncome" placeholder="Monthly Income*" min="25000" onChange={handleChange} required className="form-control mb-2" />
            </div>
          </>
        )}

        {/* Fields for No Business Proof */}
        {showNoBusinessProofFields && (
          <>
            <h5>Personal Information</h5>
            <div className="form-group">
              <label>PAN*</label>
              <input type="text" name="pan" placeholder="PAN*" onChange={handleChange} required className="form-control" onInput={(e) => e.target.value = e.target.value.toUpperCase()} />
              {errors.pan && <div className="text-danger">{errors.pan}</div>}

            </div>
            <div className="form-group">
              <label>Email*</label>

              <input type="email" name="email" placeholder="Email*" onChange={handleChange} required className="form-control" value={formData.email} />
            </div>

            <div className="form-group">
              <label>Pincode*</label>
              <input type="text" name="pincode" placeholder="Pincode*" maxLength={6} onChange={handleChange} required className="form-control" value={formData.pincode} />
            </div>
            <div>
              <div className="form-group">

                <label>Birth Date*</label>
                <div className="input-group-container">

                  <input type="number" name="day" placeholder="Day" onChange={handleChange} required className="form-control" />
                  <select name="month" onChange={handleChange} required>
                    <option value="" className="form-control">Month</option>
                    {["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"].map((m, i) => (
                      <option value={i + 1} key={i}>{m}</option>
                    ))}
                  </select>
                  <input type="number" name="year" placeholder="Year" onChange={handleChange} required className="form-control" />
                </div>
                {errors.dob && <div className="text-danger">{errors.dob}</div>}

              </div>
            </div>

            <h5>Business Information</h5>
            <div className="form-group">
              <label>Employment Status*</label>

              <select name="employmentStatus" value={formData.employmentStatus} onChange={handleChange} required className="form-control">
                <option value="">Status</option>
                {/* <option value="1">Salaried</option> */}
                <option value="2">Self Employed</option>
              </select>
            </div>

            {/* {isSalaried && (
              <>
                <div className="form-group">
                  <label>Employer Name*</label>

                  <input type="text" name="employerName" placeholder="Employer Name*" onChange={handleChange} required className="form-control" />
                </div>
                <div className="form-group">
                  <label>Office Pincode*</label>

                  <input type="text" name="officePincode" placeholder="Office Pincode*" maxLength={6} onChange={handleChange} required className="form-control" />
                </div>
                <div className="form-group">
                  <label>Monthly Income*</label>

                  <input type="number" name="monthlyIncome" placeholder="Monthly Income*" min="1500" onChange={handleChange} required className="form-control" />
                </div>
              </>
            )} */}

            {isSelfEmployed && (
              <>

                <div className="form-group">
                  <label>Monthly Income*</label>
                  <input type="number" name="monthlyIncome" placeholder="Monthly Income*" min="25001" onChange={handleChange} required className="form-select mb-3" value={formData.monthlyIncome} />
                </div>
                <div className="form-group">

                  <label className="text-center mb-4">Residence Type</label>
                  <select name="residenceType" onChange={handleChange} required className="form-select mb-3" value={formData.residenceType}>
                    <option value="">Select</option>
                    <option value="1">Rented</option>
                    <option value="2">Owned</option>
                  </select>
                </div>
                <div className="form-group">
                  <label className="text-center mb-4">Current Turnover</label>
                  <select name="turnover" onChange={handleChange} required className="form-select mb-3" value={formData.turnover}>
                    <option value="">Select</option>
                    <option value="1">Up to 6 Lacs</option>
                    <option value="2">6 - 12 Lacs</option>
                    <option value="3">12 - 20 Lacs</option>
                    <option value="4">More than 20 Lacs</option>
                  </select>
                </div>
                <div className="form-group">
                  <label className="text-center mb-4">Years in business</label>
                  <select name="yearsInBusiness" onChange={handleChange} required className="form-select mb-3" value={formData.yearsInBusiness}>
                    <option value="">Select</option>
                    <option value="1">Less than 1 year</option>
                    <option value="2">1 - 2 years</option>
                    <option value="3">More than 2 years</option>
                  </select>
                </div>
                <div>
                  <div className="form-group">

                    <label>Current Account in Business Name?</label>
                    <label><input type="radio" name="hasCurrentAccount" value="yes" onChange={handleChange} required /> Yes</label>
                    <label><input type="radio" name="hasCurrentAccount" value="no" onChange={handleChange} required /> No</label>
                  </div>
                </div>
                {/* <div className="form-group">

                  <label className="text-center mb-4">Business Proof</label>

                  <select name="nestedBusinessProof" onChange={handleChange} required className="form-select mb-3">
                    <option value="">Select Business Proof</option>
                    {businessProofOptions.map((item, index) => (
                      <option value={index + 1} key={index}>{item}</option>
                    ))}
                  </select>
                </div> */}

                {showNestedBusinessFields && (
                  <>

                  </>
                )}
              </>
            )}
          </>
        )}

        <div className="form-group">
          <div className="checkbox-container">
            <input type="checkbox" name="agreed" checked={formData.agreed} onChange={handleChange} id='agreed' />
            <label htmlFor="agreed" style={{ textAlign: "justify", display: "block" }}>
              In addition to any consent you may give pursuant to the Privacy Policy, you hereby consent to (a) Lenders retrieving your credit score from third party providers for the purpose of evaluating your eligibility for a Credit Facility; (b) Lenders sharing your credit score with Little Money; (c) Little Money sharing the Transaction information with its affiliates and Lenders. For the avoidance of doubt, Little Money does not retrieve your credit score from any source.
            </label>
          </div>
          {errors.agreed && <div className="text-danger">{errors.agreed}</div>}

        </div>

        <button type="submit" className="axil-btn btn-fill-primary btn-fluid btn-primary" onSubmit={handleSubmit}>Submit</button>
      </form >
    </div >
  );
};

export default FormFour;

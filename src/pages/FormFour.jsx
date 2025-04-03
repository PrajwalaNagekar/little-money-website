import React, { useState } from 'react'
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
  });
  const [errors, setErrors] = useState({});

  const registrationOptions = [
    "GST",
    "Shop and Establishment",
    "Municipal Establishment",
    "Palika Gram Panchayat",
    "Udyog Aadhaar",
    "Drug License",
    "Other",
    "No Business Proof"
  ];

  const showDetailsForm =
    registrationType && registrationType !== "No Business Proof" && registrationType !== "";

  const handleChange = (e) => {
    // setFormData({ ...formData, [e.target.name]: e.target.value });
    // setErrors({ ...errors, [e.target.name]: "" });
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

  };
  const validatePan = (value) => {
    const panRegex = /^[A-Z]{3}[PFCHATLJGBE][A-Z][0-9]{4}[A-Z]$/;
    return panRegex.test(value);
  };

  const validateForm = () => {
    const newErrors = {};
    if (showDetailsForm) {
      if (!formData.pan) {
        newErrors.pan = "PAN is required.";
      } else if (!validatePan(formData.pan)) {
        newErrors.pan = "Invalid PAN format. Example: ABCPA1234A.";
      }
      if (!formData.email) newErrors.email = "Email is required";
      if (!formData.pincode) newErrors.pincode = "Pincode is required";
      if (!formData.city) newErrors.city = "City is required";
      if (!formData.residence) newErrors.residence = "Residence Type is required";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Current Registration Type:", registrationType);

    if (validateForm()) {
      console.log("Submitted Data:", { registrationType, ...formData });
      setRegistrationType("");
      setFormData({ pan: "", email: "", pincode: "", city: "", residence: "" });
      setErrors({});
      console.log("Form Submitted!", formData);
      const redirectPath = registrationType === "No Business Proof" ? "/user-details2" : "/turn-over2";

      setTimeout(() => {
        navigate(redirectPath);
      }, 2000);
    }
  };
  return (
    <div className="container mt-5">
      <div className="card p-4 shadow-sm">
        <h4 className="text-center mb-4">Business Registration</h4>

        <select
          className="form-select mb-3"
          onChange={(e) => setRegistrationType(e.target.value)}
        >
          <option value="">Select Registration Type</option>
          {registrationOptions.map((option) => (
            <option key={option} value={option}>{option}</option>
          ))}
        </select>

        {showDetailsForm && (
          <div className="mb-3">
            <div className="form-group">
              <label>PAN</label>

              <input type="text" name="pan" className="form-control mb-2" placeholder="ABCDE1234F" value={formData.pan} onChange={handleChange} />
              {errors.pan && <div className="text-danger">{errors.pan}</div>}
            </div>
            <div className="form-group">
              <label>Email</label>

              <input type="email" name="email" className="form-control mb-2" placeholder="Email" value={formData.email} onChange={handleChange} />
              {errors.email && <div className="text-danger">{errors.email}</div>}
            </div>
            <div className="form-group">
              <label>Pincode</label>

              <input type="number" name="pincode" className="form-control mb-2" placeholder="Pincode" value={formData.pincode} onChange={handleChange} />
              {errors.pincode && <div className="text-danger">{errors.pincode}</div>}
            </div>
            <div className="form-group">
              <label>City</label>

              <input type="text" name="city" className="form-control mb-2" placeholder="City" value={formData.city} onChange={handleChange} />
              {errors.city && <div className="text-danger">{errors.city}</div>}
            </div>
            <div className="form-group">
              <label>Residence Type</label>
              <select name="residence" className="form-control" value={formData.residence} onChange={handleChange} >
                <option value="status">Select Type</option>
                <option value="owned">Owned</option>
                <option value="rented">Rented</option>
              </select>
              {errors.residence && <p className="error-text">{errors.residence}</p>}
            </div>
          </div>
        )}

        <button className="axil-btn btn-fill-primary btn-fluid btn-primary"
          disabled={!registrationType} onClick={handleSubmit}>
          Continue
        </button>
      </div>
    </div>
  )
}

export default FormFour
import React, { useState, useRef } from 'react'
import { useNavigate } from 'react-router-dom';
const TurnOverForm2 = () => {
     const navigate = useNavigate();
    
        const form = useRef();
    
        const [formData, setFormData] = useState({
            turnover: "",
            years: ""
        });
        const [hasCurrentAccount, setHasCurrentAccount] = useState(""); // Track radio selection
    
        const handleRadioChange = (e) => {
            setHasCurrentAccount(e.target.value);
        }; const [errors, setErrors] = useState({});
        const handleChange = (e) => {
            const { name, value } = e.target;
            setFormData((prev) => ({ ...prev, [name]: value }));
        };
        const validateForm = () => {
            let newErrors = {};
            if(!formData.residence||formData.residence=="status")  newErrors.residence = "residence type is required.";

            if (!formData.turnover || formData.turnover === "status") newErrors.turnover = "Employment status is required.";
            if (!formData.years || formData.years === "status") newErrors.turnover = "Employment status is required.";
            if (!hasCurrentAccount) newErrors.currentAcc = "Please select an option.";
    
            setErrors(newErrors);
            return Object.keys(newErrors).length === 0;
        }
        const handleSubmit = (e) => {
            e.preventDefault();
            if (validateForm()) {
                console.log("Form Submitted!", formData);
                    navigate("/business-loan/verification/business-details/turn-over2/offers");
            }
        };
  return (
    
    <div>
    <div className="section-padding ">
    <div className="row d-flex justify-content-center">
    <div className="col-xl-7 col-lg-6  contact-form-box">
                {/* <main className="main-wrapper"> */}
                <div className='container'>
                    <form ref={form} onSubmit={handleSubmit}>
                    <div className="form-group">
                                    <label>Residence Type*</label>
                                    <select name="residence" className="form-control" value={formData.residence} onChange={handleChange} >
                                        <option value="status">Select Type</option>
                                        <option value="owned">Owned</option>
                                        <option value="rented">Rented</option>
                                    </select>
                                    {errors.residence && <p className="error-text">{errors.residence}</p>}
                                </div>
                        <div className="form-group">
                            <label>Current TurnOver*</label>
                            <select name="turnover" className="form-control" value={formData.turnover} onChange={handleChange} required>
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
                            <select name="years" className="form-control" value={formData.years} onChange={handleChange} required>
                                <option value="status">Select Status</option>
                                <option value="less">Less than one year</option>
                                <option value="one">1 to 2 years</option>
                                <option value="more">More than 2 years</option>
                            </select>
                            {errors.years && <p className="error-text">{errors.years}</p>}
                        </div>
                        <div class="form-group">

                            <div className="radio-container">
                                <p>Do you have a Current Account in the name of Business?</p>

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
                            <button type="submit" className="axil-btn btn-fill-primary btn-fluid btn-primary">
                                Look for Offers
                            </button>
                        </div>
                    </form>
                </div>
                {/* </main> */}
            </div>
        </div>
    </div>
</div>
  )
}

export default TurnOverForm2
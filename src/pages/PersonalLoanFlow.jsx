import { useState } from "react";
import PersonalLoans from "./PersonalLoans"; // Step 1: Name, Phone
import OtpVerification from "./OtpVerification"; // Step 2
import UserDetails from "./UserDetails"; // Step 3
import ProjectGridFour from "./ProjectGridFour"; // Step 4

const PersonalLoanFlow = () => {
  const [step, setStep] = useState("initial"); // initial → otp → form → offers
  const [userId, setUserId] = useState(null);
  const [leadId, setLeadId] = useState(null);
  const [userFormData, setUserFormData] = useState({}); // name, phone, etc.

  // Step 1 -> PersonalLoans submit
  const handleBasicFormSubmit = (formData) => {
    setUserFormData(formData);
    setStep("otp");
  };

  // Step 2 -> OTP verified
  const handleOtpSuccess = (userIdFromBackend, isAlreadyRegistered, leadIdFromBackend) => {
    setUserId(userIdFromBackend);
    if (isAlreadyRegistered) {
      setLeadId(leadIdFromBackend);
      setStep("offers");
    } else {
      setStep("form");
    }
  };

  // Step 3 -> UserDetails submitted
  const handleFormSubmit = (leadIdFromBackend) => {
    setLeadId(leadIdFromBackend);
    setStep("offers");
  };

  return (
    <>
      {step === "initial" && (
        <PersonalLoans onSubmit={handleBasicFormSubmit} />
      )}
      {step === "otp" && (
        <OtpVerification
          formData={userFormData}
          onSuccess={handleOtpSuccess}
        />
      )}
      {step === "form" && (
        <UserDetails userId={userId} onSubmit={handleFormSubmit} />
      )}
      {step === "offers" && (
        <ProjectGridFour userId={userId} leadId={leadId} />
      )}
    </>
  );
};

export default PersonalLoanFlow;

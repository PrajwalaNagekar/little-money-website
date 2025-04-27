const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("leadId");
    localStorage.removeItem("referral_code");
    window.location.href = "/business-loan";
  };
  export default logout;
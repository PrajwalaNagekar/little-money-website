const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("leadId");
    window.location.href = "/personal-loan";
  };
  export default logout;
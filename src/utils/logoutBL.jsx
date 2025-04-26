const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("leadId");
    window.location.href = "/business-loan";
  };
  export default logout;
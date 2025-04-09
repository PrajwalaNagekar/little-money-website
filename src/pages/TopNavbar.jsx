import React from 'react';
import { Link } from 'react-router-dom';

const TopNavbar = () => {
  return (
    <div style={styles.navbar} className='topnav'>
      
      <div style={styles.centerContent}>
        {/* <span style={styles.contact}>97399 06066</span> */}
        {/* <div style={styles.divider}></div> */}
        <div style={styles.atoms}>
          <Link to='#' style={styles.link} >Merchant Login</Link>
          <div style={styles.divider}></div>
          <Link to='#' style={styles.link}>Merchant Signup</Link>
          <div style={styles.divider}></div>
          <Link to='' style={styles.link} >Customer Login</Link>
          <div style={styles.divider}></div>

          <Link to='/personal-loan' style={styles.link}>Personal Loan</Link>
          <div style={styles.divider}></div>

          <Link to='/business-loan' style={styles.link}>Business Loan</Link>

        </div>
      </div>
    </div>
  );
};

const styles = {
  navbar: {
    display: "flex",
    justifyContent: "space-around",
    alignItems: "center",
    backgroundColor: " rgb(7,0,78)", 
    color: "white",
    padding: "8px 15px", 
    fontSize: "14px",
    fontFamily: "Arial, sans-serif",
  },
  admissionText: {
    color: "#34d8eb",
    fontWeight: "bold",
    margin: "0",
    fontSize: "12px",
    flex: 1, 
  },
  centerContent: {
    display: "flex",
    alignItems: "center",
    gap: "8px",  // Reduced gap between phone number and merchant login
  },
  contact: {
    fontSize: "13px",
  },
  divider: {
    height: "15px",
    width: "1.5px",
    backgroundColor: "white",
    margin: "0 5px", 
  },
  atoms: {
    display: "flex",
    alignItems: "center",
    gap: "3px",  
    
  },
  link: {
    color: "white",
    textDecoration: "none",
    fontWeight: "bold",
    fontSize: "13px",
  },
  
};

export default TopNavbar;

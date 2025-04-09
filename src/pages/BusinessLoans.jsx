import React from 'react'
import SEO from '../common/SEO'
import ColorSwitcher from '../elements/switcher/ColorSwitcher'
import HeaderTwo from '../common/header/HeaderTwo'
import AboutTwo from '../component/about/AboutTwo'
import BusinessLoanForm from './BusinessLoanForm'
import TopNavbar from './TopNavbar'
import FormBusinessLoan from '../component/contact/FormBusinessLoan'
import FooterOne from '../common/footer/FooterOne'
const BusinessLoans = () => {
  return (
    <div>
      <SEO title="Service Details" />
      {/* <ColorSwitcher /> */}
      <main className="main-wrapper">
      {/* <TopNavbar/> */}

        <HeaderTwo />
        {/* <AboutTwo heading="Business Loan"/> */}
        
        <FormBusinessLoan />
        <FooterOne parentClass="" />

      </main>
    </div>
  )
}

export default BusinessLoans
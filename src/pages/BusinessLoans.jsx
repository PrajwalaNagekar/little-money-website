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

        <div className="section-padding">
          <div className="container ">
            <div className="row d-flex justify-content-center">
              <div className="col-xl-7 col-lg-6">
                <div className="contact-form-box">
                  {/* shadow-box */}
                  <h4 className="text-center">Start Your Loan Application Below</h4>
                  <FormBusinessLoan />
                </div>
              </div>
            </div>
          </div>
        </div>
        <FooterOne parentClass="" />

      </main>
    </div>
  )
}

export default BusinessLoans
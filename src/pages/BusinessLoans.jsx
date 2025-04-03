import React from 'react'
import SEO from '../common/SEO'
import ColorSwitcher from '../elements/switcher/ColorSwitcher'
import HeaderTwo from '../common/header/HeaderTwo'
import AboutTwo from '../component/about/AboutTwo'
import BusinessLoanForm from './BusinessLoanForm'
import TopNavbar from './TopNavbar'
const BusinessLoans = () => {
  return (
    <div>
      <SEO title="Service Details" />
      {/* <ColorSwitcher /> */}
      <main className="main-wrapper">
      <TopNavbar/>

        <HeaderTwo />
        {/* <AboutTwo heading="Business Loan"/> */}
        <BusinessLoanForm />
      </main>
    </div>
  )
}

export default BusinessLoans
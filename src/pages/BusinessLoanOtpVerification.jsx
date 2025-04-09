import React, { useRef, useState } from 'react'
import SEO from '../common/SEO';
import ColorSwitcher from '../elements/switcher/ColorSwitcher';
import HeaderTwo from '../common/header/HeaderTwo';
import OtpVerify1 from './OtpVerify1';
import BcrumbBannerOne from '../elements/breadcrumb/BcrumbBannerOne';
import FooterOne from '../common/footer/FooterOne';
import TopNavbar from './TopNavbar';
import OtpVerify2 from './OtpVerify2';
const BusinessLoanOtpVerification = () => {
  return (
    <>
              <SEO title="Service Details" />
              {/* <ColorSwitcher /> */}
              <main className="main-wrapper">
                {/* <TopNavbar/> */}
        <HeaderTwo />
        {/* <BcrumbBannerOne 
        styleClass=""
        /> */}
        <OtpVerify2/>
            
            </main>
            <FooterOne parentClass="" />

            </>
  )
}

export default BusinessLoanOtpVerification
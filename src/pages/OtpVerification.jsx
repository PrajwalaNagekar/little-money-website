import React, { useRef, useState } from 'react'
import SEO from '../common/SEO';
import ColorSwitcher from '../elements/switcher/ColorSwitcher';
import HeaderTwo from '../common/header/HeaderTwo';
import OtpVerify1 from './OtpVerify1';
import BcrumbBannerOne from '../elements/breadcrumb/BcrumbBannerOne';
import FooterOne from '../common/footer/FooterOne';
import TopNavbar from './TopNavbar';
const OtpVerification = () => {
  
    

    return (
        <>
              {/* <SEO title="Service Details" /> */}
              {/* <ColorSwitcher /> */}
              <main className="main-wrapper">
                {/* <TopNavbar/> */}
        <HeaderTwo />
        {/* <BcrumbBannerOne 
        styleClass=""
        /> */}
        <OtpVerify1/>
        <FooterOne parentClass="" />
            </main>
            {/* <FooterOne parentClass="" /> */}

            </>
            )
}

            export default OtpVerification
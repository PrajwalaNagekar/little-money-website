import React from 'react';
import FooterOne from '../common/footer/FooterOne';
import HeaderOne from '../common/header/HeaderOne';
import SEO from '../common/SEO';
import BcrumbBannerOne from '../elements/breadcrumb/BcrumbBannerOne';
import CtaLayoutOne from '../component/cta/CtaLayoutOne';
import ColorSwitcher from '../elements/switcher/ColorSwitcher';
import BrandItem from '../component/brand/BrandItem';
import HeaderTwo from '../common/header/HeaderTwo';
import TopNavbar from './TopNavbar';

const OurClients = () => {

    return (
        <>
        {/* <SEO title="Our Partners" /> */}
        {/* <ColorSwitcher /> */}
            <main className="main-wrapper">
            {/* <TopNavbar/> */}

                <HeaderTwo />
             <br /><br /><br /><br />
                <div className="section brand-wrap-area bg-color-dark">
                    <div className="container">
                        <div className='row'>
                        <BrandItem heading1="Our Merchant Partners" />
                        </div>
                    </div>
                </div>
                <div className="section brand-wrap-area bg-color-dark">
                    <div className="container">
                        <div className='row'>
                        <BrandItem heading1="Our Lending Partners" />
                        </div>
                    </div>
                </div>
                {/* <CtaLayoutOne /> */}
                <FooterOne parentClass="" />
            </main>
        </>
    )
}

export default OurClients;
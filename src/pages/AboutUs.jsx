import React from 'react';
import FooterOne from '../common/footer/FooterOne';
import HeaderOne from '../common/header/HeaderOne';
import SEO from '../common/SEO';
import BcrumbBannerOne from '../elements/breadcrumb/BcrumbBannerOne';
import CtaLayoutOne from '../component/cta/CtaLayoutOne';
import ColorSwitcher from '../elements/switcher/ColorSwitcher';
import ProcessOne from '../component/process/ProcessOne';
import AboutThree from '../component/about/AboutThree';
import AboutFour from '../component/about/AboutFour';
import AboutFive from '../component/about/AboutFive';
import CounterUpOne from '../component/counterup/CounterUpOne';
import TeamDetails from '../pages/TeamDetails';

import HeaderTwo from '../common/header/HeaderTwo';
import TopNavbar from './TopNavbar';
import AboutBreadCrumb from '../elements/breadcrumb/AboutBreadCrumb';
import EmpowerSection from '../elements/breadcrumb/EmpowerSection';
import MissionSection from './MissionSection';
const AboutUs = () => {

    return (
        <>
            {/* <SEO title="About us" /> */}
            <main className="main-wrapper">

                <HeaderTwo />

                {/* <BcrumbBannerOne
                    title="Empowering Merchants with Innovative Tech Solutions"
                    paragraph="Little Money Technologies revolutionizes the lending industry by empowering merchants with advanced, cutting-edge tech solutions."
                    styleClass="thumbnail-4"
                    mainThumb="/images/banner/about1.png"
                /> */}
                <EmpowerSection/>
                <AboutThree />
                <AboutFour />

                <CounterUpOne />
                <AboutFive />
               {/* <MissionSection/> */}
                <FooterOne parentClass="" />
            </main>
        </>
    )
}

export default AboutUs;
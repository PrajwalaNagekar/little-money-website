import React from 'react';
import FooterOne from '../common/footer/FooterOne';
import HeaderTwo from '../common/header/HeaderTwo';
import SEO from '../common/SEO';
import BannerTwo from '../component/banner/BannerTwo';
import BlogOne from '../component/blog/BlogOne';
import BrandOne from '../component/brand/BrandOne';
import CounterUpOne from '../component/counterup/CounterUpOne';
import CtaLayoutOne from '../component/cta/CtaLayoutOne';
import ProjectOne from '../component/project/ProjectOne';
import ServicePropOne from '../component/service/ServicePropOne';
import TestimonialOne from '../component/testimonial/TestimonialOne';
import SectionTitle from '../elements/section-title/SectionTitle';
import ColorSwitcher from '../elements/switcher/ColorSwitcher';
const PUBLIC_URL = import.meta.env.VITE_API_URL;
import TopNavbar from './TopNavbar';
import WhyChooseOne from '../component/whychoose/WhyChooseOne';
import WhyChooseThree from '../component/whychoose/WhyChooseThree';
import CaseStudyProp from '../component/casestudy/CaseStudyProp';
import CaseStudyDetails from './CaseStudyDetails';
const CreativeAgency = () => {

    return (
        <>
        
        <SEO title="Home"/>
        {/* <ColorSwiatcher /> */}
        <main className="main-wrapper">
           {/* <TopNavbar/> */}
            <HeaderTwo />
            
            <BannerTwo />
        
            <div className="section ">
                <div className="container">
                <SectionTitle 
                    subtitle="What We Can Do For You"
                    title="Services we offer"
                    description=""
                    textAlignment="heading-left mb--20 mb_md--70"
                    textColor=""
                />
                    <div className="row">
                        <ServicePropOne colSize="col-lg-4" serviceStyle="service-style-2" itemShow="3" marginTop="yes"/>
                    </div>
                </div>
                {/* <ul className="shape-group-7 list-unstyled">
                    <li className="shape shape-1"><img src={`${PUBLIC_URL}/images/others/circle-2.png`} alt="circle" /></li>
                    <li className="shape shape-2"><img src={`${PUBLIC_URL}/images/others/bubble-2.png`} alt="Line" /></li>
                    <li className="shape shape-3"><img src={`${PUBLIC_URL }/images/others/bubble-1.png`} alt="Line" /></li>
                </ul> */}

            </div>
            {/* <ProjectOne parentClass="bg-color-lighta"/> */}
            {/* <CounterUpOne /> */}
            <WhyChooseOne />
            <WhyChooseThree/>
            {/* <CaseStudyDetails/> */}
            {/* <CaseStudyProp/> */}
            {/* <BrandOne /> */}
            {/* <BlogOne /> */}
            {/* <CtaLayoutOne /> */}
            <FooterOne parentClass="" />
        </main>
        </>
    )
}

export default CreativeAgency;


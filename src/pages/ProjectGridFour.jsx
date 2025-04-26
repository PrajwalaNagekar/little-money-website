import React from 'react';
import FooterOne from '../common/footer/FooterOne';
import HeaderOne from '../common/header/HeaderOne';
import SEO from '../common/SEO';
import ColorSwitcher from '../elements/switcher/ColorSwitcher';
import BcrumbBannerOne from '../elements/breadcrumb/BcrumbBannerOne';
import CtaLayoutOne from '../component/cta/CtaLayoutOne';
import ProjectFive from '../component/project/ProjectFive';
import LoggedInHeaderTwo from '../common/header/LoggedInHeaderTwo';
import { useLocation } from 'react-router-dom';
const ProjectGridFour = () => {
    const location = useLocation();
    const { mobileNumber, firstName, lastName } = location.state || {};

    const userData = { mobileNumber, firstName, lastName };
    return (

        <>
            <SEO title="Project Full Width Three Column" />
            {/* <ColorSwitcher /> */}
            <main className="main-wrapper">

            <LoggedInHeaderTwo userData={userData} />
            {/* <BcrumbBannerOne 
                title="Our Projects"
                paragraph ="A quick view of industry specific problems solved with design by the awesome team at Abstrak.
                "
                styleClass=""
                mainThumb="/images/banner/banner-thumb-1.png"
            /> */}
                <ProjectFive />
                {/* <CtaLayoutOne /> */}
                <FooterOne parentClass="" />
            </main>
        </>
    )
}

export default ProjectGridFour;
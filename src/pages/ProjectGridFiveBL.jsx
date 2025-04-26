import React from 'react'
import SEO from '../common/SEO'
import BcrumbBannerOne from '../elements/breadcrumb/BcrumbBannerOne'
import ProjectFive from '../component/project/ProjectFive'
import CtaLayoutOne from '../component/cta/CtaLayoutOne'
import FooterOne from '../common/footer/FooterOne'
import LoggedInHeader from '../common/header/LoggedInHeader'
import LoggedInHeaderTwoBL from '../common/header/LoggedInHeaderTwoBL'
import { useLocation } from 'react-router-dom'
const ProjectGridFiveBL = () => {
    const location = useLocation();
    const { mobileNumber, firstName, lastName } = location.state || {};

    const userData = { mobileNumber, firstName, lastName };
    return (
        <>
            <SEO title="Project Full Width Four Column" />
            {/* <ColorSwitcher /> */}
            <main className="main-wrapper">

                <LoggedInHeaderTwoBL userData={userData} />
                {/* <BcrumbBannerOne
            title="Our Projects"
            paragraph="A quick view of industry specific problems solved with design by the awesome team at Abstrak.
        "
            styleClass=""
            mainThumb="/images/banner/banner-thumb-1.png"
        /> */}
                <ProjectFive colSize="row-cols-sm-2 row-cols-lg-3 row-cols-xl-4" parentClass="project-column-4" perPageShow="8" />
                {/* <CtaLayoutOne /> */}
                <FooterOne parentClass="" />
            </main>
        </>
    )
}

export default ProjectGridFiveBL
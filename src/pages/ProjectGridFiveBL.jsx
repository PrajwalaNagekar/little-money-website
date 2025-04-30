import React from 'react'
import SEO from '../common/SEO'
import BcrumbBannerOne from '../elements/breadcrumb/BcrumbBannerOne'
import ProjectFive from '../component/project/ProjectFive'
import CtaLayoutOne from '../component/cta/CtaLayoutOne'
import FooterOne from '../common/footer/FooterOne'
import LoggedInHeader from '../common/header/LoggedInHeader'
import LoggedInHeaderTwoBL from '../common/header/LoggedInHeaderTwoBL'
import { useLocation } from 'react-router-dom'
import { Modal } from 'react-bootstrap'
import useAutoLogout from '../hooks/useAutoLogout'
const ProjectGridFiveBL = () => {
    const location = useLocation();
    const { mobileNumber, firstName, lastName, leadId } = location.state || {};

    const userData = { mobileNumber, firstName, lastName, leadId };
    const { ExistingLeadFromLocal, } = location.state;
    const sentLeadFromOtp = ExistingLeadFromLocal
    // console.log("lead from otp to project", sentLeadFromOtp);
    const { showModal, countdown } = useAutoLogout(60 * 30 * 1000) // 30 min

    return (
        <>
            {/* <SEO title="Project Full Width Four Column" /> */}
            {/* <ColorSwitcher /> */}
            <main className="main-wrapper">

                <LoggedInHeaderTwoBL userData={userData} sentLeadFromOtp={sentLeadFromOtp} />
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
                <Modal show={showModal} centered className="border-2 bg-blend-color-burn">
                    <Modal.Body className="text-center">
                        <p className="mb-4">
                            <i className="fas fa-exclamation-circle fa-3x text-danger"></i>
                        </p>
                        <p className="font-weight-bold">
                            Our system has detected more than 30 minutes of inactivity. For security reasons, you will be logged out
                            in <span className="font-weight-bolder">{countdown}</span> seconds.
                        </p>
                    </Modal.Body>
                </Modal>
            </main>
        </>
    )
}

export default ProjectGridFiveBL
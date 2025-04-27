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
import { Modal } from 'react-bootstrap';
import useAutoLogout from '../hooks/useAutoLogout';
const ProjectGridFour = () => {
    const location = useLocation();
    const { mobileNumber, firstName, lastName, leadId,
    } = location.state || {};
    const { ExistingLeadFromLocal, } = location.state;
    const sentLeadFromOtp = ExistingLeadFromLocal
    console.log("lead from otp to project", sentLeadFromOtp);

    //pl offers
    const userData = { mobileNumber, firstName, lastName, leadId };
    const { showModal, countdown } = useAutoLogout(60 *30 * 1000) // 30 min

    return (
        <>
            <SEO title="Project Full Width Three Column" />
            {/* <ColorSwitcher /> */}
            <main className="main-wrapper">

                <LoggedInHeaderTwo userData={userData} sentLeadFromOtp={sentLeadFromOtp} />
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

export default ProjectGridFour;
import React from 'react'
import SEO from '../common/SEO'
import HeaderTwo from '../common/header/HeaderTwo'
import DetailsForm1 from './DetailsForm1'
import FooterOne from '../common/footer/FooterOne'
import TopNavbar from './TopNavbar'
import LoggedInHeader from '../common/header/LoggedInHeader'
import { useLocation } from 'react-router-dom'
const UserDetails = () => {
    const location = useLocation();
    const { mobileNumber, firstName, lastName, leadId,
    } = location.state || {};

    const userData = { mobileNumber, firstName, lastName, leadId, };
    return (
        <div>
            <SEO title="Home" />
            <main className="main-wrapper">
                {/* <TopNavbar/> */}
                <LoggedInHeader userData={userData} />
                <DetailsForm1 />
            </main>
            <FooterOne parentClass="" />

        </div>
    )
}

export default UserDetails
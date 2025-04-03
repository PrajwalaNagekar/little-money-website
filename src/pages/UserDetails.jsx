import React from 'react'
import SEO from '../common/SEO'
import HeaderTwo from '../common/header/HeaderTwo'
import DetailsForm1 from './DetailsForm1'
import FooterOne from '../common/footer/FooterOne'
import TopNavbar from './TopNavbar'
const UserDetails = () => {
    return (
        <div>
            <SEO title="Home" />
            <main className="main-wrapper">
                <TopNavbar/>
            <HeaderTwo />
            <DetailsForm1/>
            </main>
            <FooterOne parentClass="" />

        </div>
    )
}

export default UserDetails
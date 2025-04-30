import React from 'react'
import SEO from '../common/SEO'
import HeaderTwo from '../common/header/HeaderTwo'
import DetailsForm2 from './DetailsForm2'
import FooterOne from '../common/footer/FooterOne'

const UserDetails2 = () => {
    return (
        <div>
            {/* <SEO title="Home" /> */}
            <main className="main-wrapper">
                <HeaderTwo />
                <DetailsForm2 />
                <FooterOne parentClass="" />

            </main>
        </div>
    )
}

export default UserDetails2
import React from 'react'
import FormFour from './FormFour'
import HeaderTwo from '../common/header/HeaderTwo'
import SEO from '../common/SEO'
import FooterOne from '../common/footer/FooterOne'
import LoggedInHeader from '../common/header/LoggedInHeader'
import LoggedInHeaderBL from '../common/header/LoggedInHeaderBL'
const BusinessLoanForm = () => {
    return (
        
        <div>
                {/* <SEO title="Service Details" /> */}
                <main className="main-wrapper">
                <LoggedInHeaderBL />

            <div className="section-padding">
                <div className="container ">
                <div className="row d-flex justify-content-center">
                    <div className="col-xl-7 col-lg-6">

                        <div className="contact-form-box ">

                            {/* <h3 className="title">Business Loan Form</h3> */}
                            <FormFour />
                        </div>
                    </div>
                </div>
                </div>
            </div>
            <FooterOne parentClass="" />

            </main>
        </div>
    )
}

export default BusinessLoanForm
import React from 'react'
import { slugify } from '../utils';
import TestimonialData from "../data/testimonial/TestimonialData.json";
import TestimonialPropTwo from "../component/testimonial/TestimonialPropTwo"
import SectionTitle from '../elements/section-title/SectionTitle';
const PUBLIC_URL = import.meta.env.VITE_API_URL;


const allData = TestimonialData;

const GoogleReview = () => {
    const googleData = allData.filter(data => slugify(data.fromtext) === "google");

    return (
        <div className="section section-padding customer-review-area">
            <div className="container">
                <div className="row">
                    <div className="col-lg-8">
                        <SectionTitle
                            subtitle=""
                            title="Google Reviews"
                            description="Nulla facilisi. Nullam in magna id dolor blandit rutrum eget vulputate augue sed eu leo eget risus imperdiet."
                            textAlignment="heading-left"
                            textColor=""
                        />
                    </div>
                    <div className="col-lg-4">
                        <div className="review-site-logo">
                            <a href="https://www.google.com/"><img src={PUBLIC_URL + "/images/icon/google.png"} alt="Google" /></a>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <TestimonialPropTwo colSize="col-lg-4" itemShow="3" testimonialData={googleData} />
                </div>
            </div>
        </div>)
}

export default GoogleReview
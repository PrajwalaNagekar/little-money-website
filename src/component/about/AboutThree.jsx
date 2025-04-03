import React from 'react';
import SectionTitle from '../../elements/section-title/SectionTitle';
const PUBLIC_URL = import.meta.env.VITE_API_URL;

const Datas = [
    {
        id: 1,
        title: "Personalized Lending",
        para: "Tailored lending solutions that cater to the specific financial requirements of each consumers, ensuring they receive the support needed to thrive."
    },
    {
        id: 2,
        title: "Inclusive Financing",
        para: "Flexible lending options that enable consumers of all backgrounds to access the funding they need, ensuring they can secure financial support without falling into overwhelming debt."
    },
    {
        id: 3,
        title: "Integrated Financing",
        para: "Bundled solutions that combine multiple lending products, providing comprehensive financial support tailored to diverse business needs, enabling merchants to optimize offerings to their consumers. "
    },
    {
        id: 4,
        title: "Seamless Onboarding",
        para: "Streamlined digital onboarding process for both merchants and customers, significantly reducing paperwork and time spent on administrative tasks."
    },
    // {
    //     id: 5,
    //     title: "Build an inclusive, transparent and socially responsible culture",
    //     para: "Maecenas eros sapien, egestas at elit nec, eleifend sagittis orci."
    // }
]




const AboutThree = () => {
    return (
        <div className="section section-padding bg-color-custom pb--80 pb_lg--40 pb_md--20">
            <div className="container">
                <SectionTitle 
                    subtitle="Flexible Financing"
                    title="What We Offer"
                    description="Personalized, Accessible, and Efficient Lending Solutions"
                    textAlignment="heading-left heading-light-left mb--100"
                    textColor=""
                />

                <div className="row">
                    {Datas.map((data) => (
                        <div className="col-lg-4" key={data.id}>
                            <div className="about-quality">
                                <h3 className="sl-number">{data.id}</h3>
                                <h5 className="title">{data.title}</h5>
                                <p>{data.para}</p>
                            </div>
                        </div>
                    ))}

                </div>
            </div>
            {/* <ul className="list-unstyled shape-group-10">
                <li className="shape shape-1"><img src={PUBLIC_URL + "/images/others/circle-1.png"} alt="Circle" /></li>
                <li className="shape shape-2"><img src={PUBLIC_URL + "/images/others/line-3.png"} alt="Circle" /></li>
                <li className="shape shape-3"><img src={PUBLIC_URL + "/images/others/bubble-5.png"} alt="Circle" /></li>
            </ul> */}
        </div>
    )
}

export default AboutThree;
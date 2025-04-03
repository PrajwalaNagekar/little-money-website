import React from 'react';
import {useParams} from 'react-router-dom';
import FooterOne from '../../common/footer/FooterOne';
import HeaderOne from '../../common/header/HeaderOne';
import BcrumbBannerOne from '../../elements/breadcrumb/BcrumbBannerOne';
import CtaLayoutOne from '../cta/CtaLayoutOne';
import SectionTitle from '../../elements/section-title/SectionTitle';
import ProjectPropOne from '../project/itemProp/ProjectPropOne';
import { slugify } from '../../utils';
import ServiceData from "../../data/service/ServiceMain.json";
import ProjectData from "../../data/project/ProjectData.json";
import AboutTwo from '../about/AboutTwo';
import ColorSwitcher from '../../elements/switcher/ColorSwitcher';
import SEO from '../../common/SEO'
import Tilty from 'react-tilty';
const PUBLIC_URL = import.meta.env.VITE_API_URL;

const allServiceData = ServiceData;
const getProjectData = ProjectData;
const merchantLogin = () => {
   
const params = useParams();
    const serviceSlug = params.slug;

    const getServiceData = allServiceData.filter(data => slugify(data.title) === serviceSlug);
    const detailsService = getServiceData[0];
  return (
    
    <>
    <SEO title="Service Details" />
    <ColorSwitcher />
    <main className="main-wrapper">
        <HeaderOne />
        {/* <BcrumbBannerOne 
        title={detailsService.title}
        paragraph ={detailsService.description}
        styleClass=""
        mainThumb="/images/banner/banner-thumb-4.png"
        /> */}
        <AboutTwo />
       
        <div className="section section-padding bg-color-light pb--70">
            <SectionTitle 
                subtitle={detailsService.process.sectionSub}
                title={detailsService.process.sectionTitle}
                description={detailsService.process.para}
                textAlignment=""
                textColor="mb--90"
            />
            <div className="container">
                {detailsService.process.steps.map((data, index) => (
                    <div key={index} className={`process-work ${(index % 2  === 1) ? "content-reverse" : ""}`}>
                        <Tilty perspective={2000}>
                            <div className="thumbnail">
                                <img src={PUBLIC_URL + data.thumb} alt="Thumbnail" />
                            </div>
                        </Tilty>
                    <div className="content">
                        <span className="subtitle">{data.subtitle}</span>
                        <h3 className="title">{data.title}</h3>
                        <p>{data.paragraph}</p>
                    </div>
                </div>
                ))}
            </div>
            <ul className="shape-group-17 list-unstyled">
                <li className="shape shape-1"><img src={PUBLIC_URL + "/images/others/bubble-24.png"} alt="Bubble" /></li>
                <li className="shape shape-2"><img src={PUBLIC_URL + "/images/others/bubble-23.png"} alt="Bubble" /></li>
                <li className="shape shape-3"><img src={PUBLIC_URL + "/images/others/line-4.png"} alt="Line" /></li>
                <li className="shape shape-4"><img src={PUBLIC_URL + "/images/others/line-5.png"} alt="Line" /></li>
                <li className="shape shape-5"><img src={PUBLIC_URL + "/images/others/line-4.png"} alt="Line" /></li>
                <li className="shape shape-6"><img src={PUBLIC_URL + "/images/others/line-5.png"} alt="Line" /></li>
            </ul>
        </div>
        <div className="section section-padding">
            <div className="container">
                <SectionTitle 
                    subtitle="Our Project"
                    title="Featured Designs"
                    description=""
                    textAlignment=""
                    textColor=""
                />
                <div className="row row-35">
                    {getProjectData.slice(0, 2).map((data) => (
                        <div className="col-md-6" key={data.id}>
                            <ProjectPropOne projectStyle="" portfolio={data}/>
                        </div>
                    ))}
                </div>
            </div>
            <ul className="shape-group-16 list-unstyled">
                <li className="shape shape-1"><img src={PUBLIC_URL + "/images/others/circle-2.png"} alt="circle" /></li>
                <li className="shape shape-3"><img src={PUBLIC_URL + "/images/others/bubble-1.png"} alt="Line" /></li>
            </ul>
        </div>
        <CtaLayoutOne />
    <FooterOne parentClass="" />
    </main>
    </>  )
}

export default merchantLogin
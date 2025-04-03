import React from 'react';
import {useParams} from 'react-router-dom';
import FooterOne from '../common/footer/FooterOne';
import HeaderOne from '../common/header/HeaderOne';
import BcrumbBannerOne from '../elements/breadcrumb/BcrumbBannerOne';
import CtaLayoutOne from '../component/cta/CtaLayoutOne';
import SectionTitle from '../elements/section-title/SectionTitle';
import ProjectPropOne from '../component/project/itemProp/ProjectPropOne';
import { slugify } from '../utils';
import ServiceData from "../data/service/ServiceMain.json";
import ProjectData from "../data/project/ProjectData.json";
import AboutTwo from '../component/about/AboutTwo';
import ColorSwitcher from '../elements/switcher/ColorSwitcher';
import SEO from '../common/SEO'
import Tilty from 'react-tilty';
import HeaderTwo from '../common/header/HeaderTwo';
import TopNavbar from './TopNavbar';
const PUBLIC_URL = import.meta.env.VITE_API_URL;


const allServiceData = ServiceData;
const getProjectData = ProjectData;
const PersonalLoans = () => {
    const params = useParams();
    const serviceSlug = params.slug;

    const getServiceData = allServiceData.filter(data => slugify(data.title) === serviceSlug);
    const detailsService = getServiceData[0];

  return (
    <>
    <SEO title="Service Details" />
    {/* <ColorSwitcher /> */}
    <main className="main-wrapper">
    <TopNavbar/>
        <HeaderTwo />
        <AboutTwo heading="Personal Loan" />
    <FooterOne parentClass="" />
    </main>
    </> 
  )
}

export default PersonalLoans
import React from 'react';
import {useParams} from 'react-router-dom';
import FooterOne from '../common/footer/FooterOne';
import HeaderOne from '../common/header/HeaderOne';
import SEO from '../common/SEO';
import CtaLayoutOne from '../component/cta/CtaLayoutOne';
import BreadCrumbOne from '../elements/breadcrumb/BreadCrumbOne';
import ColorSwitcher from '../elements/switcher/ColorSwitcher';
import TeamData from "../data/team/TeamData.json";
import { slugify } from '../utils';
import { FaFacebookF, FaPinterestP, FaLinkedinIn, FaInstagram, FaVimeoV, FaDribbble, FaBehance } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import Tilty from 'react-tilty';

const allData = TeamData;


const TeamDetails = () => {

    const params = useParams();
    const teamSlug = params.slug;

    const getTeamData = allData.filter(data => slugify(data.title) === teamSlug);
    const detailsTeam = getTeamData[0];

    return (
        <>
        <SEO title="Team" />
        <ColorSwitcher />
            <main className="main-wrapper">
                {/* <HeaderOne /> */}
                           </main>

                <div className="section-padding-equal team-details-area">
                    <div className="container">
                        <div className="row align-items-center">
                        <div className="col-lg-6">
                            <div className="team-details-content">
                            <span className="subtitle" >Founder
                            </span>
                            
                            
                            <h2 className="title">Gajendra Sangappa</h2>
                            
                            {/* <ul className="social-share list-unstyled">
                                
                                <li><a href="https://www.linkedin.com/in/gajendra-sangappa/"><FaLinkedinIn /></a></li>
                            
                            </ul>  */}
                            <p >Gajendra Sangappa, brings a wealth of experience from the financial services industry, specializing in Buy Now, Pay Later (BNPL) solutions and client relationship management. With a career spanning 16 years, he has worked closely with leading financial institutions, fintech companies and Original Equipment Manufacturers (OEMs) to deliver customer centric solutions.</p>
                            
                            </div>
                            <ul className="social-share list-unstyled">
                            <a href="https://www.linkedin.com/in/gajendra-sangappa/"><bold> Gajendra Sangappa </bold> <FaLinkedinIn /></a>
                            </ul>
                        </div>
                        <div className="col-lg-6">
                            <div className="team-details-thumb">
                            <Tilty perspective={3000} reset={false}>
                                <img className="paralax-image" src="/images/team/team-1.png" alt="Thumbnail" />
                            </Tilty>
                            </div>
                        </div>
                        </div>
                    </div>
                </div>

                {/* <CtaLayoutOne /> */}
                {/* <FooterOne parentClass="" /> */}
        </>
    )
}

export default TeamDetails;
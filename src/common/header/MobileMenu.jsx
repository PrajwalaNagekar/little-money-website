import React from 'react';
import { Link } from 'react-router-dom';
import { FaTimes } from "react-icons/fa";
import Nav from './Nav';
const PUBLIC_URL = import.meta.env.VITE_API_URL;
import TopNavbar from '../../pages/TopNavbar';

const MobileMenu = ({MobileHandler}) => {

    return (
        <div className="mobilemenu-popup">
            <div className="mobilemenu-inner">
                <div className="mobilemenu-header">
                    <div className="mobile-nav-logo">
                        <Link to={PUBLIC_URL + "/"}>
                            <img className="light-mode" src={PUBLIC_URL + "/images/LittleLogo_01.jpg"} alt="Site Logo" />
                            <img className="dark-mode" src={PUBLIC_URL + "/images/LittleLogo_01_dark.png"} alt="Site Logo" />
                        </Link>
                    </div>
                    <button className="mobile-menu-close" onClick={MobileHandler} ><FaTimes /></button>
                </div>
                <div className="mobilemenu-body">
                    <Nav />
                    {/* <TopNavbar/> */}
                </div>
            </div>
        </div>
    )
}

export default MobileMenu;
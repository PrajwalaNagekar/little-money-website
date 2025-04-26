import React, { useState } from 'react';
import Logo from '../../elements/logo/Logo';
import Nav from './Nav';
import OffcanvasMenu from './OffcanvasMenu';
import StickyHeader from './StickyHeader';
import SwitcherHeader from '../../elements/switcher/SwitcherHeader';
import MobileMenu from './MobileMenu';
import logout from '../../utils/logout';
import { Button } from 'react-bootstrap';
import { Link, useLocation } from 'react-router-dom';
import { CiEdit } from "react-icons/ci";
import { IoIosLogOut } from "react-icons/io";


const LoggedInHeaderTwo = ({ userData }) => {
    const [showOffcanvas, setShowOffcanvas] = useState(false);

    const OffcanvasHandleClose = () => setShowOffcanvas(false);
    const OffcanvasHandleShow = () => setShowOffcanvas(true);

    const sticky = StickyHeader(100);

    const MobileMenuHandler = () => {
        document.querySelector('.mobilemenu-popup').classList.toggle("show");
        document.querySelector('body').classList.toggle("mobilemenu-show");

        var elements = document.querySelectorAll('.mobilemenu-popup .menu-item-has-children > a');

        for (var i in elements) {
            if (elements.hasOwnProperty(i)) {
                elements[i].onclick = function () {
                    this.parentElement.querySelector('.axil-submenu').classList.toggle("active");
                    this.classList.toggle("open");
                }
            }
        }
    }
    const location = useLocation();
    const data = location.state;
    console.log("Received user data:", data);

    return (
        <>
            <header className="header axil-header header-style-2">
                <div className="axil-mainmenu axil-sticky">
                    <div className="container-fluid">
                        <div className="header-navbar">
                            <div className="header-logo">
                                <Logo limage="/images/lm.png"
                                    dimage="/images/LittleLogo_01_dark.png"
                                    simage="/images/LittleLogo_01.jpg"
                                />

                            </div>
                            {/* <Nav /> */}
                            {/* <div className="header-main-nav">
                        <Button onClick={logout} variant="primary"
                            className="axil-btn btn-fill-primary">Logout</Button>
                        </div> */}
                            <div className="header-action">
                                <ul className="list-unstyled">
                                    <div className="header-main-nav">
                                        {/* <Nav /> */}
                                        <div className="d-flex flex-wrap justify-content-between align-items-center">
                                            <Link
                                                to="/user-detail"
                                                state={userData}
                                                className="d-flex align-items-center text-decoration-none link-hover-effect  mb-2"
                                            >
                                                <CiEdit size={32} id="i1" />
                                                <span className="d-none d-sm-inline ms-1">Edit</span>
                                            </Link>

                                            <Link
                                                onClick={logout}
                                                className="d-flex align-items-center text-decoration-none link-hover-effect mb-2"
                                            >
                                                <IoIosLogOut size={32} id="i2" style={{ color: 'red' }} />
                                                <span className="d-none d-sm-inline text-danger ms-1">Logout</span>
                                            </Link>
                                        </div>


                                    </div>
                                    <li className="sidemenu-btn d-lg-block d-none">

                                        <button className="btn-wrap btn-dark" onClick={OffcanvasHandleShow}>
                                            <span></span>
                                            <span></span>
                                            <span></span>
                                        </button>
                                    </li>
                                    <li className="mobile-menu-btn sidemenu-btn d-lg-none d-block">
                                        <button className="btn-wrap btn-dark" onClick={MobileMenuHandler}>
                                            <span></span>
                                            <span></span>
                                            <span></span>
                                        </button>
                                    </li>
                                    {/* <li className="my_switcher d-block d-lg-none">
                                <SwitcherHeader />
                            </li> */}

                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </header>
            <OffcanvasMenu offcanvasShow={showOffcanvas} offcanvasHide={OffcanvasHandleClose} />
            <MobileMenu MobileHandler={MobileMenuHandler} />
        </>)
}

export default LoggedInHeaderTwo
import React from 'react';
import { Link } from 'react-router-dom';
const PUBLIC_URL = import.meta.env.VITE_API_URL;


const Logo = ({limage, dimage, simage}) => {
    return (
        <Link to={PUBLIC_URL + "/"}>
            {/* <img className="light-version-logo" src={PUBLIC_URL + limage} alt="logo" />
            <img className="dark-version-logo" src={PUBLIC_URL + dimage} alt="logo" /> */}
               <img className="light-version-logo" src={PUBLIC_URL + limage} style={{  height: "60px" }}  alt="logo" />
               <img className="dark-version-logo" src={PUBLIC_URL + dimage} style={{ height: "60px" }} alt="logo" />
            {/* <img className="sticky-logo" src={PUBLIC_URL + simage} alt="logo" /> */}
            <img className="sticky-logo" src={PUBLIC_URL + simage} style={{ height: "60px" }} alt="logo" />

        </Link>
    )
}


export default Logo;
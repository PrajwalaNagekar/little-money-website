import React from 'react';
import CountUp from 'react-countup';
import TrackVisibility from 'react-on-screen';
const PUBLIC_URL = import.meta.env.VITE_API_URL;
import { SlLocationPin } from "react-icons/sl";

const Data = [
    {  
        id: 1,
        light_icon: "/images/icon/icon-7.png",
        dark_icon: "/images/icon/icon-10.png",
        countNum: 5000,
        text: " Merchants across South India"
    },
    {  
        id: 2,
        light_icon: "/images/icon/icon-22.png",
        dark_icon: "/images/icon/icon-11.png",
        countNum: 25000,
        text: "Customers per day"
    },
  {
    id: 3,
    light_icon: "/images/icon/icon-26.png",
    dark_icon: "/images/icon/icon-11.png",
    countNum: 100,
    text: "Aggregator Reach"
  },
  {
    id: 4,
    light_icon: "/images/icon/loc2.png",
    dark_icon: "/images/icon/icon-11.png",
    countNum: 425,
    text: "Locations"
  }
   
];

const CounterUp = ({colSize, layoutStyle, evenTopMargin}) => {

    return (
        <>
            {Data.map((data) => (
                <div className={`${colSize} ${(data.id % 2  === 0) ? evenTopMargin : ""}`} key={data.id} >
                    <div className={`counterup-progress ${layoutStyle}`}>

                        { 
                            layoutStyle === "counterup-style-2" ? 
                            <div className="icon">
                                <img className="dark-icon" src={ + data.dark_icon} alt="Icon" />
                                <img className="light-icon" src={PUBLIC_URL + data.light_icon} alt="Icon" />
                            </div> : 
                            <div className="icon">
                                <img src={PUBLIC_URL + data.light_icon} alt="Icon" />
                            </div> 
                        }
                        <div className="count-number h2">
                            <TrackVisibility once>
                                {({isVisible}) => (
                                    <span className="number count">
                                        {isVisible ? <CountUp end={data.countNum} duration={1} /> : null}
                                    </span>
                                )}  
                            </TrackVisibility>
                            <span className="symbol">+</span>
                        </div>
                        <h6 className="title">{data.text}</h6>
                    </div>
                </div>
            ))}
        </>
    )
}



export default CounterUp;
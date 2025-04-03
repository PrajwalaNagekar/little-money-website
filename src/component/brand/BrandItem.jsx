import React from 'react';
const PUBLIC_URL = import.meta.env.VITE_API_URL;

const Data = [
    {
        image: "/images/brand/brand-1.png"
    },
    {
        image: "/images/brand/brand-2.png"
    },
    {
        image: "/images/brand/brand-3.png"
    },
    {
        image: "/images/brand/brand-4.png"
    },
    {
        image: "/images/brand/brand-5.png"
    },
    {
        image: "/images/brand/brand-6.png"
    },
    {
        image: "/images/brand/brand-7.png"
    },
    {
        image: "/images/brand/brand-8.png"
    }
]


const BrandItem = ({heading1,heading2}) => {
    return (
        <>
        <h1 style={{ color: "white" }}  >{heading1}</h1>
            {Data.map((data, index) => (
                <div className="col-lg-3 col-6" key={index}>
                    <div className="brand-grid">
                        <img src={PUBLIC_URL + data.image} alt="Brand" />
                    </div>
                </div>
            ))}
        </>
    )
}

export default BrandItem;
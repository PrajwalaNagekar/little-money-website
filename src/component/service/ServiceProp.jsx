import React from 'react';
import { Link } from 'react-router-dom';
import { slugify } from '../../utils';
const PUBLIC_URL = import.meta.env.VITE_API_URL;



const ServiceProp = ({colSize, serviceStyle, serviceData}) => {

    return (
		<>
			{serviceData.map((data, index) => (
				<div className={colSize} key={index} >
					<div className={`services-grid ${serviceStyle}`}>
						<div className="thumbnail">
							<img src={PUBLIC_URL + data.image} alt="icon" />
						</div>
						<div className="content">
							<h5 className="title"> 
								<Link to={PUBLIC_URL + `/service-details/${slugify(data.title)}`}>{data.title}</Link>
							</h5>
							<p>{data.description}</p>
							<Link to={PUBLIC_URL + `/service-details/${slugify(data.title)}`} className="more-btn">Find out more</Link>
						</div>
					</div>
			 	</div>
			))}
		</>
    )
}

export default ServiceProp;
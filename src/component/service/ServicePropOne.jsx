import React from 'react';
import { Link } from 'react-router-dom';
import ServiceData from "../../data/service/ServiceMain.json";
import { slugify } from '../../utils';
const PUBLIC_URL = import.meta.env.VITE_API_URL;


const AllData = ServiceData;
const getLoanRoute = (title) => {
	switch (title.toLowerCase()) {
		case "personal loan":
			return "personal-loans";
		case "business loan":
			return "business-loans";
		case "bnpl":
			return "contact";
		default:
			return `service-details/${slugify(title)}`;
	}
};


const ServicePropOne = ({ colSize, serviceStyle, itemShow, marginTop }) => {

	const topMargin = (index) => {
		if (marginTop === "yes") {
			if (index === 0) {
				return "mt--200 mt_md--0";
			} else if (index === 1) {
				return "mt--100 mt_md--0";
			} else {
				return "mt--0";
			}
		} else {
			return "";
		}
	}

	return (
		<>
			{AllData.slice(0, itemShow).map((data, index) => (
				<div className={`${colSize} ${topMargin(index)}`} key={index} >
					<div className={`services-grid ${serviceStyle}`}>
						<div className="thumbnail">
							<img src={PUBLIC_URL + data.image} alt="icon" />
						</div>
						<div className="content">
							<h5 className="title">
								<Link to={`${PUBLIC_URL}/${getLoanRoute(data.title)}`}>{data.title}</Link>
							</h5>
							<p>{data.description}</p>
							<Link to={`${PUBLIC_URL}/${getLoanRoute(data.title)}`} className="more-btn">
								{data.title.toLowerCase() === "bnpl" ? "Contact Us" : "Apply Now"}
							</Link>
						</div>
					</div>
				</div>
			))}
		</>
	)
}

export default ServicePropOne;
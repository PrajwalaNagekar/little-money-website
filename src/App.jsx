import React from 'react';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import ScrollToTop from './component/scrollToTop/ScrollToTop';
import 'bootstrap/dist/css/bootstrap.min.css';


// Home Pages Import
import DigitalAgency from './pages/DigitalAgency';
import CreativeAgency from './pages/CreativeAgency';
import PersonalPortfolio from './pages/PersonalPortfolio';
import HomeStartup from './pages/HomeStartup';
import CorporateAgency from './pages/CorporateAgency';

// Blog Import
import BlogGridView from './pages/BlogGrid';
import BlogCategory from './pages/Category';
import BlogArchive from './pages/Archive';
import BlogDetails from './pages/BlogDetails';

// Service 
import ServiceOne from './pages/ServiceOne';
import ServiceTwo from './pages/ServiceTwo';
import ServiceDetails from './pages/ServiceDetails';
import MerchantLogin from './pages/merchantLogin';

// Project 
import ProjectGridOne from './pages/ProjectGridOne';
import ProjectGridTwo from './pages/ProjectGridTwo';
import ProjectGridThree from './pages/ProjectGridThree';
import ProjectGridFive from './pages/ProjectGridFive';
import ProjectGridFour from './pages/ProjectGridFour';
import ProjectDetails from './pages/ProjectDetails';

// Pages 
import Splash from './pages/Splash';
import AboutUs from './pages/AboutUs';
import OurOffice from './pages/OurOffice';
import OurClients from './pages/OurClients';
import Team from './pages/Team';
import TeamDetails from './pages/TeamDetails';
import CaseStudy from './pages/CaseStudy';
import CaseDetails from './pages/CaseStudyDetails';
import Testimonials from './pages/Testimonials';
import PricingTable from './pages/PricingTable';
import Typography from './pages/Typography';
import Contact from './pages/Contact';
import ErrorPage from './pages/404';
import ComingSoon from './pages/ComingSoon';
import PrivacyPolicy from './pages/PrivacyPolicy';
import TermsOfUse from './pages/TermsOfUse';
import PersonalLoans from './pages/PersonalLoans';
import OtpVerification from './pages/OtpVerification';
import DetailsForm from './pages/DetailsForm';
// Css Import
import './assets/scss/app.scss';
import BusinessLoans from './pages/BusinessLoans';
import TurnOver from './pages/TurnOver';
// const PUBLIC_URL = import.meta.env.VITE_API_URL;
import DetailsForm2 from './pages/DetailsForm2';
import UserDetails from './pages/UserDetails';
import UserDetails2 from './pages/UserDetails2';
import TurnOver2 from './pages/TurnOver2';
const App = () => {
  return (
    <Router > 
		<ScrollToTop>
			<Routes>
				{/* <Route path={PUBLIC_URL + "/"} element={<Splash />}/> */}
				<Route path= "/" element={<CreativeAgency />}/>

				<Route path="/digital-agency" element={<DigitalAgency />}/>
				<Route path="/creative-agency" element={<CreativeAgency />}/>
				<Route path="/personal-portfolio" element={<PersonalPortfolio />}/>
				<Route path="/home-startup" element={<HomeStartup />}/>
				<Route path="/corporate-agency" element={<CorporateAgency />}/>

				{/* Blogs */}
				<Route path= "/blog-grid/" element={<BlogGridView />}/>
				<Route path= "/category/:slug" element={<BlogCategory />}/>
				<Route path= "/archive/:slug" element={<BlogArchive />}/>
				<Route path= "/blog-details/:id" element={<BlogDetails />}/>

				{/* Service */}
				<Route path= "/service-one/" element={<ServiceOne />}/>
				<Route path= "/service-two/" element={<ServiceTwo />}/>
				<Route path= "/service-details/:slug" element={<ServiceDetails />}/>

				{/* Project  */}
				<Route path="/project-grid-one" element={<ProjectGridOne />}/>
				<Route path="/project-grid-two" element={<ProjectGridTwo />}/>
				<Route path="/project-grid-thre" element={<ProjectGridThree />}/>
				<Route path="/project-width-one" element={<ProjectGridFour />}/>
				<Route path="/project-width-two" element={<ProjectGridFive />}/>
				<Route path="/project-details/:slug" element={<ProjectDetails />}/>

				{/* Pages  */}
				<Route path="/about-us" element={<AboutUs />}/>
				<Route path="/our-office" element={<OurOffice />}/>
				<Route path="/our-clients" element={<OurClients />}/>
				<Route path="/team" element={<Team />}/>
				{/* <Route =L + "/team-details/:slug"} element={<TeamDetails />}/> */}
				<Route path="/case-study" element={<CaseStudy />}/>
				<Route path="/case-details/:slug" element={<CaseDetails />}/>
				<Route path="/testimonials" element={<Testimonials />}/>
				<Route path="/pricing-table" element={<PricingTable />}/>
				<Route path="/typography" element={<Typography />}/>
				<Route path="/contact" element={<Contact />}/>

				<Route path="/personal-loans" element={<PersonalLoans/>}/>
				<Route path="/merchant-login" element={<MerchantLogin />}/>
				<Route path="/business-loans" element={<BusinessLoans />}/>

				<Route path="/verification" element={<OtpVerification />}/>
				<Route path="/user-details" element={<UserDetails />}/>
				<Route path="/user-details2" element={<UserDetails2 />}/>

				<Route path="/turn-over" element={<TurnOver/>}/>
				<Route path="/turn-over2" element={<TurnOver2/>}/>
				<Route path="/offers" element={<ProjectGridOne/>}/>

				{/* <Route path={PUBLIC_URL + "/merchant-signup"} element={<MerchantLogin />}/> */}

				<Route path="/404" element={<ErrorPage />}/>
				<Route path="/coming-soon" element={<ComingSoon />}/>
				<Route path="/privacy-policy" element={<PrivacyPolicy />}/>
				<Route path="/terms-use" element={<TermsOfUse />}/>
			</Routes>
		</ScrollToTop>
    </Router>
  )
}

export default App;

// set NODE_OPTIONS=--openssl-legacy-provider
// {/* AIzaSyCoBxATVbRV2-CHYx6VrVk2nAFp5a6iaiQ */}

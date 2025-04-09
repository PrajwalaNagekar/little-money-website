import React from 'react';

const EmpowerSection = () => {
  return (
<div className='section-padding'>
    <section className=" bg-white py-5 px-3">
      <div className="container">
        <div className="row align-items-center">
          
          {/* Left Text Section */}
          <div className="col-md-6 mb-md-0">
            <h4 className="text-black mb-3" style={{ fontSize: '3rem' }}>
            Powering Merchant Growth            </h4>
            <p className="text-black">
            Little Money Technologies delivers innovative tech solutions for the lending industry, empowering merchants with a smarter, streamlined lending experience.
            </p>
          </div>

          {/* Right Image Section */}
          <div className="col-md-6">
            <br />
            <img
              src="/images/about/desk_abt.jpeg"
              alt="Empowering Merchants"
              className="img-fluid rounded shadow"
            />
          </div>

        </div>
      </div>
    </section>
    </div>
  );
};

export default EmpowerSection;

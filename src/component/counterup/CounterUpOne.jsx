import React from "react";
import SectionTitle from "../../elements/section-title/SectionTitle";
import CounterUp from "./CounterUp";

const CounterUpOne = () => {
  return (
    <div className="section bg-color-custom">
      <div className="container">
        <div className="d-flex justify-content-center">
          <SectionTitle
            subtitle="Market Reach"
            title="Our Community"
            description="Connecting businesses with seamless lending solutions to drive growth and success."
            textAlignment="heading-light"
            textColor=""
          />
        </div>
        <div className="row">
          <CounterUp colSize="col-lg-3 col-6" layoutStyle="" evenTopMargin="" />
        </div>
      </div>
    </div>
  );
};

export default CounterUpOne;

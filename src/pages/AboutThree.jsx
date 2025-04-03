import React from 'react'
import { Accordion } from 'react-bootstrap'
import { FaCode, FaCompress, FaGlobe } from 'react-icons/fa'

const AboutThree = () => {
    return (
        <>
            <div className="col-lg-6">
                <div className="why-choose-us">
                    <div className="section-heading heading-left">
                        <span className="subtitle"> </span>
                        <h4 className="title ">Why branding matters?</h4>
                        <p>Ut condimentum enim nec diam convallis mollis. Sed felis quam, semper dapibus purus sed, rhoncus ullamcorper lacus.</p>
                    </div>
                    <Accordion defaultActiveKey="1">
                        <Accordion.Item eventKey="1">
                            <Accordion.Header><FaCompress /> Strategy</Accordion.Header>
                            <Accordion.Body>
                                Aenean hendrerit laoreet vehicula. Nullam convallis augue at enim gravida pellentesque.
                            </Accordion.Body>
                        </Accordion.Item>
                        <Accordion.Item eventKey="2">
                            <Accordion.Header><FaCode /> Design</Accordion.Header>
                            <Accordion.Body>
                                Aenean hendrerit laoreet vehicula. Nullam convallis augue at enim gravida pellentesque.
                            </Accordion.Body>
                        </Accordion.Item>
                        <Accordion.Item eventKey="3">
                            <Accordion.Header><FaGlobe /> Development</Accordion.Header>
                            <Accordion.Body>
                                Aenean hendrerit laoreet vehicula. Nullam convallis augue at enim gravida pellentesque.
                            </Accordion.Body>
                        </Accordion.Item>
                    </Accordion>
                </div>
            </div>
        </>
    )
}

export default AboutThree
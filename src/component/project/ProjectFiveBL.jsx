import React from 'react'
import { Modal } from 'react-bootstrap';
import { useLocation, useParams } from 'react-router-dom';

const ProjectFiveBL = () => {
    const { userId } = useParams();
    const leadId = localStorage.getItem("ExistingLeadInLocal")

    const location = useLocation();
    const data = location.state;
    // console.log("Received user data:", data);
    // console.log("Full location atste:", location.state);
    const queryParams = new URLSearchParams(location.search);

    // const offers = location.state?.offers || [];
    const offers = location.state?.offers || [];
    // console.log("Extracted offers:", offers);
    // console.log(leadId);
    // console.log(offers.lenderName);
    if (!Array.isArray(offers) || offers.length === 0) {
        return <div>No valid offers available.</div>;
    }

    const [projects] = useState(AllData.slice(0, 16));
    const [pageNumber, setPageNumber] = useState(0);

    const projectPerPage = perPageShow ? perPageShow : 6;
    const pageVisited = pageNumber * projectPerPage;

    const displayProjects = projects.slice(pageVisited, pageVisited + projectPerPage)
        .map((data) => (
            <div className="col" key={data.id}>
                <ProjectPropOne projectStyle="" portfolio={data} />
            </div>
        ))

    const pageCount = Math.ceil(projects.length / projectPerPage);

    const changePage = ({ selected }) => {
        setPageNumber(selected);
    }
    const handleApply = async (offer) => {
        try {
            // console.log("Clicked offer:", offer); // ✅ Full object
            // console.log("Lender Name:", offer.lenderName);
            const payload = {
                leadId: leadId,
                lenderName: offer.lenderName,
            };
            // console.log("🚀 ~ handleApply ~ payload:", payload)

            await appliedCustomers(payload)
            // console.log(offers.offerLink);

            window.open(offer.offerLink, '_blank');
        } catch (error) {
            console.error("Failed to save application:", error);
        }
    }
    // useAutoLogout(60 * 1000);

    const { showModal, countdown } = useAutoLogout(60 * 30 * 1000); // 30 min
    return (
        <div className={`section section-padding-equal pt--100 pt_md--80 pt_sm--60 ${parentClass ? parentClass : ""}`}>
            <Container className="mt-4">

                <h3 className="mb-4 mt-16">Available Offers</h3>
                {/* <Button
                        variant="primary"
                        className="mt-auto axil-btn btn-fill-primary"
                    >
                        Edit Profile
                    </Button> */}
                {/* <Button onClick={logout} variant="primary"
                    className="mt-auto axil-btn btn-fill-primary">Logout</Button> */}


                <Row xs={1} sm={1} md={2} lg={3} className="g-4">
                    {offers.map((offer, index) => (
                        <Col key={index}>
                            <Card className="h-100 shadow-sm custom-offer-card">
                                <div className="d-flex align-items-center p-3">
                                    <img
                                        src={offer.lenderLogo}
                                        alt={offer.lenderName}
                                        className="offer-logo"
                                    />
                                    <div className="amount-text text ms-3 mt-2 mt-sm-0">
                                        <div style={{ fontSize: '12px', textAlign: 'right' }}>Loan Amount upto <span>{" "}</span>
                                            <strong style={{ fontSize: '15px' }}>
                                                ₹{Number(offer.offerAmountUpTo).toLocaleString()}
                                            </strong>
                                        </div>
                                    </div>
                                </div>
                                <Card.Body className="flex-grow-1 d-flex flex-column">
                                    <div className='d-flex gap-3'>
                                        <div className="text-left mt-3">
                                            {/* <Card.Title>{offer.lenderName}</Card.Title> */}
                                            <Card.Text>
                                                <div className='text-wrap'>
                                                    <p style={{ fontSize: '13px' }}> <strong>Tenure:</strong> {" "}{offer.offerTenure}</p>
                                                    <p style={{ fontSize: '13px' }}><strong>Interest Rate:</strong>{" "} {offer.offerInterestRate}</p>
                                                    <p style={{ fontSize: '13px' }}> <strong>Processing Fees:</strong>{" "} {offer.offerProcessingFees}</p>
                                                </div>
                                            </Card.Text>
                                        </div>
                                        <div className="d-flex justify-content-center align-items-center my-3">
                                            <QRCode
                                                value={offer.offerLink}
                                                size={110}
                                                bgColor="#ffffff"
                                                fgColor="#000000"
                                                includeMargin={true}
                                            />
                                        </div>
                                    </div>

                                    <Button
                                        variant="primary"
                                        className="mt-auto w-100 axil-btn btn-fill-primary"
                                        onClick={() => handleApply(offer)}
                                    >
                                        Apply
                                    </Button>
                                </Card.Body>

                            </Card>
                        </Col>
                    ))}
                </Row>
            </Container>
            <Modal show={showModal} centered className="border-2 bg-blend-color-burn">
                <Modal.Body className="text-center">
                    <p className="mb-4">
                        <i className="fas fa-exclamation-circle fa-3x text-danger "></i>
                    </p>
                    <p className="font-weight-bold">
                        Our system has detected more than 30 minutes of inactivity. For security reasons, you will be logged out in{" "}
                        <span className="font-weight-bolder">{countdown}</span> seconds.
                    </p>
                </Modal.Body>
            </Modal>
        </div>
    )
}

export default ProjectFiveBL
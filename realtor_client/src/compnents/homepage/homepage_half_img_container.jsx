import React from "react";


class HomePageHalfImg extends React.Component {
    render() {
        return (
            <div>
                <div id="first-half-container" className="container-fluid">
                    <div className="row position-relative align-items-center">
                        <div className="col-12 col-lg-6 half-img"/>
                        <div className="col-12 col-lg-6 half-text d-flex flex-column align-items-start justify-content-center">
                            <h2>Need a home loan? Get pre-approved</h2>
                            <p>Find a lender who can offer competitive mortgage rates and help you with
                                pre-approval.</p>
                            {/* <button>Get pre-approved now</button> */}
                        </div>
                    </div>
                </div>
                <div id="first-half-container" className="container-fluid">
                    <div className="row position-relative align-items-center">
                        <div className="col-12 col-lg-6 order-lg-2 half-img sec-half-img order-lg-2"/>
                        <div className="col-text col-12 col-lg-6 order-lg-1 d-flex flex-column align-items-start justify-content-center order-lg-1">
                            <h2>Find Your Neighborhood</h2>
                            <p>Does it have pet-friendly rentals? What are the crime rates? How are the schools? Get
                                important local information on the area you're most interested in.</p>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default HomePageHalfImg ;
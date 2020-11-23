import React from 'react';

class SingleAptAccordion extends React.Component {
    render() {
        return( 
            <div className={"accordion-wrap"}>
                <div className="accordion" id="accordionExample">
                    <div className="accordion_card">
                        <div className="card-header" id="headingOne">
                        <h2 className="mb-0">
                        <i className="fas fa-door-open"/>
                            <button className="btn btn-link" type="button" data-toggle="collapse" data-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                            Open Houses
                            </button>
                        </h2>
                        </div>

                        <div id="collapseOne" className="collapse show" aria-labelledby="headingOne" data-parent="#accordionExample">
                        <div className="accordion_card-body">
                            Contact Agent for a private showing.
                        </div>
                        </div>
                    </div>
                    <div className="accordion_card">
                        <div className="card-header" id="headingTwo">
                        <h2 className="mb-0">
                            <i className="fas fa-home"/>
                            <button className="btn btn-link collapsed" type="button" data-toggle="collapse" data-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
                            Property Details
                            </button>
                        </h2>
                        </div>
                        <div id="collapseTwo" className="collapse" aria-labelledby="headingTwo" data-parent="#accordionExample">
                        <div className="accordion_card-body">
                        Great investor opportunity to own a West Galveston Island property and build a resort rental business. 
                        This home has never been lived in, has some finish out work & 
                        repairs which need to be made, but is a great structure & location for the price. Being sold as is/where is .
                        </div>
                        </div>
                    </div>
                    <div className="accordion_card">
                        <div className="card-header" id="headingThree">
                        <h2 className="mb-0">
                            <i className="fas fa-calculator"/>
                            <button className="btn btn-link collapsed" type="button" data-toggle="collapse" data-target="#collapseThree" aria-expanded="false" aria-controls="collapseThree">
                            Monthly Payment
                            </button>
                        </h2>
                        </div>
                        <div id="collapseThree" className="collapse" aria-labelledby="headingThree" data-parent="#accordionExample">
                        <div className="accordion_card-body">Contact Agent for a private showing.
                        </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default SingleAptAccordion;
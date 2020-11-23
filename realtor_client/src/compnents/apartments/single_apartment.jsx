import React from "react";

import './single_apartment.css';
import './single_apt_accordion.css';

import {getDataFromServerById} from "../../server/server_data";
import SingleAptSubscribe from "./single_apt_subscribe";
import SingleAptAccordion from "./single_apt_accordion"
import SingleAptDetails from "./single_apartment_details";
import AptNotFound from "../errors/apartment_not_found";

class SingleApartment extends React.Component {
    constructor(props) {
        super(props);
        this.state= {
            apartments: [],
            apartment: [],
            // loading:true,
            PageMessage: false
        }
    }

    componentDidMount() {
        let extension =this.props.match.params.id
        getDataFromServerById(this.handleSuccess,extension);
    }

    handleSuccess = (data) => {
        if (data.data.length !== 0) {
            this.setState ({
                apartment: data.data[0],
                PageMessage: false
                // loading: false
            })
        } else {
            this.setState ({
                PageMessage: true
            })
        }
    };


    render() {
        const {apartment} = this.state;
        return (
            <div>
                {this.state.PageMessage ? 
                <AptNotFound/>
                : 
                <div className={"container single-apt-container"}>
                    <p>Presented by:<br/>Ryan Moody with Re/Max Leading Edge</p>
                    <div id="" data-interval="false" className="carousel slide" data-ride="carousel">
                        <div className="carousel-inner">
                            <div className="carousel-item active">
                                <img className="d-block" src={"http://localhost:9000"+apartment.main_image} height= "500px" width="100%" alt="First slide"/>
                            </div> 
                        </div>
                        <span className="single-apt-prop-type">{apartment.availability}</span>
                    </div>
                    <SingleAptSubscribe/>
                    <SingleAptDetails apartment = {apartment}/>
                    <SingleAptAccordion/>
                </div>}
            </div>
        )
    }
}

export default SingleApartment;
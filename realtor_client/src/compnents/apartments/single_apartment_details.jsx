import React from "react";

class SingleAptDetails extends React.Component {
    constructor(props) {
        super(props);
        this.state= {
        }
    }
    render() {
        const {apartment} = this.props;
        let price = ""  + apartment.price
        let listing_price =(price.length < 7) ? price.substring(0,price.length-3)+","+price.substring(price.length-3) : 
        price.substring(0,price.length-6)+"," + price.substring(price.length-3) + "," + price.substring(price.length-3);
        return (
        <div>
        <div className={"row single-apt-detail-2 text-sm-left"}>
            <div className={"col-sm-12 col-md-12 col-lg-4"}>
                <div className={"row d-flex p-2"}>
                    <div className={"col-sm-6 col-md-6 col-lg-6"}><span>Property Type</span></div>
                    <div className={"col-sm-6 col-md-6 col-lg-6"}><span>{apartment.property_type}</span></div>
                </div>
                <div className={"row d-flex p-2"}>
                    <div className={"col-sm-6 col-md-6 col-lg-6"}><span>Price</span></div>
                    <div className={"col-sm-6 col-md-6 col-lg-6"}><span>${listing_price}</span></div>
                </div>
            </div>
            <div className={"col-sm-12 col-md-12 col-lg-4"}>
                <div className={"row  d-flex p-2"}>
                    <div className={"col-sm-6 col-md-6 col-lg-6"}><span>Number of Baths</span></div>
                    <div className={"col-sm-6 col-md-6 col-lg-6"}><span>{apartment.number_of_bath}</span></div>
                </div>
                <div className={"row d-flex p-2"}>
                    <div className={"col-sm-6 col-md-6 col-lg-6"}><span>Number of Rooms</span></div>
                    <div className={"col-sm-6 col-md-6 col-lg-6"}><span>{apartment.number_of_room}</span></div>
                </div>
            </div>
            <div className={"col-sm-12 col-md-12 col-lg-4"}>
                <div className={"row d-flex p-2"}>
                    <div className={"col-sm-6 col-md-6 col-lg-6"}><span>Sqft</span></div>
                    <div className={"col-sm-6 col-md-6 col-lg-6"}><span>{apartment.sqft}</span></div>
                </div>
                <div className={"row d-flex p-2"}>
                    <div className={"col-sm-6 col-md-6 col-lg-6"}><span>City</span></div>
                    <div className={"col-sm-6 col-md-6 col-lg-6"}><span>{apartment.city_name}</span></div>
                </div>
            </div>
        </div>
    </div>
    )
    }
}

export default SingleAptDetails;

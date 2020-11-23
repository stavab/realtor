import React from "react";
import {getDataFromServer} from '../../server/server_data';

class HomePageCityData extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    componentDidMount() {
        getDataFromServer(this.handleSuccess, 'rent/total');
        getDataFromServer(this.handleSuccess, 'buy/total');
        getDataFromServer(this.handleSuccess, 'cities/total');
        getDataFromServer(this.handleSuccess, "apartments/?property_type=condo");
        getDataFromServer(this.handleSuccess, "apartments/?availability=available");
    }

    handleSuccess = (data) => {
        let config = data.config.url
        if (config.includes("/total")) {
            let name = config.split("/total");
            let splitted = name[0].split("/")[1]
            if (splitted === "cities") {
                this.setState({
                    [splitted]: data.data.length
                })
            } else {
                this.setState({
                    [splitted]: data.data.apartments[0].total
                })
            }            
        } else if (config.includes("?")) {
            let name = config.split("?")
            let splitted = name[1].split("=")[0]
            this.setState({
                [splitted] : data.data.apartments.length
            })
        }
    }

    render() {
        const homes_for_sale = this.state.buy ? this.state.buy : "";
        const homes_for_rent = this.state.rent ? this.state.rent : "";
        const total_cities = this.state.cities ? this.state.cities : '';
        const total_condos = this.state.property_type ? this.state.property_type : "";
        const total_available = this.state.availability ? this.state.availability : "";
        return (
            <div className="data-container container main-padding">
                <h2>What's happening in Israel</h2>
                <div className="row data-row shadow-hover justify-content-center text-center">
                    <div className="col-6 col-lg-2">
                        <p className="data-price">{homes_for_sale}</p>
                        <p className="data-title">Homes for Sale</p>
                    </div>
                    <div className="col-6 col-lg-2">
                        <p className="data-price">{total_available}</p>
                        <p className="data-title">Available Houses</p>
                    </div>
                    <div className="col-6 col-lg-2">
                        <p className="data-price">{homes_for_rent}</p>
                        <p className="data-title">Homes for Rent</p>
                    </div>
                    <div className="col-6 col-lg-2">
                        <p className="data-price">{total_cities}</p>
                        <p className="data-title">Total Cities</p>
                    </div>
                    <div className="col-6 col-lg-2">
                        <p className="data-price">{total_condos}</p>
                        <p className="data-title">Total Condos</p>
                    </div>
                </div>
            </div>
        )
    }
}

export default HomePageCityData;

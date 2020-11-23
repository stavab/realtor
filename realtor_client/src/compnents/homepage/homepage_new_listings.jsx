import React from "react";
import { Link } from "react-router-dom";


import Card from "../gallery/card.jsx"
import {getDataFromServer} from "../../server/server_data";

class HomePageNewListings extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            newListingsArray: []
        };
    }

    componentDidMount() {
        getDataFromServer(this.handleSuccessNewListingsArray,'apartments');
    }

    handleSuccessNewListingsArray = (data) => {
        const server_data = data.data.apartments;
        const sliced_data = [];
        for (let i = (server_data.length-1); i > server_data.length-5; i--) {
            sliced_data.push(server_data[i]);
        }
        this.setState({
            newListingsArray: sliced_data
        })
    };

    render() {
        return (
            <div className="container city-card-container">
                <div>
                    <h2>New listings in Israel</h2>
                    <Link to="/new_listings">New Listings</Link>
                </div>
                <div id={"cards-row"} className={'row'}>
                    {this.state.newListingsArray.map((item, i) => <Card {...item} key={i}/>)}
                </div>
            </div>
        )
    }
}

export default HomePageNewListings;

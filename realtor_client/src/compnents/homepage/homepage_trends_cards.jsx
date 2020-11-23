import React from "react";
import Card from "../gallery/card.jsx"
import {getDataFromServer} from "../../server/server_data";

class HomePageTrendsCards extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            trends_array: []
        };
    }

    componentDidMount() {
        getDataFromServer(this.handleSuccessTrendsArray,'apartments');
    }

    handleSuccessTrendsArray = (data) => {

        const shuffled = data.data.apartments.sort(() => 0.5 - Math.random());
        let selected = shuffled.slice(0, 4);

        this.setState({
            trends_array: selected
        })
    };

    render() {
        return (
            <section id="trends-cards-container" className="container-fluid">
                <div className="container">
                    <div className="row trends-cards-row">
                        {this.state.trends_array.map((item, i) => <Card type = {'trends'} {...item} key={i}/>)}
                    </div>
                </div>
            </section>
        )

    }
}

export default HomePageTrendsCards;
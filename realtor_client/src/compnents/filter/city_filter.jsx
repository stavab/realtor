import React from "react";
import {getDataFromServer} from "../../server/server_data"


class CityFilter extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    componentDidMount = () => {
        getDataFromServer(this.handleSuccessCities, 'apartments');
    }

    handleSuccessCities = (data) => {
        this.setState({
            apartments: data.data.apartments
        }, ()=> this.createCities())
    };

    createCities = () => {
        let citiesMap = {};
        this.state.apartments.forEach(apartment => {

            if (!citiesMap[apartment.city_name]) {
                citiesMap[apartment.city_name] = apartment.city_id
            }
        });

        let city_array = []
        for (const prop in citiesMap) {
            let city_name = (prop)
            let city_id = citiesMap[prop]
            city_array.push({city_name,city_id})
        }

        this.setState({
            cities: city_array
        })

    }
    // now can use the route to query the db straight:
    // getDataFromServer('cities/total');
    // let request = 'select cities.name, city_id from apartments join cities on cities.id = apartments.city_id group by city_id'

    render() {
        const {filterHandler,city_id} = this.props;
        const city = () => {
            if (this.state.cities && this.props.city_id) {
                for (let i = 0; i < this.state.cities.length; i++) {
                    let current_city = this.state.cities[i]
                    if (current_city.city_id == city_id) {
                        return current_city.city_name
                    }
                }
            } else {
                return ""
            }
        }

        return (
                <li className="nav-item dropdown d-none d-lg-flex">
                <button className="nav-link dropdown-toggle" data-toggle="dropdown" 
                aria-haspopup="true" aria-expanded="false">City: {city()} </button>
                <div className="dropdown-menu">
                    <div className="city_filter_item">
                    {this.state.cities &&
                    <div className="city_filtering d-flex flex-column">
                    {this.state.cities.map((item, i) => 
                        <label key={i}>
                        <input className={"d-none city_input_filter"} type="radio" name={"city_id"} value={item.city_id} onChange={filterHandler}/>{item.city_name}
                        </label>
                    )}
                    </div>}
                    </div>
                    </div>
                </li>

        )
    }
}

export default CityFilter;

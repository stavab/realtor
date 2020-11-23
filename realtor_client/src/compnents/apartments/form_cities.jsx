import React from "react";
import {getDataFromServer} from '../../server/server_data'

class CitiesForm extends React.Component {
    constructor(props) {
        super(props);
        this.state= {
        }
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
    
    render() {
        return (
            <div className="form-group">
                <label>City Id</label>
                {this.state.cities &&
                <select className={"nav-link"} name={"city_id"} onBlur={this.props.inputChange}>
                    <option value = {'1'}>city</option> 
                {this.state.cities.map((item, i) => 
                    <option value = {item.city_id} key={i}>{item.city_name}</option> 
                )}
                </select>}
            </div>
        )
    }
}

export default CitiesForm;
import React from 'react';
import './filter.css';

import RoomsFilter from "./rooms_filter";
import BedsFilter from "./beds_filter";
import ListingStatusFilter from "./listing_status_filter";
import CityFilter from "./city_filter";
import ResetSearch from "./filter_reset_search";


class FilterWrapper extends React.Component {

    render() {
        const {filterHandler,onSubmit, onReset} = this.props;
        const {number_of_room,number_of_bath, sale_status, city_id} = this.props.filter;
        return (
            <div id={"filter-top"} className={'container-fluid sticky-top'}>
                <form onSubmit={onSubmit} className="row text-center align-items-center">
                    <ul className="nav nav-pills">
                        <CityFilter filterHandler = {filterHandler}
                                    city_id = {city_id}/>
                        <ListingStatusFilter filterHandler = {filterHandler}
                                    sale_status = {sale_status}/>
                        <RoomsFilter filterHandler = {filterHandler}
                                    number_of_room = {number_of_room}/>
                        <BedsFilter filterHandler= {filterHandler}
                                    number_of_bath = {number_of_bath}/>
                        <li className={"nav-item reset-submit d-none d-lg-flex"}>
                            <button type="submit" className="nav-link" value="submit" onSubmit={onSubmit}>Search</button>
                        </li>
                        <ResetSearch reset = {onReset}/>
                    </ul>
                </form>
            </div>
        )
    }
}

export default FilterWrapper;
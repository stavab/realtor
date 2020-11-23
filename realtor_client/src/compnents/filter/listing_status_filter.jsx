import React from "react";


class ListingStatusFilter extends React.Component {
    render() {
        const {filterHandler,sale_status} = this.props;
        return (
            <li className="nav-item dropdown d-none d-lg-flex">
                <button className="nav-link dropdown-toggle" data-toggle="dropdown"
                   aria-haspopup="true" aria-expanded="false">Listing Status: {sale_status} </button>
                <div className="dropdown-menu listing-status">
                    <div className="dropdown-item d-flex">
                        <div className="form-check form-check-inline">
                            <input className="form-check-input" type="radio" name="sale_status" onChange={filterHandler} id="inlineRadio1"
                                   value="sale"/>
                            <span>For Sale</span>
                        </div>
                        <div className="form-check form-check-inline">
                            <input className="form-check-input" type="radio" name="sale_status" onChange={filterHandler} id="inlineRadio2"
                                   value="rent"/>
                            <span>For Rent</span>
                        </div>
                    </div>
                </div>
            </li>
        )
    }
}

export default ListingStatusFilter ;
import React from "react";

class BathsFilter extends React.Component {
    render() {
        const {filterHandler,number_of_bath} = this.props;
        const beds = () => {
            if (number_of_bath > 0) {
                return number_of_bath
            }
        };
        return (
            <li className="nav-item dropdown d-none d-lg-flex">
                <button className="nav-link dropdown-toggle" data-toggle="dropdown" 
                   aria-haspopup="true" aria-expanded="false">Baths: {beds()}</button>
                <div className="dropdown-menu">
                    <div className="dropdown-item title">Baths</div>
                        <div className="dropdown-item d-flex">
                            <label>
                                <input className={"d-none"} type="radio" name={"number_of_bath"} value={1} onChange={filterHandler}/>1
                            </label>
                            <label>
                                <input className={"d-none"} type="radio" name={"number_of_bath"} value={2} onChange={filterHandler}/>2
                            </label>
                            <label>
                                <input className={"d-none"} type="radio" name={"number_of_bath"} value={3} onChange={filterHandler}/>3
                            </label>
                            <label>
                                <input className={"d-none"} type="radio" name={"number_of_bath"} value={4} onChange={filterHandler}/>4
                            </label>
                        </div>
                </div>
            </li>
        )
    }
}

export default BathsFilter;
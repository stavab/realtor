import React from "react";

class PriceFilter extends React.Component {
    render() {
        const {filterHandler} = this.props;
        return (
            <li className="nav-item dropdown d-none d-lg-flex">
                <button className="nav-link dropdown-toggle" data-toggle="dropdown" 
                   aria-haspopup="true" aria-expanded="false">Price</button>
                <div className="dropdown-menu">
                    <div className="dropdown-item dropdown-price">
                        <div className="input-group">
                            <div className="input-group-prepend">
                                <span className="input-group-text">$ Min</span>
                            </div>
                            <input onChange={filterHandler} name={"min_price"} type="text" className="form-control"/>
                        </div>
                        <div className="input-group">
                            <input type="text" className="form-control" name={"max_price"} onChange={filterHandler}/>
                            <div className="input-group-prepend">
                                <span className="input-group-text">$ Max</span>
                            </div>
                        </div>
                    </div>
                </div>
            </li>
        )
    }
}

export default PriceFilter;
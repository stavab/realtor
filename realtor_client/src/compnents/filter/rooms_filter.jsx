import React from "react";


class RoomsFilter extends React.Component {

    render() {
        const {filterHandler, number_of_room} = this.props;
        const rooms = () => {
            if (number_of_room > 0) {
                return number_of_room
            }
        };

        return (
            <li className="nav-item dropdown d-none d-lg-flex">
                <button className="nav-link dropdown-toggle" data-toggle="dropdown" 
                   aria-haspopup="true" aria-expanded="false">Rooms: {rooms()} </button>
                <div className="dropdown-menu">
                    <div className="dropdown-item title">Rooms</div>
                    <div className="dropdown-item d-flex">
                        <label>
                            <input className={"d-none"} type="radio" name={"number_of_room"} value={1} onChange={filterHandler}/>1
                        </label>
                        <label>
                            <input className={"d-none"} type="radio" name={"number_of_room"} value={2} onChange={filterHandler}/>2
                        </label>
                        <label>
                            <input className={"d-none"} type="radio" name={"number_of_room"} value={3} onChange={filterHandler}/>3
                        </label>
                        <label>
                            <input className={"d-none"} type="radio" name={"number_of_room"} value={4} onChange={filterHandler}/>4
                        </label>
                    </div>
                </div>
            </li>
        )
    }
}

export default RoomsFilter;
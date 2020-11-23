import React from "react";


class AddressFilter extends React.Component {
    render() {
        const {myChangeHandler} = this.props;
        return (
            <div className={"d-flex city-btn"}>
                <input className={"city-btn-address"}
                       onChange={myChangeHandler} name="address" type="text"/>
                <input className={"city-btn-submit"} type={"submit"} value="&#xf002;"/>
            </div>
        )
    }
}

export default AddressFilter;
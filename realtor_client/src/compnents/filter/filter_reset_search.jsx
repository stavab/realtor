import React from "react";

class ResetSearch extends React.Component {
    render() {
        const {reset} = this.props;
        return (
            <li className={"nav-item reset-submit d-none d-lg-flex"}>
                <button className="nav-link"  onClick={reset}>Reset Search
                </button>
            </li>
        )
    }
}

export default ResetSearch;
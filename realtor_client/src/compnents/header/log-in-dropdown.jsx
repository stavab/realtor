import React from 'react';
import {Link} from "react-router-dom";
import Cookies from 'js-cookie';

class LogInDropdown extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            user_role: Cookies.get('logged-user')
        }
    }

    componentDidMount = () => {
        if (this.state.user_role) {
            let cookie = JSON.parse(Cookies.get('logged-user'))
            this.setState({
                user_role: cookie[0].role_id
            })
        }
    }
    render() {
        return (
            <div className={"log-in-dropdown log-in-dropdown2"}>
                    <div className={"row"}>
                        {this.state.user_role === 2 &&
                        <Link to={`/userArea`}>
                            <button><span>MY HOME</span></button>
                        </Link> }
                        {this.state.user_role === 1 && 
                        <Link to={`/adminArea`}>
                            <button><span>DASHBOARD</span></button>
                        </Link> }
                    </div>
                    <div className={"row"}>
                        <Link to={`/`}>
                            <button onClick={this.props.logOut}><span>LOG OUT</span></button>
                        </Link>
                    </div>
            </div>
        )
    }
}

export default LogInDropdown
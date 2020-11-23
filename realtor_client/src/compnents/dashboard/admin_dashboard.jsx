import React from 'react';

import {getUsersFromServer, updateUserStatusInServer} from '../../server/server_data_users'
import {getDataFromServer, updateApartmentStatusInServer} from '../../server/server_data'
import './user_area.css';

class AdminDashboard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    componentDidMount() {     
        getUsersFromServer(this.handleSuccessUsers, 'users');
        getDataFromServer(this.handleSuccessApartments, 'apartments');
    }

    handleSuccessUsers = (data) => {
        this.setState({
            usersArray: data.data.users
        })
    }

    handleSuccessApartments = (data) => {
        this.setState({
            apartmentsArray: data.data.apartments
        })
    }

    changeUserStatus = async e => {
        const updated_user = {
            status: e.target.name,
            id: e.target.id
        }

        const isUpdated = await updateUserStatusInServer(updated_user);
        if(isUpdated) {
            getUsersFromServer(this.handleSuccessUsers, 'users');
        }
    }

    changeAptStatus = async e => {
        const updated_apt = {
            status: e.target.name,
            id: e.target.id
        }
        const isAptUpdated = await updateApartmentStatusInServer(updated_apt);
        if(isAptUpdated) {
            getDataFromServer(this.handleSuccessApartments, 'apartments');
        }
    }

        render() {
        return(
            <div>
            <div className={"container"}>
                <p className={"navigator"}>
                    <button className="btn" data-toggle="collapse" href="#multiCollapseExample1" aria-expanded="false" aria-controls="multiCollapseExample1">All Users</button>
                    <button className="btn" data-toggle="collapse" data-target="#multiCollapseExample2" aria-expanded="false" aria-controls="multiCollapseExample2">All Apartments</button>
                </p>
            <div className={"container"}>
                <div>
                    <div className="collapse multi-collapse" id="multiCollapseExample1">
                        <div>
                            <div>
                                <h3>Users</h3>
                            </div>
                            <div>
                                {this.state.usersArray &&
                                    <ul className="apat-list-group list-group w-55">
                                        {this.state.usersArray.map((user, i) => 
                                            <li key = {i} className="list-group-item d-flex justify-content-between align-items-center">
                                                {user.first_name} {user.last_name}<br></br>{user.email}<br></br>status: {user.status}
                                                {user.status === "active" &&
                                                <button id={user.id} name='inactive' onClick = {this.changeUserStatus} className="badge badge-primary badge-pill">block user</button>}
                                                {user.status === "inactive" &&
                                                <button id={user.id} name="active" onClick = {this.changeUserStatus} className="badge badge-primary badge-pill">activate user</button>}
                                            </li>                        
                                        )}
                                    </ul>
                                }
                            </div>
                        </div>
                    </div>
                </div>
                <div>
                    <div className="collapse collapse multi-collapse" id="multiCollapseExample2">
                        <div className="user_area_collapse_b">
                            <h3>Apartments</h3>
                        </div>
                        <div>
                            {this.state.apartmentsArray &&
                                <ul className="list-group apat-list-group w-55">
                                    {this.state.apartmentsArray.map((apartment, i) => 
                                        <li key = {i} className="list-group-item d-flex justify-content-between align-items-center">
                                            {apartment.id} <br></br> user: {apartment.user_id}<br></br>status: {apartment.status}
                                            {/* <span className="badge badge-primary badge-pill">{apartment.status}</span> */}
                                            {apartment.status === "denied" &&
                                                <button id ={apartment.id} name={"approved"} onClick = {this.changeAptStatus} className="badge badge-primary badge-pill">Approve Apartment</button>
                                            }
                                            {apartment.status === "pending" &&
                                                <button id ={apartment.id} name={"approved"} onClick = {this.changeAptStatus} className="badge badge-primary badge-pill">Approve Apartment</button>
                                            }
                                            {apartment.status === "approved" &&
                                                <button id ={apartment.id} name={"denied"} onClick = {this.changeAptStatus} className="badge badge-primary badge-pill">Block Apartment</button>
                                            }
                                        </li>                        
                                    )}
                                </ul>
                            }
                        </div>
                    </div>
                </div>  
            </div>
        </div>
    </div>
        );
    }
}


export default AdminDashboard;
import React from 'react';
import Cookies from 'js-cookie';

import './style/button.css';
import Header from "./compnents/header/header.jsx"
import Gallery from "./compnents/gallery/gallery.jsx";
import HomePage from "./compnents/homepage/homepage.jsx"
import UserArea from './compnents/dashboard/user_area';
import AdminDashboard from './compnents/dashboard/admin_dashboard'
import SingleApartment from "./compnents/apartments/single_apartment";
import UploadApartment from "./compnents/apartments/upload_apt";
import UpdateApartment from "./compnents/apartments/update_apartment";
import {BrowserRouter as Router, Route, Switch, Redirect} from "react-router-dom";


class App extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            user: Cookies.get('logged-user'),
            role_id: 2
        }
    }

    componentDidMount = () => {
        if (this.state.user) {
            let cookie = JSON.parse(this.state.user)
            let role = cookie[0].role_id
            this.setState({
                user: cookie[0],
                role_id: role
            })
        }
    }

    updateCookieApp = () => {
        let cookie = JSON.parse(Cookies.get('logged-user'))
        let role = cookie[0].role_id
        this.setState({
            user: cookie[0],
            role_id: role
        })
    }

    render() {
        return (
            <Router>
                <div>
                    <Header updateCookieApp = {this.updateCookieApp}/>
                    <Switch>

                        <Route path="/apartments">
                            <Gallery arrayType={'apartments'} filterType={'apartments'}/>
                        </Route>

                        <Route path={'/apartment/:id'} component={SingleApartment}/>

                        <Route path="/buy">
                            <Gallery filterType={'buy'}/>
                        </Route>  

                        <Route path="/rent">
                            <Gallery filterType={'rent'}/>
                        </Route>     

                        <Route path="/new_listings">
                            <Gallery filterType={'new_listings'}/>
                        </Route> 
                        
                        <Route path={'/userArea'}>
                            {!this.state.user ? <Redirect to="/"/> : <UserArea/>}
                        </Route>

                        <Route path={'/adminArea'}>
                            {this.state.role_id === 1 ? <AdminDashboard/> : <Redirect to="/"/> }
                        </Route> 

                        <Route path={'/update/:id'} component = {UpdateApartment}></Route>
                        
                        <Route path={'/upload'} component = {UploadApartment}></Route>

                        <Route path="/">
                            <HomePage/>
                        </Route>

                    </Switch>
                </div>
            </Router>
        );
    }
}

export default App;
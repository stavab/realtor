import React from "react";
import {Link} from "react-router-dom";
import Cookies from 'js-cookie';

import Gallery from "../gallery/gallery";
import './user_area.css';


class UserArea extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            user: Cookies.get('logged-user')
        }
    }

    componentDidMount = () => {
        if (this.state.user) {
            let cookie = JSON.parse(this.state.user)
            this.setState({
                user: cookie[0]
            })
        }
    }


    render () {
        return (
            <div>
                {/* {!this.state.user &&
                <div> if no user logged in, route to home page for logging in</div>
                }
                {this.state.user && */}
                <div className={"container"}>
                    <p className={"navigator"}>
                    <button className="btn" data-toggle="collapse" href="#multiCollapseExample1" aria-expanded="false" aria-controls="multiCollapseExample1">MY HOMES</button>
                    <button className="btn" data-toggle="collapse" data-target="#multiCollapseExample2" aria-expanded="false" aria-controls="multiCollapseExample2">SAVED HOMES</button>
                    <button className="btn" data-toggle="collapse" data-target="#multiCollapseExample3" aria-expanded="false" aria-controls="multiCollapseExample3">UPLOAD HOMES</button>
                </p>
                <div className={"container"}>
                    <div>
                        <div className="user_area_collapse collapse multi-collapse" id="multiCollapseExample1">
                            <div className="user_area_collapse_b">
                                <div>
                                    <h3>My Homes</h3>
                                </div>
                                <div className="mt-3">
                                    <Gallery filterType={'user_homes'} />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div>
                        <div className="user_area_collapse collapse collapse multi-collapse" id="multiCollapseExample2">
                            <div className="user_area_collapse_b">
                                <h3>My Saved Homes</h3>
                                {/* <div className="mt-3">
                                    <Gallery filterType={'user_wish_list'} wishList_userId = {3}/>
                                </div> */}
                                <p>No Saved Homes Yet? That's ok, you can save any of the listings to look at later simply by tapping on the ❤</p>
                            </div>
                        </div>
                    </div>
                    <div>
                        <div className="user_area_collapse collapse collapse multi-collapse" id="multiCollapseExample3">
                            <div className="user_area_collapse_b d-flex justify-content-center">
                                <Link to='/upload'>
                                    <button className="pre-approved-btn">upload home</button>
                                </Link>
                            </div>
                        </div>
                    </div>    
                </div>
            </div>
            {/* } */}
            </div>
        )

    }

}

export default UserArea
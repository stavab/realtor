import React from "react";
import {Link} from "react-router-dom";

class HomePageMainSearch extends React.Component{
    render() {
        let title = (this.props.type === 'rent') ? "Discover your perfect rental " : "The Home of Home Search";
        let description = (this.props.type === 'rent') ? 'Search nearby apartments, condos, and homes for rent' : 'With the most complete source of homes for sale & real estate near you';
        return (
            <main id="main" className="container-fluid d-flex">
                <div
                    className="main-container container d-flex flex-column justify-content-center align-items-center">
                        {/* {this.props.type != 'rent' &&} */}
                    <h1 className="position-relative">{title}<span
                        className="position-absolute d-none d-lg-inline">℠</span></h1> 
                    <h4 className="d-none d-lg-flex">{description}</h4>
                    <div className="form d-flex flex-column justify-content-center align-items-lg-center">
                        <ul className="row links-input justify-content-center font-14">
                            <li><Link to='/buy'>BUY</Link></li> 
                            <li><Link to='/rent'>RENT</Link></li>
                            {/* <li><a href="https://www.realtor.com/finance">JUST SOLD</a></li>
                            <li><a href="https://www.realtor.com/soldhomes">HOME VALUE</a></li> */}
                        </ul>
                        <form className="d-none d-lg-flex">
                            <Link className={"apt-search-link"} to={"/apartments"}><input className="search-btn-submit" type="submit" value="Start Exploring"/></Link>
                        </form>
                        <form className="d-flex d-lg-none justify-content-center">
                        <Link to={"/apartments"}><input type="submit" className="search-btn-submit" value="&#xf002;"/></Link>
                        </form>
                    </div>
                </div>
            </main>
        )
    }
}

export default HomePageMainSearch;

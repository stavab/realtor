import React from 'react';
import Card from "./card";
import FilterWrapper from '../filter/filter_wrapper'
import {getDataFromServer,getDataFromServerByWishList} from "../../server/server_data";
import Cookies from 'js-cookie';


class Gallery extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            filter: { 
                page: 1
            },
            user: Cookies.get('logged-user')
        };
    }

    componentDidMount() {
        if (this.props.filterType === 'apartments') {
            getDataFromServer(this.handleSuccessApartments, 'apartments');
        } else if (this.props.filterType === 'rent') {
            getDataFromServer(this.handleSuccessApartments, 'rent');
        } else if (this.props.filterType === 'buy') {
            getDataFromServer(this.handleSuccessApartments, 'buy');
        } else if (this.props.filterType === 'user_homes') {
            let cookie = JSON.parse(this.state.user)
            let extension = cookie[0].id
            getDataFromServer(this.handleSuccessApartments, `apartments/?user_id=${extension}`);
        } else if (this.props.filterType === 'user_wish_list') {
            getDataFromServerByWishList(this.handleSuccessApartments, this.props.user_id);
        } else if (this.props.filterType === 'new_listings') {
            getDataFromServer(this.handleSuccessApartments, 'new_listings');
        }
    }

    handleSuccessApartments = (data) => {
        this.setState({
            allApartments: data.data.apartments
        })
    };

    filterHandler = (event) => {
        let name = event.target.name;
        let value = event.target.value;
        this.setState({   
            filter: {
                ...this.state.filter,
                [name]: value
            }
        })
    };

    onSubmit = e => {
        e.preventDefault();
        let request = `apartments/?`

        for(let prop in this.state.filter){
            if(prop){
                request += `${prop}=${this.state.filter[prop]}&`
            }
        }
        getDataFromServer(this.handleSuccessApartments, request);
    }

    onPagination = async e => {
        // console.log('on pagination click')
        // console.log(this.state.allApartments)
        // let prev_page = this.state.filter.page
        // console.log(prev_page)
        // let next_page = this.state.filter.page +1 
        // console.log(next_page)
        // console.log('on page', this.state.filter.page, e.target.id)
        // let new_page =  e.target.id > 3 ? e.target.id : this.state.filter.page
        // document.getElementById(new_page).style.color = "red";
        // let prev_page = document.getElementsByClassName("active");
        // document.getElementById(prev_page).style.color = "#007bff";
        let prev_page = this.state.filter.page;
        // let element = document.getElementById(prev_page).style.color = "#007bff";
        // element.classList.add("active");
        
        let pagination_page;
        // if (this.state.allApartments.length < 8) {
        //     console.log("last")
        // }
        if (e.target.id === "next") {
            pagination_page = parseInt(prev_page) + 1
        } else if (e.target.id === "prev") {
            if (prev_page == 1) {
                pagination_page = 1;
            } else {
                pagination_page = parseInt(prev_page) - 1
            }
        } else {
            pagination_page = e.target.id
        }
        this.setState({
            filter: {
                ...this.state.filter,
                page: await pagination_page
            }
        })
        let request = `apartments/?`
        for(let prop in this.state.filter){
            if(prop){
                request += `${prop}=${this.state.filter[prop]}&`
            }
        }

        // document.getElementById(this.state.filter.page).style.color = "red";
        
        getDataFromServer(this.handleSuccessApartments, request);
    }

    resetHandler = ()=> {
        this.setState({
            filter: {
                page: 1
            }
        })
        getDataFromServer(this.handleSuccessApartments, 'apartments');
    }

    renderGallery = () => {
        this.componentDidMount()
    }

    render() {
        return(
            <div> {this.props.filterType !== 'user_homes' && 
                <FilterWrapper onReset = {this.resetHandler} onSubmit = {this.onSubmit} filterHandler = {this.filterHandler} filter = {this.state.filter}/>
                }
                <div>{this.state.allApartments &&
                <div id={"cards-container"} className={'container-fluid city-card-container'}>
                    <div id={"cards-row"} className={'row'}>
                        {this.state.allApartments.map((item, i) => <Card {...item} type = {this.props.filterType} array = {this.state.allApartments} renderGallery = {this.renderGallery} key = {i}/>)}
                    </div>
                </div>}
                </div>
                {this.props.filterType !== 'user_homes' && 
                <nav aria-label="Page navigation example">
                    <ul className="pagination justify-content-center">
                        <li className="page-item">
                        <span className="page-link" aria-label="Previous">
                            <span onClick = {this.onPagination} id={"prev"} aria-hidden="true">&laquo;</span>
                            <span className="sr-only">Previous</span>
                        </span>
                        </li>
                        <li className="page-item"><span onClick = {this.onPagination} id={"1"} className="page-link">1</span></li>
                        <li className="page-item"><span onClick = {this.onPagination} id={"2"} className="page-link">2</span></li>
                        <li className="page-item"><span onClick = {this.onPagination} id={"3"} className="page-link">3</span></li>
                        <li className="page-item">
                        <span className="page-link" aria-label="Next">
                            <span onClick = {this.onPagination} id={"next"} aria-hidden="true">&raquo;</span>
                            <span className="sr-only">Next</span>
                        </span>
                        </li>
                    </ul>
                </nav>}
            </div>
        )
    }
}

export default Gallery;
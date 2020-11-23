import React from 'react';
import {Link} from "react-router-dom";
import {deleteDataFromServerById} from "../../server/server_data";
import './cards.css';

class Card extends React.Component {

    deleteApartment = async () => {
        if(window.confirm("are you sure you want to delete this apartment?")) {
            let extension = this.props.id
            deleteDataFromServerById(this.handleSuccess,extension);
            const isDeleted = await deleteDataFromServerById(extension);
            if(isDeleted) {
                this.props.renderGallery()
            }
        } else {
            return
        }
    }

    // onLiking = (id) => {
    //     console.log('im on liking id of the apt', id)
    //     // get user cookie. call post aparment to wish list, send user id and apartmentid
    // }

    render() {
        const {type,id, address, city_name, number_of_room,number_of_bath,sqft,sale_status,property_type,main_image,created_on} = this.props;
        const saleRent = (sale_status === "both") ? "sale and for rent" : sale_status;
        let price = ""  + this.props.price;
        let created = created_on.split("T")[0]
        let listing_price =(price.length < 7) ? price.substring(0,price.length-3)+","+price.substring(price.length-3) : 
        price.substring(0,price.length-6)+"," + price.substring(price.length-3) + "," + price.substring(price.length-3);
        return(
            <div id={this.props.id} className={"city-card col-lg-3 col-md-6 col-sm-12"}>
                    <div className={"card"}>
                        <div  className={"card-inner"}>
                            <div className={"card-top"}>

                                {type !== 'user_homes' && main_image &&
                                <Link to={`/apartment/${id}`}>
                                    <img src={`http://localhost:9000${main_image}`} className={"d-block h-100 card-img-top"} alt={"main-apt-img"}/>
                                </Link>}
                        
                                {type === 'user_homes' &&       
                                    <img src={`http://localhost:9000${main_image}`} className={"d-block h-100 card-img-top"} alt={"main-apt-img"}/>
                                }

                                {sale_status && type !== 'trends' &&
                                <span className={"sale"}>{"House for " + saleRent}</span>}

                                {listing_price && type !== 'trends' &&
                                <span className="price"> {'$' + listing_price}</span>}
                                
                                {type !== 'trends' && type !== 'user_homes' &&
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 40 40" aria-labelledby="Save Listing" width="40" height="40" tabIndex="-1" className="jsx-2877931502 heart">
                                    <path stroke="#fff" strokeWidth="3" d="M20 8.3c4.9-8 18.5-5.9 18.5 5l-.1 1.9c-.8 4.6-4 9.3-8.9 14a66.6 66.6 0 0 1-8.7 7l-.7.6-.8-.5a27.6 27.6 0 0 1-2.8-1.7c-2-1.4-4-3-6-4.7-5.6-5-9-10.3-9-15.8A10 10 0 0 1 20 8.3z" className="jsx-2877931502"/>
                                </svg>}

                                {type === 'new_listings' &&
                                <span className="blue-tag">{created}</span>}

                                {type === 'trends' &&
                                <span className="blue-tag">SPONSERED CONTENT</span>}

                            </div>
                        </div>
                        <div id={"card-body-id"} className={"card-body"}>
                            {number_of_room && type !== 'trends' &&
                            <span className={"rooms"}>{number_of_room + " rooms"}</span>}

                            {number_of_bath && type !== 'trends' &&
                            <span className={"beds"}> {number_of_bath + " baths"}</span>}

                            {sqft && type !== 'trends' &&
                            <span className={"sqft"}> {sqft+ " sqft"}</span>}

                            {address && type !== 'trends' &&
                            <p className={"address"}>{address}, {city_name}</p>}

                            {type === 'trends' &&
                            <p className={"title"}>{property_type}, in {city_name}</p>}

                            {type === 'user_homes' &&  
                                <Link to={`/update/${id}`}>
                                    <button className={'edit btn pr-1'}>Edit</button>
                                </Link>
                            }

                            {type === 'user_homes' &&  
                                    <button className={'delete btn'} onClick={this.deleteApartment}>Delete</button>
                            }

                        </div>
                    </div>
                </div>
        );
    }
}


export default Card;
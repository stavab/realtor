import React from "react";
import Cookies from 'js-cookie';

import {field} from '../apartment_validation/validator';
import {updateApartmentInServer,getDataFromServerById} from "../../server/server_data";
import Forbidden from "../errors/forbidden";
import UnAuthorized from "../errors/login_to_continue";
import CitiesForm from '../apartments/form_cities'
import './apt_form.css';


class UpdateApartment extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            user: Cookies.get('logged-user'),
            pageMessage: false,
            address: field({name: 'address', isRequired:false, minLength: 2}),
            city_id: field({name: 'city_id', isRequired:false}),
            price: field({name: 'price', isRequired: false}),
            number_of_room: field({name: 'number_of_room', isRequired: false}),
            number_of_bath: field({name:'number_of_bath',isRequired:false}),
            sqft: field({name:'sqft',isRequired: false}),
            main_image: field({name:'main_image',isRequired: false}),
            sale_status: field({name:'sale_status',isRequired: false}),
            property_type: field({name:'property_type',isRequired: false}),
        }
        this.inputChange = this.inputChange.bind(this);
    }

    componentDidMount() {
        let extension = this.props.match.params.id
        if (this.state.user) {
            let cookie = JSON.parse(this.state.user)
            this.setState({
                user: cookie[0]
            })
        }
        getDataFromServerById(this.handleSuccess,extension);
    }

    handleSuccess = (data) => {
        const apartment_user_id = data.data[0].user_id
        const logged_user_id = this.state.user.id
        if (apartment_user_id !== logged_user_id) {
            this.setState({
                pageMessage: true
            })
        } else {
            this.setState ({
                apartment: data.data[0]
            })
        }
    }

    inputChange({target: {name, value, files}}){
        this.setState({
            [name]: {
                ...this.state[name],
                files,
                value,
            }
        });
    }

    onSubmit = async (e) => {
        e.preventDefault();
        let form_data= new FormData();
        let isOK = true;
        for (let prop in this.state) {
            if (prop === 'apartment' || prop === "user" || prop === "pageMessage") {
                continue;
            } else if (!prop) {
                isOK = false;
                this.setState ({
                    [prop]: {
                        ...this.state[prop]
                    }
                });
                return;
            }
        }
        if(isOK) {
            for (let prop in this.state) {
                if (prop === 'apartment' || prop === "user" || prop === "pageMessage") {
                    continue;
                }
                if (prop === 'main_image') {
                    if (this.state[prop].files === "") {
                        form_data.append(prop, this.state.apartment[prop])
                    } else{
                        form_data.append(prop, document.querySelector('.main_image').files[0])
                    }
                    continue;
                } 
                if (this.state[prop].value === "") {
                    form_data.append(prop, this.state.apartment[prop])
                } else {
                    form_data.append(prop,this.state[prop].value)
                }
            }
        }
        form_data.append('id',this.props.match.params.id)
        const isUpdated = await updateApartmentInServer(form_data);
        if(isUpdated) {
            document.getElementById("my-alert").style.display = "inline-block";
            document.getElementById("update-form").style.display = "none";
            setTimeout(() => {
                this.props.history.push('/userArea')
            }, 2000);
        }
    }

    render () {
        const apartment = this.state.apartment
        return (
            <div>
                {!this.state.user &&
                <UnAuthorized/>}
                {this.state.pageMessage &&
                <Forbidden/>
                }
                {!this.state.pageMessage &&
                <div className={"container"}>
                <div className={"container p-5"}>
                <div className={"row justify-content-center"}>
                {apartment &&
                 <form id={"update-form"} style={{display: 'inline-block'}} onSubmit={this.onSubmit} encType="multipart/form-data">
                    <CitiesForm inputChange={this.inputChange}/>

                    <div className="form-group">
                        <label>Address</label>
                        <input type="text" className="form-control" name={"address"} placeholder="ex. 1234 Main St" onBlur={this.inputChange}/>
                    </div>

                    <div className="row">
                        <div className="form-group col-sm-12 col-lg-6">
                            <label>Price</label>
                            <input type="numbert" min="1" step="any"  name={"price"}  className="form-control" id="inputPrice" onBlur={this.inputChange} placeholder="ex. 500000"/>
                        </div>
                        <div className="form-group col-sm-12 col-lg-6">
                            <label>Sqft</label>
                            <input type="numbert" min="1" name={"sqft"} step="any"className="form-control" id="inputSqft" onBlur={this.inputChange} placeholder="ex. 679"/>
                        </div>
                    </div>
                    
                    <div className="row">
                        <div className="form-group col-sm-12 col-lg-6">
                        <label>Number Of Rooms</label>
                        <select multiple className="form-control"  name={"number_of_room"}  onBlur={this.inputChange}>
                        <option>1</option>
                        <option>2</option>
                        <option>3</option>
                        <option>4</option>
                        <option>5</option>
                        </select>
                    </div>
                        <div className="form-group col-sm-12 col-lg-6">
                        <label>Number Of Baths</label>
                        <select multiple className="form-control" name={"number_of_bath"} onBlur={this.inputChange}>
                        <option>1</option>
                        <option>2</option>
                        <option>3</option>
                        <option>4</option>
                        <option>5</option>
                        </select>
                    </div>
                    </div>

                    <div className="row">
                        <div className="form-group col-sm-12 col-lg-6">
                            <label>Status</label>
                            <select multiple className="form-control" name={"sale_status"} onBlur={this.inputChange}>
                            <option>rent</option>
                            <option>sale</option>
                            <option>both</option>
                            </select>
                        </div>
                        <div className="form-group col-sm-12 col-lg-6">
                        <label>Property Type</label>
                        <select multiple className="form-control" name={"property_type"} onBlur={this.inputChange}>
                        <option>house</option>
                        <option>ranch</option>
                        <option>condo</option>
                        <option>land</option>
                        </select>
                    </div>
                    </div>
                    
                    <div className="custom-file">
                        <input type="file" name={"main_image"} className="main_image custom-file-input"  onChange={this.inputChange}/>
                        <label className="custom-file-label">{this.state.main_image.value}</label>
                    </div>

                    <div className="row justify-content-center p-3">
                        <button className="btn pre-approved-btn" type="submit">Update Apartment</button>
                    </div>
                </form>}
                <div id = {"my-alert"} className={"alert"} style={{display: 'none'}}>
                        <h4 className={"alert-heading"}>Well done!</h4>
                        <p>Aww yeah, you successfully updtated the apartment</p>
                </div>
                </div>
                </div>
            </div>}
            </div>
        )

    }

}

export default UpdateApartment;
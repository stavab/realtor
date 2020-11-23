import React from "react";
import validate, {field} from '../apartment_validation/validator';
import InputErrors from '../apartment_validation/inputErrors';
import {uploadApartmentToServer} from '../../server/server_data';
import Cookies from 'js-cookie';
import UnAuthorized from "../errors/login_to_continue";
import CitiesForm from "./form_cities";

class UplaodApartment extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            user: Cookies.get('logged-user'),
            address: field({name: 'address', isRequired:true, minLength: 2}),
            city_id: field({name: 'city_id', isRequired:true}),
            price: field({name: 'price', isRequired: true}),
            number_of_room: field({name: 'number_of_room', isRequired: true}),
            number_of_bath: field({name:'number_of_bath',isRequired:true}),
            sqft: field({name:'sqft',isRequired:true}),
            main_image: field({name:'main_image',isRequired:true}),
            sale_status: field({name:'sale_status',isRequired:true}),
            property_type: field({name:'property_type',isRequired:true}),
        }
        this.inputChange = this.inputChange.bind(this);
    }

    componentDidMount = () => {
        if (this.state.user) {
            let cookie = JSON.parse(this.state.user)
            this.setState({
                user: cookie[0]
            })
        }
    }

    inputChange({target: {name, value, files}}){
        const errors = validate(name, value,files, this.state[name].validations);
        this.setState({
            [name]: {
                ...this.state[name],
                files,
                value,
                errors
            }
        });
    }

    onSubmit =async e => {
        e.preventDefault();
        let form_data= new FormData();
        let isOK = true;
        for (let prop in this.state) {
            if (prop === "user") {
                continue;
            }
            if (!this.state[prop].value) {
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
                if (prop === 'user') {
                    let user_id = this.state[prop].id
                    form_data.append('user_id', user_id)
                }
                else if (prop === 'main_image') {
                    form_data.append(prop, document.querySelector('.main_image').files[0])
                } else {
                    form_data.append(prop,this.state[prop].value)
                }
            }
        }
        const isUpload =await uploadApartmentToServer(form_data);
        if(isUpload) {
            document.getElementById("my-alert").style.display = "inline-block";
            document.getElementById("upload-form").style.display = "none";
            setTimeout(() => {
                this.props.history.push('/userArea')
            }, 2000);
        }
    }

    render () {
        return (
            <div>
            {!this.state.user &&
            <UnAuthorized/>
            }
            {this.state.user &&
            <div className={"container p-5"}>
                <div className={"row justify-content-center"}>
                 <form id={"upload-form"} style={{display: 'inline-block'}} onSubmit={this.onSubmit} encType="multipart/form-data">

                    <CitiesForm inputChange={this.inputChange}/>

                    <div className="form-group">
                        <label>Address</label>
                        <input type="text" className="form-control" name={"address"} placeholder="ex. 1234 Main St" onBlur={this.inputChange} required/>
                        <InputErrors errors={this.state.address.errors}></InputErrors>
                    </div>
                  
                    <div className="row">
                        <div className="form-group col-sm-12 col-lg-6">
                            <label>Sqft</label>
                            <input type="numbert" min="1" name={"sqft"} step="any"className="form-control" id="inputSqft" onBlur={this.inputChange} placeholder="ex. 679" required/>
                            <InputErrors errors={this.state.sqft.errors}></InputErrors>
                        </div>
                        <div className="form-group col-sm-12 col-lg-6">
                        <label>Price</label>
                        <input type="number" name={"price"}  className="form-control" id="inputPrice" onBlur={this.inputChange} placeholder="ex. 500000" required/>
                        <InputErrors errors={this.state.price.errors}></InputErrors>

                    </div>
                    </div>
                    
                    <div className="row">
                        <div className="form-group col-sm-12  col-lg-6">
                            <label>number of rooms</label>
                            <select multiple className="form-control"  name={"number_of_room"}  onBlur={this.inputChange}>
                            <option>1</option>
                            <option>2</option>
                            <option>3</option>
                            <option>4</option>
                            <option>5</option>
                            </select>
                            <InputErrors errors={this.state.number_of_room.errors}></InputErrors>
                        </div>
                    
                        <div className="form-group col-sm-12 col-lg-6">
                            <label>number of baths</label>
                            <select multiple className="form-control" name={"number_of_bath"} onBlur={this.inputChange}>
                            <option>1</option>
                            <option>2</option>
                            <option>3</option>
                            <option>4</option>
                            <option>5</option>
                            </select>
                            <InputErrors errors={this.state.number_of_bath.errors}></InputErrors>
                        </div>
                    </div>
                    
                    <div className="row">
                        <div className="form-group col-sm-12 col-lg-6">
                        <label>status</label>
                        <select multiple className="form-control" name={"sale_status"} onBlur={this.inputChange}>
                        <option>rent</option>
                        <option>sale</option>
                        <option>both</option>
                        </select>
                        <InputErrors errors={this.state.sale_status.errors}></InputErrors>
                    </div>
                        <div className="form-group col-sm-12 col-lg-6">
                        <label>Property Type</label>
                        <select multiple className="form-control" name={"property_type"} onBlur={this.inputChange}>
                        <option>house</option>
                        <option>ranch</option>
                        <option>condo</option>
                        <option>land</option>
                        </select>
                        <InputErrors errors={this.state.property_type.errors}></InputErrors>
                    </div>
                    </div>
                    
                    <div className="custom-file">
                        <input type="file" name={"main_image"} className="main_image custom-file-input"  onChange={this.inputChange} required/>
                        <label className="custom-file-label">{this.state.main_image.value}</label>
                        <InputErrors errors={this.state.main_image.errors}></InputErrors>
                    </div>
                    
                    <div className="row justify-content-center p-3">
                        <button className="btn pre-approved-btn" type="submit">Upload Apartment</button>
                    </div>
                </form>
                <div id = {"my-alert"} className={"alert"} style={{display: 'none'}}>
                        <h4 className={"alert-heading"}>Well done!</h4>
                        <p>Aww yeah, you successfully uploaded the apartment</p>
                </div>
                </div>
            </div>}
        </div>
        )

    }

}

export default UplaodApartment;
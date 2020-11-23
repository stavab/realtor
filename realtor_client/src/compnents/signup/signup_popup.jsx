import React from "react";
import validate, {field} from '../user_validation/validator';
import InputErrors from '../user_validation/inputError';
import {registerUser} from "../../server/server_data_users";

class SignUpPopUp extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            first_name: field({name: 'first_name', isRequired:true, minLength: 2}),
            last_name: field({name: 'last_name', isRequired:true, minLength: 2}),
            phone: field({name: 'phone', isRequired: true, pattern: /[0-9]{3}-[0-9]{7}/}),
            email: field({name: 'email', isRequired: true, pattern: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/}),
            password: field({name:'password',isRequired:true,minLength: 2})
        }
        this.inputChange = this.inputChange.bind(this);
    }

    inputChange({target: {name, value}}){
        const errors = validate(name, value, this.state[name].validations);
        this.setState({
            [name]: {
                ...this.state[name],
                value,
                errors
            }
        });
    }

    onSubmit = e => {
        e.preventDefault();
        let isOK = true;
        
        for(let prop in this.state){
            const field = this.state[prop];
            const errors = validate(prop, field.value, field.validations);
            if(errors.length){
                isOK = false;
                this.setState({
                    [prop]: {
                        ...this.state[prop],
                        errors
                    }
                });
            }
        }

        if(isOK){
            const result = {};
    
            for(let prop in this.state){
                result[prop] = this.state[prop].value;
            }
            registerUser(result, this.handleSuccess);
        }
    }

    handleSuccess = () => {
        this.props.updateSignUp()
    }


    render () {
        return (
            <div className={"popup-cover"}>
                <div className={"header-pop-up container"}>
                    <button className={"exit-btn"} onClick={this.props.togglePopUpSignUp}>x</button>
                    <div className={"header-pop-up-row row "}>
                        <div className={"half-pop-one col-sm-12 col-lg-7"}>
                            <h2>Create An Account</h2>
                            <p>Access properties, search and more.</p>
                            <div>
                                <form onSubmit={this.onSubmit}>
                                    <div>
                                        <input type={"text"} name={"first_name"} placeholder={"First Name"} onBlur={this.inputChange}/>
                                        <InputErrors errors={this.state.first_name.errors}></InputErrors>
                                    </div>
                                    <div>
                                        <input type={"text"} name={"last_name"} placeholder={"Last Name"} onBlur={this.inputChange}/>
                                        <InputErrors errors={this.state.last_name.errors}></InputErrors>
                                    </div>
                                    <div>
                                        <input type={"tel"} name={"phone"} placeholder={"Phone, Format: 012-3456789"} onBlur={this.inputChange} pattern={"[0-9]{3}-[0-9]{7}"}/>
                                        <InputErrors errors={this.state.phone.errors}></InputErrors>
                                    </div>
                                    <div>
                                        <input type={"text"} name={"email"} placeholder={"Email Address"} onBlur={this.inputChange}/>
                                        <InputErrors errors={this.state.email.errors}></InputErrors>
                                    </div>
                                    <div>
                                        <input type={"password"} name={"password"} placeholder={"Password"} onBlur={this.inputChange}/>
                                        <InputErrors errors={this.state.password.errors}></InputErrors>
                                    </div>
                                    <button type="submit" className={"pro-login-btn"}value="submit">Sign Up</button>
                                </form>
                            </div>
                        </div>
                        <div className={"half-pop-two col-sm-12 col-lg-5"}>
                            <h2>Real Estate Agent?</h2>
                            <p>Manage users, listings and more.</p>
                            <a className={"pro-login-btn"} href="mailto:someone@example.com?Subject=Hello%20again" target="_top">Contact Us</a>
                            <img src="https://d31jv8wslxbg1z.cloudfront.net/img/house_login_web.png" alt={"trees-background"} />
                        </div>
                    </div>
                </div>
            </div>
        )

    }

}

export default SignUpPopUp
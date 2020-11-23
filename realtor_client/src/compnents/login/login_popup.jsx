import React from "react";
import validate, { field } from '../user_validation/validator';
import InputErrors from '../user_validation/inputError';
import { userLogIn } from "../../server/server_data_users";


class LogInPopUp extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email: field({ name: 'email', isRequired: true, pattern: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/ }),
            password: field({ name: 'password', isRequired: true, minLength: 2 })
        }
        this.inputChange = this.inputChange.bind(this);
    }

    inputChange({ target: { name, value } }) {
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
        for (let prop in this.state) {
            const field = this.state[prop];
            const errors = validate(prop, field.value, field.validations);
            if (errors.length) {
                isOK = false;
                this.setState({
                    [prop]: {
                        ...this.state[prop],
                        errors
                    }
                });
            }
        }
        if (isOK) {
            const result = {};
            for (let prop in this.state) {
                result[prop] = this.state[prop].value;
            }
            userLogIn(result, this.handleLogIn);
        }
    }

    handleLogIn = (result) => {
        if (result.status === 200) {
            this.props.updateCookieApp()
            this.props.updateCookieHeader()
        } else {
            this.setState({
                email: {
                    ...this.state["email"],
                    errors: ["Email and/or Password do not match"]
                }
            })
        }
    }

    render() {
        return (
            <div className={"popup-cover"}>
                <div className={"header-pop-up container"}>
                    <button className={"exit-btn"} onClick={this.props.togglePopUpLogin}>x</button>
                    <div className={"header-pop-up-row row "}>
                        <div className={"half-pop-one col-sm-12 col-lg-7"}>
                            <h2>Log in to your account</h2>
                            <p>Access all your saved properties, searches, notes and more.</p>
                            <div>
                                <form onSubmit={this.onSubmit}>
                                    <div>
                                        <input type={"text"} name={"email"} placeholder={"Email Address"} onBlur={this.inputChange} />
                                        <InputErrors errors={this.state.email.errors}></InputErrors>
                                    </div>
                                    <div>
                                        <input type={"password"} name={"password"} placeholder={"Password"} onChange={this.inputChange} />
                                        <InputErrors errors={this.state.password.errors}></InputErrors>
                                    </div>
                                    <button type="submit" className={"pro-login-btn"} value="submit" >Log in</button>
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

export default LogInPopUp 
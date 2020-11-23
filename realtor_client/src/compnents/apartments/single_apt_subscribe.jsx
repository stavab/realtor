import React from "react";

export default function SingleAptSubscribe() {
    return (
        <div className={"d-none d-lg-flex col-sm-8 col-lg-5 single-apt-form"}>
            <form className="text-center" action="#!">
                <p className="h4 mb-4">Contact Us</p>
                <a  className="btn btn-info my-4 btn-block" href="mailto:someone@example.com?Subject=Hello%20again" target="_top">Send An Email</a>
                    <input type="checkbox" className="custom-control-input" id="defaultRegisterFormNewsletter"/>
                <p>By proceeding, you consent to receive calls and texts at the number you provided <a href="http://www.realtor.com">and others</a>. More...
                </p>
            </form>
        </div>
    )
}
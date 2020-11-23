import React from "react";

function HomePageLogoGrid () {
        return (
            <div id="logo-grid" className="container-fluid">
                <div className="container logo-container">
                    <div className="row justify-content-center justify-content-lg-between">
                        <ul className="logo-col d-flex">
                            <li><i className="fab fa-facebook-f"/></li>
                            <li><i className="fab fa-twitter"/></li>
                            <li><i className="fab fa-linkedin-in"/></li>
                            <li><i className="fab fa-instagram"/></li>
                            <li><i className="fab fa-pinterest"/></li>
                            <li><i className="fab fa-youtube"/></li>
                        </ul>
                        <ul className="logo-col d-flex">
                            <li><i className="fab fa-pinterest"/></li>
                            <li><i className="fab fa-youtube"/></li>
                        </ul>
                    </div>
                </div>
            </div>
        )
}

export default HomePageLogoGrid ;

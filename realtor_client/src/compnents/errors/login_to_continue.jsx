import React from 'react';
import { Link } from "react-router-dom";

import './not_found.css';

function UnAuthorized() {
    return (
        <div id="notfound">
        <div className="notfound">
            <div className="notfound-404">
                <h1>401</h1>
            </div>
            <h2>Oops! You Must Log In to Continue</h2>
            <Link to="/"><p>Return to homepage</p></Link>
        </div>
        </div>
    );
}

export default UnAuthorized;
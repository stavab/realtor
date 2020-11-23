import React from "react";

function HomePageTop(){
        return (
            <div id="top" className="container-fluid">
                <div className="container top-container">
                    <div className="row top-row font-14 align-items-center justify-content-center">
                        <svg data-test-id="icon-checkmark" viewBox="0 0 24 24" color="green" size="3"
                             className="Icon__StyledIcon-sc-3canwz-0 iCUSrU sc-AykKC jiZwhV" theme="[object Object]">
                            <path d="M9.4 20.4a.7.7 0 01-.5-.2l-6.7-6.9a.7.7 0 010-1 .7.7 0 011 0l6.2 6.4 11.4-13a.7.7 0 011 0 .7.7 0 010 1L10 20.1a.7.7 0 01-.5.3z"/>
                        </svg>
                        <div>Be Ready To Buy...<span className="d-none d-lg-inline">How Much Can You Borrow?</span></div>
                        {/* <button className="pre-approved-btn red-button-hover">Get Pre-Approved</button> */}
                    </div>
                </div>
            </div>
        )
}

export default HomePageTop;




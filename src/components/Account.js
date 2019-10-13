import React from 'react';
import './Account.css';


export default function Account(props) {
    return (
        <div className="account-container" onClick={props.toggle} >
            <div className="account-border">
                <div className="account-center">
                    <div className="user-head"></div>
                    <div className="user-shoulders"></div>
                </div>
            </div>
        </div>
    );
}
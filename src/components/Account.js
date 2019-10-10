import React from 'react';
import './Account.css';

function accountClick() {
    console.log('clicked account icon!')
}

function Account() {
    return (
        <div className="account-container" onClick={accountClick}>
            <div className="account-border">
                <div className="account-center">
                    <div className="user-head"></div>
                    <div className="user-shoulders"></div>
                </div>
            </div>
        </div>
    );
}

export default Account;
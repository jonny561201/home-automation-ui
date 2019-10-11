import React from 'react';
import './AccountSettings.css';

export default function AccountSettings() {
    return (
        <div className="account-menu">
            <ul>
                <li><div className="account-button">Settings</div></li>
                <li><div className="account-button">Sign Out</div></li>
            </ul>
        </div>
    );
}
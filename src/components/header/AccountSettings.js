import React from 'react';
import { Link } from 'react-router-dom';
import './AccountSettings.css';


export default function AccountSettings(props) {
    return (
        <div className="account-menu">
            <ul>{props.activePage === "Home"
                ? <Link to='/settings'>
                    <li><div className="account-button">Settings</div></li>
                </Link>
                : <Link to='/home'>
                    <li><div className="account-button">Home</div></li>
                </Link>
            }
                <Link to='/'>
                    <li><div className="account-button">Sign Out</div></li>
                </Link>
            </ul>
        </div>
    );
}
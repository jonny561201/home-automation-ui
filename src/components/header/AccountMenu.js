import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import './AccountMenu.css';
import { getStore } from '../../state/GlobalState';
import { Context } from '../../state/Store';


export default function AccountSettings(props) {
    let wrapperRef;
    const [activePage,] = useState(getStore().getActivePage());
    const [, dispatch] = useContext(Context);

    useEffect(() => {
        document.addEventListener("mousedown", handleClickOutside);
    });

    const handleClickOutside = (event) => {
        if (wrapperRef && !props.parentRef.contains(event.target) && !wrapperRef.contains(event.target)) {
            props.toggle();
        }
    }

    const getLinks = () => {
        if (activePage === "Home Automation") {
            return <div>
                <Link to='/home-automation-ui/activities'>
                    <li><div className="account-button">Activities</div></li>
                </Link>
                <Link to='/home-automation-ui/settings'>
                    <li><div className="account-button">Settings</div></li>
                </Link>
                <Link to='/home-automation-ui/account'>
                    <li><div className="account-button">Account</div></li>
                </Link>
            </div>
        } else if (activePage === "Settings") {
            return <div>
                <Link to='/home-automation-ui/home'>
                    <li><div className="account-button">Home</div></li>
                </Link>
                <Link to='/home-automation-ui/activities'>
                    <li><div className="account-button">Activities</div></li>
                </Link>
                <Link to='/home-automation-ui/account'>
                    <li><div className="account-button">Account</div></li>
                </Link>
            </div>
        } else if (activePage === "Activities") {
            return <div>
                <Link to='/home-automation-ui/home'>
                    <li><div className="account-button">Home</div></li>
                </Link>
                <Link to='/home-automation-ui/settings'>
                    <li><div className="account-button">Settings</div></li>
                </Link>
                <Link to='/home-automation-ui/account'>
                    <li><div className="account-button">Account</div></li>
                </Link>
            </div>
        } else {
            return <div>
                <Link to='/home-automation-ui/home'>
                    <li><div className="account-button">Home</div></li>
                </Link>
                <Link to='/home-automation-ui/activities'>
                    <li><div className="account-button">Activities</div></li>
                </Link>
                <Link to='/home-automation-ui/settings'>
                    <li><div className="account-button">Settings</div></li>
                </Link>
            </div>
        }
    }

    return (
        <div className="account-menu" ref={(node) => { wrapperRef = node }}>
            <ul className="text">{getLinks()}
                <Link to='/home-automation-ui'>
                    <li><div className="account-button" onClick={() => dispatch({ type: 'SET_AUTHENTICATION', payload: false })}>Sign Out</div></li>
                </Link>
            </ul>
        </div>
    );
}
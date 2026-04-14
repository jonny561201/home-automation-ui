import React, { useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import { Context } from '../../state/Store';
import { Divider } from '@mui/material';
import { useAuth0 } from '@auth0/auth0-react'
import './AccountMenu.scss';


export default function AccountSettings(props) {
    let wrapperRef;
    const [state, _] = useContext(Context);
    const activePage = state.activePage;
    const auth0 = useAuth0();

    useEffect(() => {
        document.addEventListener("mousedown", handleClickOutside);
    });

    const handleClickOutside = (event) => {
        if (wrapperRef && !props.parentRef.contains(event.target) && !wrapperRef.contains(event.target)) {
            props.toggle();
        }
    }

    const logOut = async () => {
        await auth0.logout({logoutParams: { returnTo: window.location.origin }});
    }

    const getLinks = () => {
        if (activePage === "Home Automation") {
            return <div>
                <Link to='/activities'>
                    <li><div className="account-button">Activities</div></li>
                </Link>
                <Link to='/settings'>
                    <li><div className="account-button">Settings</div></li>
                </Link>
                <Link to='/account'>
                    <li><div className="account-button">Account</div></li>
                </Link>
            </div>
        } else if (activePage === "Settings") {
            return <div>
                <Link to='/home'>
                    <li><div className="account-button">Home</div></li>
                </Link>
                <Link to='/activities'>
                    <li><div className="account-button">Activities</div></li>
                </Link>
                <Link to='/account'>
                    <li><div className="account-button">Account</div></li>
                </Link>
            </div>
        } else if (activePage === "Activities") {
            return <div>
                <Link to='/home'>
                    <li><div className="account-button">Home</div></li>
                </Link>
                <Link to='/settings'>
                    <li><div className="account-button">Settings</div></li>
                </Link>
                <Link to='/account'>
                    <li><div className="account-button">Account</div></li>
                </Link>
            </div>
        } else {
            return <div>
                <Link to='/home'>
                    <li><div className="account-button">Home</div></li>
                </Link>
                <Link to='/activities'>
                    <li><div className="account-button">Activities</div></li>
                </Link>
                <Link to='/settings'>
                    <li><div className="account-button">Settings</div></li>
                </Link>
            </div>
        }
    }

    return (
        <div className="account-menu" ref={(node) => { wrapperRef = node }}>
            <ul className="text">{getLinks()}</ul>
            <Divider />
            <ul>
                <Link to='/'>
                    <li><div className="account-button" onClick={logOut}>Sign Out</div></li>
                </Link>
            </ul>
        </div>
    );
}
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
                <li><Link className="account-button" to='/activities'>Activities</Link></li>
                <li><Link className="account-button" to='/settings'>Settings</Link></li>
                <li><Link className="account-button" to='/account'>Account</Link></li>
            </div>
        } else if (activePage === "Settings") {
            return <div>
                <li><Link className="account-button" to='/home'>Home</Link></li>
                <li><Link className="account-button" to='/activities'>Activities</Link></li>
                <li><Link className="account-button" to='/account'>Account</Link></li>
            </div>
        } else if (activePage === "Activities") {
            return <div>
                <li><Link className="account-button" to='/home'>Home</Link></li>
                <li><Link className="account-button" to='/settings'>Settings</Link></li>
                <li><Link className="account-button" to='/account'>Account</Link></li>
            </div>
        } else {
            return <div>
                <li><Link className="account-button" to='/home'>Home</Link></li>
                <li><Link className="account-button" to='/activities'>Activities</Link></li>
                <li><Link className="account-button" to='/settings'>Settings</Link></li>
            </div>
        }
    }

    return (
        <div className="account-menu" ref={(node) => { wrapperRef = node }}>
            <ul className="text">{getLinks()}</ul>
            <Divider />
            <ul>
                <li><Link className="account-button" to='/' onClick={logOut}>Sign Out</Link></li>
            </ul>
        </div>
    );
}
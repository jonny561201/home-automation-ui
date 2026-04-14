import React, { useContext, useEffect } from 'react';
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

    const menuItems = [
        {title: "Home", link: "/home"},
        {title: "Activities", link: "/activities"},
        {title: "Settings", link: "/settings"},
        {title: "Account", link: "/account"},
    ]

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

    return (
        <div className="account-menu" ref={(node) => { wrapperRef = node }}>
            <ul className="text">
                { menuItems.filter(x => x.title !== activePage).map(x => <li><Link className="account-button" to={x.link}>{x.title}</Link></li>) }
            </ul>
            <Divider />
            <ul>
                <li><Link className="account-button" to='/' onClick={logOut}>Sign Out</Link></li>
            </ul>
        </div>
    );
}
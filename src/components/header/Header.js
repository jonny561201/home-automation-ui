import React, { useState } from 'react';
import LogoHeader from '../header/LogoHeader';
import Account from '../header/Account';
import AccountSettings from '../header/AccountSettings';
import './Header.css';
import { getStore } from '../../GlobalState';


export default function Header() {
    const activePage = getStore().getActivePage();
    const [settingsActive, setSettingsActive] = useState(null);
    const [wrapperRef, setWrapperRef] = useState(null);

    const updateWrapperRef = (node) => {
        setWrapperRef(node);
    }

    const toggleAccountSettings = () => {
        setSettingsActive(!settingsActive);
    }

    return (
        <div className="header">
            <div className="home-header">
                <div className="logo-container">
                    <LogoHeader />
                </div>
                <div></div>
                <div>
                    <h1 className="home-header-text">{activePage}</h1>
                </div>
                <div ref={updateWrapperRef}>
                    <Account toggle={toggleAccountSettings} />
                </div>
            </div>
            {settingsActive
                ? <AccountSettings toggle={toggleAccountSettings} parentRef={wrapperRef} />
                : <div></div>
            }
        </div>
    );
}
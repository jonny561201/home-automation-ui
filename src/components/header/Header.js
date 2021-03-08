import React, { useState } from 'react';
import LogoHeader from '../header/LogoHeader';
import AccountIcon from './AccountIcon';
import AccountMenu from '../header/AccountMenu';
import './Header.css';
import { getStore } from '../../state/GlobalState';
import UserLocation from '../segments/UserLocation';


export default function Header() {
    const activePage = getStore().getActivePage();
    const [settingsActive, setSettingsActive] = useState(null);
    const [accountWrapperRef, setAccountWrapperRef] = useState(null);

    return (
        <div className="header">
            <div className="home-header">
                <div className="logo-container">
                    <LogoHeader />
                </div>
                <div></div>
                <div>
                    <h1 className="home-header-text header-text">{activePage}</h1>
                </div>
                <div ref={(node) => { setAccountWrapperRef(node) }}>
                    <AccountIcon toggle={() => setSettingsActive(!settingsActive)} />
                </div>
            </div>
            {settingsActive
                ? <AccountMenu toggle={() => setSettingsActive(!settingsActive)} parentRef={accountWrapperRef} />
                : <div></div>
            }
            <UserLocation />
        </div>
    );
}
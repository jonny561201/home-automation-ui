import React, { useState } from 'react';
import LogoHeader from '../header/LogoHeader';
import AccountIcon from './AccountIcon';
import AccountMenu from '../header/AccountMenu';
import './Header.css';
import { getStore } from '../../state/GlobalState';
import UserInformation from '../segments/UserInformation';


export default function Header() {
    const activePage = getStore().getActivePage();
    const [settingsActive, setSettingsActive] = useState(null);
    const [wrapperRef, setWrapperRef] = useState(null);

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
                <div ref={(node) => {setWrapperRef(node)}}>
                    <AccountIcon toggle={() => setSettingsActive(!settingsActive)} />
                </div>
            </div>
            {settingsActive
                ? <AccountMenu toggle={() => setSettingsActive(!settingsActive)} parentRef={wrapperRef} />
                : <div></div>
            }
            <UserInformation />
        </div>
    );
}
import React, { useState } from 'react';
import LogoHeader from '../header/LogoHeader';
import AccountIcon from './AccountIcon';
import AccountMenu from '../header/AccountMenu';
import './Header.css';
import { getStore } from '../../GlobalState';


export default function Header() {
    const activePage = getStore().getActivePage();
    const [settingsActive, setSettingsActive] = useState(null);
    const [wrapperRef, setWrapperRef] = useState(null);

    const updateWrapperRef = (node) => {
        setWrapperRef(node);
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
                    <AccountIcon toggle={() => setSettingsActive(!settingsActive)} />
                </div>
            </div>
            {settingsActive
                ? <AccountMenu toggle={() => setSettingsActive(!settingsActive)} parentRef={wrapperRef} />
                : <div></div>
            }
        </div>
    );
}
import React, { useState, useContext } from 'react';
import LogoHeader from '../header/LogoHeader';
import AccountIcon from './AccountIcon';
import { Context } from '../../state/Store';
import AccountMenu from '../header/AccountMenu';
import { getStore } from '../../state/GlobalState';
import { setTheme, isDayLight } from '../../utilities/Services';
import { useInterval } from '.././../utilities/UseInterval';
import UserLocation from '../../pages/Home/segments/UserLocation';
import './Header.css';
import StateUtil from '../../utilities/StateUtil';


export default function Header() {
    const [state,] = useContext(Context);
    const activePage = getStore().getActivePage();
    const [settingsActive, setSettingsActive] = useState(null);
    const [accountWrapperRef, setAccountWrapperRef] = useState(null);

    StateUtil();

    useInterval(async () => {
        const isAuto = localStorage.getItem('auto-theme');
        if (isAuto === 'true') {
            isDayLight(state.garageCoords, state.userCoords)
                ? setTheme('theme-light')
                : setTheme('theme-dark')
        }
    }, 60000);

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
import React, { useEffect, useState, useContext } from 'react';
import { Context } from '../../state/Store';
import SettingsPanel from './SettingsPanel';
import Header from '../../components/header/Header';
import { getStore } from '../../state/GlobalState';
import SettingsEditPanel from './SettingsEditPanel';
import { setTheme, toggleDarkMode, isNightTime } from '../../utilities/Services';
import { CoolSwitch, HeatSwitch } from '../../components/controls/Switches';
import { FormControlLabel, FormControl } from '@material-ui/core';
import './Settings.css'


export default function Settings() {
    getStore().setActivePage('Settings');
    const [state,] = useContext(Context);
    const [isAutoMode, setIsAutoMode] = useState(false);
    const [darkMode, setDarkMode] = useState(false);
    const [isEditMode, setEditMode] = useState();

    useEffect(() => {
        setDarkMode(localStorage.getItem('theme') === 'theme-dark');
        setIsAutoMode(localStorage.getItem('auto-theme') === 'true');
    });

    const toggleEditMode = () => {
        setEditMode(!isEditMode);
    }

    const toggleTheme = () => {
        toggleDarkMode()
        setDarkMode(!darkMode);
    }

    const toggleAutoTheme = () => {
        localStorage.setItem('auto-theme', !isAutoMode);
        setIsAutoMode(!isAutoMode);
        isNightTime(state.garageCoords, state.userCoords)
            ? setTheme('theme-dark')
            : setTheme('theme-light')
        if (!isAutoMode === false && !darkMode)
            setTheme('theme-light');
    }

    return (
        <div>
            <div className="settings-header">
                <Header />
            </div>
            <div className="settings-body body">
                <div className="settings-wrapper body">
                    <div className="settings-group setting panel-header-text">
                        <h2>Preferences</h2>
                    </div>
                    <div className="settings-row text">
                        <FormControl>
                            <FormControlLabel label="Dark Mode" control={<HeatSwitch onChange={toggleTheme} disabled={isAutoMode} checked={darkMode && !isAutoMode} />} />
                        </FormControl>
                    </div>
                    <div className="settings-row text">
                        <FormControl>
                            <FormControlLabel label="Auto Theme" control={<CoolSwitch onChange={toggleAutoTheme} checked={isAutoMode} />} />
                        </FormControl>
                    </div>
                    {isEditMode
                        ? <SettingsEditPanel setEditMode={setEditMode} />
                        : <SettingsPanel toggleEdit={toggleEditMode} />
                    }
                </div>
            </div>
        </div>
    )
}
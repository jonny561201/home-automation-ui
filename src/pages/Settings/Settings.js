import React, { useEffect, useState } from 'react';
import Header from '../../components/header/Header';
import { getStore } from '../../state/GlobalState';
import { getUserPreferences } from '../../utilities/RestApi';
import SettingsPanel from './SettingsPanel';
import { setTheme, toggleDarkMode } from '../../utilities/Services';
import SettingsEditPanel from './SettingsEditPanel';
import { CoolSwitch, HeatSwitch } from '../../components/controls/Switches';
import { FormControlLabel, FormControl } from '@material-ui/core';
import './Settings.css'


export default function Settings() {
    getStore().setActivePage('Settings');
    const [isAutoMode, setIsAutoMode] = useState(false);
    const [userId,] = useState(getStore().getUserId());
    const [darkMode, setDarkMode] = useState(false);
    const [city, setCity] = useState();
    const [tempUnit, setTempUnit] = useState();
    const [isEditMode, setEditMode] = useState();
    const [measureUnit, setMeasureUnit] = useState();

    useEffect(() => {
        setDarkMode(localStorage.getItem('theme') === 'theme-dark');
        setIsAutoMode(localStorage.getItem('auto-theme') === 'true');
        const getData = async () => {
            const response = await getUserPreferences(userId);
            setCity(response.city);
            setTempUnit(response.temp_unit);
            setMeasureUnit(response.measure_unit);
        };
        getData();
    }, [userId]);

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
                        <FormControlLabel label="Dark Mode" control={<HeatSwitch onChange={toggleTheme} disabled={isAutoMode} checked={darkMode && !isAutoMode}/>}/>
                    </FormControl>
                </div>
                <div className="settings-row text">
                    <FormControl>
                        <FormControlLabel label="Auto Theme" control={<CoolSwitch onChange={toggleAutoTheme} checked={isAutoMode}/>} />
                    </FormControl>
                </div>
                    {isEditMode
                        ? <SettingsEditPanel
                            city={city} setCity={setCity}
                            tempUnit={tempUnit} setTempUnit={setTempUnit}
                            isEditMode={isEditMode} setEditMode={setEditMode}
                            measureUnit={measureUnit} setMeasureUnit={setMeasureUnit}
                        />
                        : <SettingsPanel
                            city={city}
                            tempUnit={tempUnit}
                            measureUnit={measureUnit}
                            toggleEdit={toggleEditMode}
                        />
                    }
                </div>
            </div>
        </div>
    )
}